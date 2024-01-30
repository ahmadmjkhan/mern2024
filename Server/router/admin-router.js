const express = require('express');
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

router.route("/users").get(authMiddleware, adminController.getAllUsers);
// router.route("/users/:id").get(authMiddleware, adminController.getUserById)// authMiddleware cause error of authentication;
router.route("/users/:id").get(authMiddleware, adminController.getUserById);
router.route("/users/update/:id").patch(adminController.updateUserById);
router.route("/contacts").get(authMiddleware, adminController.getAllContacts);
router.route("/users/delete/:id").delete(authMiddleware, adminController.deleteUserById);
router.route("/contact/delete/:id").delete(authMiddleware, adminController.deleteContactById);

module.exports = router;