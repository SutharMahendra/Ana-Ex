import express from "express";
import { veriyfyToken } from "../middleware/auth.js";
import { deleteHistory, getHistory, saveChart } from "../controllers/DataController.js";

const router = express.Router();

// use to send the post request to the controller for save charts
router.post('/save', veriyfyToken, saveChart);

// use to send get request to get history
router.get('/history', veriyfyToken, getHistory);
router.delete('/delete/:id', veriyfyToken, deleteHistory);

const DataRoute = router;
export default DataRoute;