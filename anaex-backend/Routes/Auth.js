import express from 'express';
import { register, login } from '../controllers/AuthController.js';
const router = express.Router();

// when user is on /register, he post request with name email and password
// this request will handle by the register controlller and respond with jwt token
router.post('/register', register);

// when user is on /login , he post request with email and password
// this request will handle by the login controller and respond with jwt token
router.post('/login', login);

const authRoute = router;
export default authRoute