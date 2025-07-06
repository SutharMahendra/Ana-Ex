import { useState } from "react";
import { uploadFile } from "../services/data";
import ChartDashboard from "../component/ChartDashboard";

function Upload() {
    const [file, setfile] = useState(null);
    const [loading, setloading] = useState(false);
    const [message, setmessage] = useState('');
    const token = localStorage.getItem('token');
    const [columns, setcolumns] = useState([]);
    const [data, setdata] = useState([]);

    const handleChange = (e) => {
        setfile(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            // check first if user select file or not?
            if (!file) {
                return setmessage('please select file first');
            }

            setloading(true);

            // we get respnoce from backend it call the data service to send file to the backend
            const res = await uploadFile(file, token);

            //backend send two things
            // first columns
            console.log('columns data', res.columns);
            setcolumns(res.columns);

            // second data
            console.log('all data', res.data);
            setdata(res.data);

            setmessage('uploaded successfully');
        } catch (error) {
            setmessage('upload failed');
            console.log('upload file error', error);
        } finally {
            setloading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full mt-8 px-4">
            <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xl">
                <h2 className="text-2xl font-bold text-green-700 text-center mb-4">
                    Upload Excel File
                </h2>

                <input
                    type="file"
                    accept=".xlsx"
                    onChange={handleChange}
                    className="mb-4 block w-full text-sm text-gray-600"
                />

                <button
                    onClick={handleUpload}
                    className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white px-4 py-2 rounded-lg font-semibold"
                >
                    {loading ? 'Uploading...' : 'Upload'}
                </button>

                {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
            </div>

            {/* Display ChartDashboard if data is available */}
            {data.length > 0 && (
                <div className="w-full mt-6">
                    <ChartDashboard columns={columns} data={data} />
                </div>
            )}
        </div>
    );
}

export default Upload;
