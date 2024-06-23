import { Router } from "express";
import { imageUpload } from "../../../middleware/image-upload";
import AuthenticationController from "../controller/AuthenticationController";
import verifyToken from "../../../middleware/verifyToken";

const router = Router();

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - photo
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: Email exists
 *       500:
 *         description: Internal server error
 */
router.post('/register', imageUpload.single('photo'), AuthenticationController.register);

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Email not found
 *       409:
 *         description: Password is wrong
 *       500:
 *         description: Internal server error
 */
router.post('/login', AuthenticationController.login);

/**
 * @swagger
 * /api/v1/users/:
 *   get:
 *     summary: Get current user
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Current user retrieved
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/", verifyToken, AuthenticationController.myUser);

/**
 * @swagger
 * /api/v1/users/:
 *   put:
 *     summary: Update a user
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated successfully
 *       500:
 *         description: Internal server error
 */
router.put("/", verifyToken, imageUpload.single('photo'), AuthenticationController.updateUser);

/**
 * @swagger
 * /api/v1/users/:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/', verifyToken, AuthenticationController.deleteUser);

export default router;
