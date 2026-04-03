const ApiError = require('../utils/apiError');

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return next(new ApiError(401, 'Unauthorized request: User details not found'));
        }

        if (!allowedRoles.includes(req.user.role)) {
            return next(new ApiError(403, `Role '${req.user.role}' is not allowed to access this resource`));
        }

        next();
    };
};

module.exports = authorizeRoles;
