import XLSX from "xlsx";  // use to parse excel file
import fs from "fs"; // use to delete the file from our local system


// here we simply convert excel data into json 
export const uploadFile = ((req, res) => {
    try {

        // we get path of uploaded file
        const filePath = req.file.path;

        // we use xlsx to read file
        const fileRead = XLSX.readFile(filePath);

        // may be chance that there is many sheet
        // but we work only with first sheet
        const sheetName = fileRead.SheetNames[0];

        // convert excel data into json file
        const data = XLSX.utils.sheet_to_json(fileRead.Sheets[sheetName]);

        // now no need of excel file in our local storage so delete it
        fs.unlinkSync(filePath);

        return res.status(201).json({
            columns: Object.keys(data[0] || {}),
            data
        });

    } catch (error) {
        return res.status(500).json({
            message: 'error to parse the file',
            error: error.message
        });
    }
});