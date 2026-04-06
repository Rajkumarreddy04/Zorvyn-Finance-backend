const supabase = require("../config/supabase");

exports.getSummary = async (req, res) => {
    const { data, error } = await supabase
        .from("records")
        .select("*");

    if (error) return res.status(400).json(error);

    let income = 0;
    let expense = 0;
    let categoryMap = {};

    data.forEach((r) => {
        if (r.type === "income") income += Number(r.amount);
        else expense += Number(r.amount);

        categoryMap[r.category] =
            (categoryMap[r.category] || 0) + Number(r.amount);
    });

    res.json({
        totalIncome: income,
        totalExpense: expense,
        netBalance: income - expense,
        categoryBreakdown: categoryMap,
        recent: data.slice(-5)
    });
};