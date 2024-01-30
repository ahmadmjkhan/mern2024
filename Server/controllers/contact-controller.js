const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
    try {
        const response = req.body;
        await Contact.create(response);
        return res.status(200).json({ message: "message Send Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Message not delivered" });
    }
}

module.exports = contactForm;