import Slider from '../component/Slider';
import Header from '../component/Header';
import Upload from './Upload';

function Dashboard() {
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50">
            <Slider />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-6">
                    <h2 className='text-3xl font-bold mb-6 text-green-700'>
                        Dashboard Overview
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white p-6 shadow-md rounded-2xl text-lg font-medium">
                            📊 Upload & Analyze Data
                        </div>
                        <div className="bg-white p-6 shadow-md rounded-2xl text-lg font-medium">
                            📈 Generate Predictions
                        </div>
                        <div className="bg-white p-6 shadow-md rounded-2xl text-lg font-medium">
                            🔍 Detect Anomalies
                        </div>
                    </div>
                    <Upload />
                    <div className="my-6 border-t border-gray-300"></div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
