const User = require('../models/User');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');

const generateAuthToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

const registerUser = async (userData) => {
    const { name, email, password, role } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "User with this email already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        role: role || 'viewer' // default role is viewer
    });

    const createdUser = await User.findById(user._id).select("-password");

    return createdUser;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    if (!user.isActive) {
        throw new ApiError(403, "Your account has been deactivated. Please contact admin.");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password");
    }

    const token = generateAuthToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password");

    return { user: loggedInUser, token };
};

const updateUserRole = async (userId, newRole) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.role === 'admin' && newRole !== 'admin') {
        const adminCount = await User.countDocuments({ role: 'admin' });
        if (adminCount <= 1) {
            throw new ApiError(400, "Cannot change role of last admin");
        }
    }

    user.role = newRole;
    await user.save();

    return await User.findById(userId).select("-password");
};

const toggleUserStatus = async (userId, isActive) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.role === 'admin' && !isActive) {
        const adminCount = await User.countDocuments({ role: 'admin', isActive: true });
        if (adminCount <= 1) {
             throw new ApiError(400, "Cannot deactivate the last active admin");
        }
    }

    user.isActive = isActive;
    await user.save();

    return await User.findById(userId).select("-password");
};

module.exports = {
    registerUser,
    loginUser,
    updateUserRole,
    toggleUserStatus
};
