const User = require('../models/User');
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');

const getAllUsers = async ({ page = 1, limit = 10, search = '', role = '' } = {}) => {
  const skip = (page - 1) * limit;
  const query = {};

  if (search) {
    query.$or = [
      { username: { $regex: search, $options: 'i' } },
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }
  if (role) query.role = role;

  const [users, total] = await Promise.all([
    User.find(query).select('-password').sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(query),
  ]);

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    },
  };
};

const getUserById = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new AppError('User not found', 404);
  return user;
};

const createUser = async ({ username, email, password, name, role = 'user' }) => {
  const existing = await User.findOne({ $or: [{ username }, { email }] });
  if (existing) {
    const field = existing.username === username ? 'username' : 'email';
    throw new AppError(`${field} already exists`, 400);
  }

  const user = await User.create({ username, email, password, name, role });
  logger.info('User created', { userId: user._id, username });

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
  };
};

const updateUser = async (userId, updateData) => {
  const { username, email } = updateData;

  const user = await User.findById(userId);
  if (!user) throw new AppError('User not found', 404);

  if (username || email) {
    const orConditions = [
      ...(username ? [{ username }] : []),
      ...(email ? [{ email }] : []),
    ];
    const existing = await User.findOne({ _id: { $ne: userId }, $or: orConditions });
    if (existing) {
      const field = existing.username === username ? 'username' : 'email';
      throw new AppError(`${field} already exists`, 400);
    }
  }

  const updated = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).select('-password');

  logger.info('User updated', { userId, fields: Object.keys(updateData) });
  return updated;
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new AppError('User not found', 404);
  logger.info('User deleted', { userId, username: user.username });
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
