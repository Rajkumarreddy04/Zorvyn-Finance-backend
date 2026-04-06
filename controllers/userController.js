const supabase = require("../config/supabase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

console.log("Supabase:", supabase);

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    // ✅ Allowed roles
    const allowedRoles = ["viewer", "analyst", "admin"];

    if (!allowedRoles.includes(role)) {
        return res.status(400).json({
            msg: "Invalid role. Allowed roles: viewer, analyst, admin"
        });
    }

    const hashed = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
        .from("users")
        .insert([{ name, email, password: hashed, role }])
        .select();

    if (error) return res.status(400).json(error);

    res.json(data);
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

    if (error || !data)
        return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, data.password);

    if (!isMatch)
        return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign(
        { id: data.id, role: data.role },
        process.env.JWT_SECRET
    );

    res.json({ token });
};