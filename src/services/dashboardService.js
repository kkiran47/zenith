const Record = require('../models/Record');

const getDashboardSummary = async () => {
    const [summary] = await Record.aggregate([
        { $match: { isDeleted: false } },
        {
            $group: {
                _id: null,
                totalIncome: {
                    $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] }
                },
                totalExpense: {
                    $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] }
                }
            }
        },
        {
            $project: {
                _id: 0,
                totalIncome: 1,
                totalExpense: 1,
                netBalance: { $subtract: ['$totalIncome', '$totalExpense'] }
            }
        }
    ]);

    const categoryTotals = await Record.aggregate([
        { $match: { isDeleted: false } },
        {
            $group: {
                _id: { type: '$type', category: '$category' },
                total: { $sum: '$amount' }
            }
        },
        {
            $group: {
                _id: '$_id.type',
                categories: {
                    $push: { category: '$_id.category', total: '$total' }
                }
            }
        }
    ]);

    const lastTransactions = await Record.find({ isDeleted: false })
        .sort({ date: -1, createdAt: -1 })
        .limit(5)
        .select('amount type category date note');

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyTrends = await Record.aggregate([
        { 
            $match: { 
                isDeleted: false,
                date: { $gte: sixMonthsAgo }
            } 
        },
        {
            $group: {
                _id: { 
                    year: { $year: "$date" }, 
                    month: { $month: "$date" },
                    type: "$type"
                },
                total: { $sum: "$amount" }
            }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    const trendsFormatted = monthlyTrends.reduce((acc, curr) => {
        const monthYear = `${curr._id.year}-${String(curr._id.month).padStart(2, '0')}`;
        if (!acc[monthYear]) {
            acc[monthYear] = { income: 0, expense: 0, month: monthYear };
        }
        acc[monthYear][curr._id.type] = curr.total;
        return acc;
    }, {});

    return {
        overall: summary || { totalIncome: 0, totalExpense: 0, netBalance: 0 },
        categoryWise: categoryTotals,
        recentTransactions: lastTransactions,
        monthlyTrends: Object.values(trendsFormatted)
    };
};

module.exports = {
    getDashboardSummary
};
