import mongoose from "mongoose";
import { data } from "react-router-dom";

const chartSchema = new mongoose.Schema({
    // it gets the object id from user schema for perticular user 
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        require: true
    },
    title: String,
    chartType: String,
    xColumn: String,
    yColumn: String,
    fileType: String,
    timeStamp: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Chart', chartSchema);
