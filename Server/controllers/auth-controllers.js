const User = require("../models/user-model");
const bcrypt = require('bcrypt');
const home = async (req, res) => {
    try {
        res.status(200).send("Welcome Home Page");
    } catch (error) {
        console.log(error);
    };
};

const register = async (req, res) => {
    try {
        // console.log(req.body);
        const { username, email, password, phone } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "Email Already Exist" });
        }

        // const hash_password = await bcrypt.hash(password,10);
        const userCreated = await User.create({ username, email, phone, password });
        // const userCreated  = await User.create({username,email,phone,password:hash_password});
        res.status(200).json({ msg: "Registration Successful", token: await userCreated.generateToken(), userId: userCreated._id.toString() });


    } catch (error) {
        // console.log(error);
        next(error);
    }
};

const login = async (req, res) => {
    try {
        // console.log(req.body);
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        // const user = await bcrypt.compare(password,userExist.password);
        const user = await userExist.comparePassword(password);

        if (user) {
            res.status(200).json({ msg: "Login Successful", token: await userExist.generateToken(), userId: userExist._id.toString() });
        } else {
            res.status(401).json({ msg: "Invalid Email or Password" });
        }


    } catch (error) {
        // console.log(error);
        next(error);
    }
};


const user = async (req, res) => {
    try {
        const userData = req.user;
        // console.log("msg server", userData);
        res.status(200).json({ userData });
    } catch (error) {
        console.log(error)
    }
}

module.exports = { home, register, login, user };