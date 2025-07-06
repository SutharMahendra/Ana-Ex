import e from "express";
import multer from "multer"; // use to store file in local storage
import path from "path"; // use to get/ set the file path/ extension of file
import { uploadFile } from "../controllers/uploadController.js";

const router = e.Router();

// this is use to store file in our local storage
const storage = multer.diskStorage({
    // multer is ask to "where should file store?"
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // cb = callback which reply to multer with ans of his question
    },

    // multer is ask "what should give a name to file?"
    // use to get the file name
    filename: (req, file, cb) => {
        // here we set unique name to file using current timestamp + original extension
        const extension = path.extname(file.originalname); // use to get extension of file
        cb(null, `${Date.now()}${extension}`); // callback reply to multer with new name
    }
});


// when file is uploaded we call the multer
const callMulter = multer({ storage });


// when user upload file the post request will created
// request send to uploadfile controller to get the data
router.post('/upload', callMulter.single('file'), uploadFile);

const uploadRoute = router;
export default uploadRoute;