import { error } from "console";
import Chart from "../models/Chart.js";


// here we save chart data in mondoDB
export const saveChart = async (req, res) => {
    try {
        // we get the data from frontend
        const { title, chartType, xColumn, yColumn, fileType } = req.body;
        const userId = req.user.id;

        // here we create instance of chart to save chart in mongoDB
        const chart = new Chart({
            user: userId,
            title,
            chartType,
            xColumn,
            yColumn,
            fileType
        });

        // wait till the chart is not saved
        await chart.save();

        // responce with message and chart data
        return res.status(201).json({ message: 'chart is saved successfully', chart });

    } catch (error) {
        return res.status(500).json({ message: 'error in save charts', error: error.message });
    }
};

// here we fetch the data from mondoDB

export const getHistory = async (req, res) => {
    try {
        // first we get the user id 
        const userId = req.user.id;

        // now we get history from mongoDb for perticular user and sort them in desending order
        const history = await Chart.find({ user: userId, }).sort({ timestamp: -1 });

        return res.status(200).json(history);

    } catch (error) {
        return res.status(500).json({ message: 'error to get history', error: error.message });
    }
}


export const deleteHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const chartId = req.params.id;
        const isdeleted = await Chart.findOneAndDelete({ _id: chartId, user: userId });

        if (!chartId) {
            return res.status(404).json({ message: 'not found chart', error: error.message });
        }

        return res.status(200).json({ message: 'Deleted successfully!' });
    } catch (error) {
        return res.status(500).json({ message: 'error to delete history', error: error.message });

    }
}

