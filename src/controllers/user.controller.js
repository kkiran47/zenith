const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const userService = require('../services/userService');

const registerUser = asyncHandler(async (req, res) => {
    const user = await userService.registerUser(req.body);
    res.status(201).json(new ApiResponse(201, user, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { user, token } = await userService.loginUser(email, password);
    res.status(200).json(new ApiResponse(200, { user, token }, "User logged in successfully"));
});

const updateUserRole = asyncHandler(async (req, res) => {
    const { role } = req.body;
    const { id } = req.params;
    
    const user = await userService.updateUserRole(id, role);
    res.status(200).json(new ApiResponse(200, user, "User role updated successfully"));
});

const toggleUserStatus = asyncHandler(async (req, res) => {
    const { isActive } = req.body;
    const { id } = req.params;

    const user = await userService.toggleUserStatus(id, isActive);
    res.status(200).json(new ApiResponse(200, user, "User status updated successfully"));
});

const getProfile = asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(200, req.user, "User profile fetched successfully"));
});

module.exports = {
    registerUser,
    loginUser,
    updateUserRole,
    toggleUserStatus,
    getProfile
};
