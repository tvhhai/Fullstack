const User = require('../models/User');
const {signAccessToken, signRefreshToken} = require('../utils/jwt');
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');

const formatUser = (user) => ({
    id: user._id,
    username: user.username,
    email: user.email,
    name: user.name,
    role: user.role,
});

const login = async ({username, password, email, name}) => {
    const userCount = await User.countDocuments();

    // Bootstrap: create the very first user when the DB is empty
    if (userCount === 0) {
        logger.info('Bootstrapping first user', {username});
        const newUser = await User.create({username, email: 'hai@gmail.com', password, name: "Hai"});
        const accessToken = signAccessToken({userId: newUser._id, email: newUser.email});
        const refreshToken = signRefreshToken({userId: newUser._id, email: newUser.email});
        return {user: formatUser(newUser), accessToken, refreshToken, created: true};
    }

    const user = await User.findOne({username}).select('+password');
    if (!user) throw new AppError('Invalid username or password', 401);

    const isValid = await user.comparePassword(password);
    if (!isValid) throw new AppError('Invalid username or password', 401);

    const payload = {userId: user._id, email: user.email};
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    logger.info('User logged in', {userId: user._id, username});

    return {user: formatUser(user), accessToken, refreshToken, created: false};
};

const getMe = async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) throw new AppError('User not found', 404);
    return formatUser(user);
};

module.exports = {login, getMe};
