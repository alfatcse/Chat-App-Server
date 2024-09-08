const express = require("express");
const router = express.Router();
const messageController = require("../Controller/message.controller");
/**
 * @swagger
 * tags:
 *   - name: Message
 *     description: API for sending and receiving messages.
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - message
 *         - users
 *         - sender
 *       properties:
 *         message:
 *           type: object
 *           properties:
 *             text:
 *               type: string
 *               description: The content of the message
 *               example: "Hello, how are you?"
 *         users:
 *           type: array
 *           description: Array of user IDs involved in the conversation
 *           items:
 *             type: string
 *             description: User ID
 *             example: 613b1f1b6d1a4b1c2a1a1a1b
 *         sender:
 *           type: string
 *           description: The ID of the user who sent the message
 *           example: 613b1f1b6d1a4b1c2a1a1a1c
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time when the message was created
 *           example: 2021-09-10T14:48:00.000Z
 */
/**
 * @swagger
 * /message/addmsg:
 *   post:
 *     tags:
 *       - Message
 *     summary: Add a new message to the conversation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: The content of the message
 *                 example: "Hello, how are you?"
 *               to:
 *                 type: string
 *                 description: User ID of the recipient
 *                 example: 613b1f1b6d1a4b1c2a1a1a1b
 *               from:
 *                 type: string
 *                 description: The ID of the user who sent the message
 *                 example: 613b1f1b6d1a4b1c2a1a1a1c
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: The time the message was created
 *                 example: 2021-09-10T14:48:00.000Z
 * 
 *     responses:
 *       200:
 *         description: Message added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                       example: "Hello, how are you?"
 *                     users:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: [613b1f1b6d1a4b1c2a1a1a1b, 613b1f1b6d1a4b1c2a1a1a1c]
 *                     sender:
 *                       type: string
 *                       example: 613b1f1b6d1a4b1c2a1a1a1c
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2021-09-10T14:48:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 */

/**
 * @swagger
 * /message/getallmessages:
 *   post:
 *     tags:
 *       - Message
 *     summary: Get all messages between users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from:
 *                 type: string
 *                 description: The ID of the user who sent the messages
 *                 example: 613b1f1b6d1a4b1c2a1a1a1c
 *               to:
 *                 type: string
 *                 description: The ID of the user who receives the messages
 *                 example: 613b1f1b6d1a4b1c2a1a1a1b
 *     responses:
 *       200:
 *         description: A list of messages between the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: object
 *                     properties:
 *                       text:
 *                         type: string
 *                         example: "Hello, how are you?"
 *                   sender:
 *                     type: string
 *                     description: ID of the message sender
 *                     example: 613b1f1b6d1a4b1c2a1a1a1c
 *                   users:
 *                     type: array
 *                     description: List of user IDs involved in the conversation
 *                     items:
 *                       type: string
 *                     example: [613b1f1b6d1a4b1c2a1a1a1c, 613b1f1b6d1a4b1c2a1a1a1b]
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2021-09-10T14:48:00.000Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2021-09-10T14:50:00.000Z
 */

router.route("/addmsg").post(messageController.addMessage);
router.route("/getallmessages").post(messageController.getMessages);
module.exports = router;
