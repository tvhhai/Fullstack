const User = require('../models/User');
const {signAccessToken, signRefreshToken} = require('../utils/jwt');

const login = async (req, res) => {
    try {
        const {username, email, password, name} = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: 'Username and password are required'
            });
        }

        const userCount = await User.countDocuments();
        // 2. Nếu DB trống → Tạo user đầu tiên
        if (userCount === 0) {
            const newUser = await User.create({
                username,
                email,
                password,
                name,
            });

            // Tạo token
            const token = signAccessToken({
                userId: newUser._id,
                email: newUser.email
            });

            // Set cookie
            res.cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });

            return res.status(201).json({
                message: 'First user created successfully',
                user: {
                    id: newUser._id,
                    email: newUser.email,
                    name: newUser.name,
                },
            });
        }

        const user = await User.findOne({username}).select('+password');

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // Verify password
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        const payload = {userId: user._id, email: user.email};
        res
            .cookie('access_token', signAccessToken(payload), {
                httpOnly: true,
                sameSite: 'lax',
                secure: false,
            })
            .cookie('refresh_token', signRefreshToken(payload), {
                httpOnly: true,
                sameSite: 'lax',
                secure: false,
                // path: '/auth/refresh',
            })
            .json({
                message: 'Login successful',
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
            });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};
// GET CURRENT USER (/auth/me)
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        res.json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({message: 'Server error'});
    }
};

// LOGOUT
const logout = (req, res) => {
    res.clearCookie('token');
    res.json({message: 'Logout successful'});
};

module.exports = {login, getMe, logout};
