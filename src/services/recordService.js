const Record = require('../models/Record');
const ApiError = require('../utils/apiError');

const createRecord = async (recordData, userId) => {
    const record = await Record.create({
        ...recordData,
        createdBy: userId
    });
    return record;
};

const getRecords = async (query = {}) => {
    const { 
        page = 1, 
        limit = 10, 
        startDate, 
        endDate, 
        category, 
        type, 
        search,
        sortBy = 'date',
        sortOrder = 'desc'
    } = query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const filter = { isDeleted: false };

    if (startDate || endDate) {
        filter.date = {};
        if (startDate) filter.date.$gte = new Date(startDate);
        if (endDate) filter.date.$lte = new Date(endDate);
    }

    if (category) {
        filter.category = category;
    }

    if (type) {
        filter.type = type;
    }

    if (search) {
        filter.$or = [
            { note: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } }
        ];
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const records = await Record.find(filter)
        .populate('createdBy', 'name email role')
        .sort(sort)
        .skip(skip)
        .limit(limitNumber);

    const total = await Record.countDocuments(filter);

    return {
        records,
        pagination: {
            total,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(total / limitNumber)
        }
    };
};

const updateRecord = async (recordId, updateData) => {
    const record = await Record.findOne({ _id: recordId, isDeleted: false });
    
    if (!record) {
        throw new ApiError(404, "Record not found");
    }

    Object.assign(record, updateData);
    await record.save();

    return record;
};

const deleteRecord = async (recordId) => {
    const record = await Record.findOne({ _id: recordId, isDeleted: false });
    
    if (!record) {
        throw new ApiError(404, "Record not found");
    }

    record.isDeleted = true;
    await record.save();

    return record;
};

module.exports = {
    createRecord,
    getRecords,
    updateRecord,
    deleteRecord
};
