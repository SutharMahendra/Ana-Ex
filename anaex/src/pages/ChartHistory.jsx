import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Slider from '../component/Slider';
import Header from '../component/Header';
import { deleteHistory, fetchChartHistory } from '../redux/slice/chartSlice';

function ChartHistory() {
    const { chartHistory, loading, error } = useSelector((state) => state.history);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token) {
            dispatch(fetchChartHistory(token));
        }
    }, [token, dispatch]);

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50">
            <Slider />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-8">
                    <h2 className="text-3xl font-extrabold text-green-700 mb-8 tracking-wide">
                        📂 Your Chart History
                    </h2>

                    {loading ? (
                        <p className="text-gray-600 text-lg">Loading history...</p>
                    ) : error ? (
                        <p className="text-red-600 font-medium">{error}</p>
                    ) : chartHistory.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-200 rounded-lg shadow-lg bg-white">
                                <thead className="bg-green-600 text-white text-sm uppercase tracking-wider">
                                    <tr>
                                        <th className="px-5 py-3 text-left">#</th>
                                        <th className="px-5 py-3 text-left">Chart Type</th>
                                        <th className="px-5 py-3 text-left">X Column</th>
                                        <th className="px-5 py-3 text-left">Y Column</th>
                                        <th className="px-5 py-3 text-left">Title</th>
                                        <th className="px-5 py-3 text-left">Timestamp</th>
                                        <th className="px-5 py-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-gray-700">
                                    {chartHistory.map((item, idx) => (
                                        <tr key={item._id} className="hover:bg-green-50 transition">
                                            <td className="px-5 py-3 font-medium">{idx + 1}</td>
                                            <td className="px-5 py-3">{item.chartType}</td>
                                            <td className="px-5 py-3">{item.xColumn}</td>
                                            <td className="px-5 py-3">{item.yColumn}</td>
                                            <td className="px-5 py-3">{item.title}</td>
                                            <td className="px-5 py-3 text-gray-500">
                                                {new Date(item.timeStamp).toLocaleString()}
                                            </td>
                                            <td className="px-5 py-3">
                                                <button
                                                    onClick={() => dispatch(deleteHistory({ chartId: item._id, token }))}
                                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-600 text-lg">No chart history found.</p>
                    )}
                </main>
            </div>
        </div>
    );
}

export default ChartHistory;
