const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const recordService = require('../services/recordService');

const createRecord = asyncHandler(async (req, res) => {
    const record = await recordService.createRecord(req.body, req.user._id);
    res.status(201).json(new ApiResponse(201, record, "Record created successfully"));
});

const getRecords = asyncHandler(async (req, res) => {
    const result = await recordService.getRecords(req.query);
    res.status(200).json(new ApiResponse(200, result, "Records fetched successfully"));
});

const updateRecord = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const record = await recordService.updateRecord(id, req.body);
    res.status(200).json(new ApiResponse(200, record, "Record updated successfully"));
});

const deleteRecord = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const record = await recordService.deleteRecord(id);
    res.status(200).json(new ApiResponse(200, record, "Record deleted successfully"));
});

module.exports = {
    createRecord,
    getRecords,
    updateRecord,
    deleteRecord
};
