const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const dashboardService = require('../services/dashboardService');

const getSummary = asyncHandler(async (req, res) => {
    const summary = await dashboardService.getDashboardSummary();
    res.status(200).json(new ApiResponse(200, summary, "Dashboard summary fetched successfully"));
});

module.exports = {
    getSummary
};
