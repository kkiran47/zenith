const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const User = require('../models/User');

const authenticate = asyncHandler(async (req, res, next) => {
    let token = req.header('Authorization');

    if (!token || !token.startsWith('Bearer ')) {
        throw new ApiError(401, 'Unauthorized request: No token provided');
    }

    token = token.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decodedToken.id).select('-password');
        
        if (!user) {
            throw new ApiError(401, 'Invalid Access Token');
        }

        if (!user.isActive) {
            throw new ApiError(403, 'User account is deactivated');
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error.message || 'Invalid Access Token');
    }
});

module.exports = authenticate;
