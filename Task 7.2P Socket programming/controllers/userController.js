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

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/; //ensuring good password strength
        if (!passwordPattern.test(password)) {
            return res.status(400).send("Password must be at least 8 characters long and include atleast \n 1 uppercase,\n 1 lowercase,\n a number,\n a special character.");
        }


        const existing = await content.findOne({ email });
        if (existing) {
            return res.status(409).send("error! User with same email already exists");
        }

        if (
            !first_name.trim() || !last_name.trim() || !email.trim() || !password.trim()
        ) {
            return res.status(400).send("Detail Entries shouldn't be blank or whitespaces");
        }
        
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(first_name) || !nameRegex.test(last_name)) {
            return res.status(400).send("First and Last Names can contain only alphabets");
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
