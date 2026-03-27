const catchAsync = require('../utils/catchAsync');
const userService = require('../services/userService');

const getAllUsers = catchAsync(async (req, res) => {
  const { page = 1, limit = 10, search = '', role = '' } = req.query;
  const result = await userService.getAllUsers({
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    search,
    role,
  });
  res.json({ status: 'success', data: result.users, pagination: result.pagination });
});

const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json({ status: 'success', data: { user } });
});

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json({ status: 'success', data: { user } });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.json({ status: 'success', data: { user } });
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(204).send();
});

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
