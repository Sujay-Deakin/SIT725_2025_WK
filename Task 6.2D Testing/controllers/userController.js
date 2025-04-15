const content = require("../services/model")

exports.addContent = async (req, res) => {
    try {
        const first_name = req.query.first_name;
        const last_name = req.query.last_name;
        const password = req.query.password;
        const email = req.query.email;

        console.log("data", first_name, last_name, password, email);

        if (!first_name || !last_name || !email || !password) {
            return res.status(400).send("All fields are required");
        }

        // checking empty strings
        if (
            first_name.trim() === "" ||
            last_name.trim() === "" ||
            password.trim() === "" ||
            email.trim() === ""
        ) {
            return res.status(400).send("Fields cannot be empty");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send("Invalid email format");
        }

        const sampleProject = new content({ first_name, last_name, password, email });
        await sampleProject.save();
        console.log("content saved!");
        res.status(200).send("User project saved successfully");
    } catch (error) {
        console.log("failed", error);
        res.status(500).send("Server error");
    }
};
