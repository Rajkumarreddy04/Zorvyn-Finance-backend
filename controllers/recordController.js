const supabase = require("../config/supabase");

exports.createRecord = async (req, res) => {
    const { data, error } = await supabase
        .from("records")
        .insert([{ ...req.body, created_by: req.user.id }])
        .select();

    if (error) return res.status(400).json(error);

    res.json(data);
};

exports.getRecords = async (req, res) => {
    const { data, error } = await supabase
        .from("records")
        .select("*");

    if (error) return res.status(400).json(error);

    res.json(data);
};

exports.updateRecord = async (req, res) => {
    const { data, error } = await supabase
        .from("records")
        .update(req.body)
        .eq("id", req.params.id)
        .select();

    if (error) return res.status(400).json(error);

    res.json(data);
};

exports.deleteRecord = async (req, res) => {
    const { error } = await supabase
        .from("records")
        .delete()
        .eq("id", req.params.id);

    if (error) return res.status(400).json(error);

    res.json({ msg: "Deleted" });
};