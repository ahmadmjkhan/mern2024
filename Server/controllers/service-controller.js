const Services = require("../models/services-model");

const services = async (req, res) => {
    try {
        const response = await Services.find();
        if (!response) {
            res.status(404).json({ msg: "No Service Found" });
            return;
        }
        res.status(200).json({ msg: response });
    } catch (error) {

    }
}

module.exports = services;