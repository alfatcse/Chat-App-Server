const express = require("express");
const router = express.Router();
const userController = require("../Controller/user.controller");
/**
 * @swagger
 * tags:
 *   - name: ChatUser
 *     description: User management APIs including registration, login, and avatar setup.
 */
/**
 * @swagger
 *   components:
 *     schemas:
 *       Chatuser:
 *         type: object
 *         required:
 *           - username
 *           - email
 *           - password
 *         properties:
 *           username:
 *             type: string
 *             description: User Name
 *           email:
 *             type: string
 *             description: User Email
 *           password:
 *             type: string
 *             description: User Password
 *           isAvatarImageSet:
 *             type: boolean
 *             description: Whether the user has set an avatar image
 *           avatarImage:
 *             type: string
 *             description: User Avatar Image (optional)
 *         example:
 *           username: Müller
 *           email: müller@gmail.com
 *           password: 12345678
 *           avatarImage: ""
 *           isAvatarImageSet: false
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - ChatUser
 *     summary: Create a new user and return the response
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chatuser'
 *           example:
 *             username: hasan
 *             email: hasan@gmail.com
 *             password: "12345678"
 *             avatarImage: ""
 *             isAvatarImageSet: false
 *     responses:
 *       200:
 *         description: Created user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: string
 *                   example: User Created
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 66dd8f0f6527be0ceef62baa
 *                     email:
 *                       type: string
 *                       example: hasan@gmail.com
 *                     username:
 *                       type: string
 *                       example: hasan
 *                     isAvatarImageSet:
 *                       type: boolean
 *                       example: false
 *                     avatarImage:
 *                       type: string
 *                       example: ""
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - ChatUser
 *     summary: Log in an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User Name
 *               password:
 *                 type: string
 *                 description: User Password
 *             example:
 *               username: hasan
 *               password: "12345678"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: string
 *                   example: User Logged In
 */

/**
 * @swagger
 * /user/setAvatar/{id}:
 *   post:
 *     tags:
 *       - ChatUser
 *     summary: Set an avatar for the user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               avatarImage:
 *                 type: string
 *                 description: The image URL to set as the avatar
 *             example:
 *               avatarImage: "http://example.com/avatar.jpg"
 *     responses:
 *       200:
 *         description: Avatar set successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: string
 *                   example: Avatar Set
 */

/**
 * @swagger
 * /user/allusers/{id}:
 *   get:
 *     tags:
 *       - ChatUser
 *     summary: Retrieve all users except the logged-in user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID of the logged-in user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chatuser'
 */
router.route("/register").post(userController.createUser);
router.route("/login").post(userController.loginUser);
router.route("/setAvatar/:id").post(userController.setAvatar);
router.route("/allusers/:id").get(userController.getAllusers);
module.exports = router;
