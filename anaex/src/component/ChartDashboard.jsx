import { useRef, useState } from 'react';
import {
    BarChart, Bar,
    LineChart, Line,
    PieChart, Pie, Cell,
    CartesianGrid, XAxis, YAxis, Tooltip, Legend,
    ResponsiveContainer
} from 'recharts';

import Download from './Download';
import BarChart3D from './3Dcharts/BarChart3D';
import LineChart3D from './3Dcharts/LineChart3D';
import PieChart3D from './3Dcharts/PieChart3D';
import { useDispatch } from 'react-redux';
import { saveChartData } from '../redux/slice/chartSlice';

const COLORS = ['#34D399', '#60A5FA', '#FBBF24', '#F87171'];

function ChartDashboard({ columns, data }) {
    const [xAxis, setXAxis] = useState('');
    const [yAxis, setYAxis] = useState('');
    const [zAxis, setzAxis] = useState('');
    const [chartType, setChartType] = useState('');
    const [chartTitle, setChartTitle] = useState('Chart');
    const [is3d, setis3d] = useState(false);

    const chartRef = useRef(null);
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    const isValid = xAxis && yAxis && chartType;

    const handleXAxisChange = (e) => setXAxis(e.target.value);
    const handleYAxisChange = (e) => setYAxis(e.target.value);
    const handleZAxisChange = (e) => setzAxis(e.target.value);
    const handleChartTypeChange = (e) => setChartType(e.target.value);
    const handleChartTitleChange = (e) => setChartTitle(e.target.value);
    const handleReset = () => {
        setXAxis('');
        setYAxis('');
        setzAxis('');
        setChartType('');
        setChartTitle('Chart');
    };

    const generateValue = () => {
        const xValue = [...new Set(data.map(item => item[xAxis]))];
        const yValue = [...new Set(data.map(item => item[yAxis]))];
        const zMatirx = yValue.map(yVal =>
            xValue.map(xVal => {
                const point = data.find(item => item[xAxis] === xVal && item[yAxis] === yVal);
                return point ? parseFloat(point[zAxis]) || 0 : 0;
            })
        )
        return { xValue, yValue, zMatirx };
    }

    const handleSave = () => {
        if (!isValid || !chartTitle) return;
        const payload = {
            title: chartTitle,
            chartType: is3d ? '3D' : '2D',
            xColumn: xAxis,
            yColumn: yAxis,
            fileType: is3d ? '3D' : '2D'
        };

        dispatch(saveChartData({ payload, token }))
            .unwrap()
            .then(() => alert('✅ Chart saved'))
            .catch(err => {
                console.log('error saving file', err);
                alert('❌ Failed to save chart');
            });
    };

    const renderChart = () => {
        if (!isValid) return null;
        const numericData = data.filter(item => !isNaN(item[yAxis]));

        switch (chartType) {
            case 'Bar':
                if (is3d) {
                    const { xValue, yValue, zMatirx } = generateValue();
                    return <BarChart3D xAxis={xValue} yAxis={yValue} zAxis={zMatirx} chartTitle={chartTitle} />;
                }
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={numericData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={xAxis} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey={yAxis} fill="#10B981" />
                        </BarChart>
                    </ResponsiveContainer>
                );
            case 'Line':
                if (is3d) {
                    const xValue = data.map(item => item[xAxis]);
                    const yValue = data.map(item => item[yAxis]);
                    const zValue = data.map(item => item[zAxis]);
                    return <LineChart3D xValue={xValue} yValue={yValue} zValue={zValue} chartTitle={chartTitle} />;
                }
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={numericData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={xAxis} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey={yAxis} stroke="#3B82F6" strokeWidth={4} />
                        </LineChart>
                    </ResponsiveContainer>
                );
            case 'Pie':
                if (is3d) {
                    const labels = data.map(item => item[xAxis]);
                    const values = data.map(item => parseFloat(item[yAxis] || 0));
                    return <PieChart3D labels={labels} values={values} chartTitle={chartTitle} />;
                }
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={numericData}
                                dataKey={yAxis}
                                nameKey={xAxis}
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
                                label
                            >
                                {numericData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-8 bg-white rounded-2xl shadow-xl mt-10 w-full">
            <h2 className="text-3xl font-extrabold text-green-700 text-center mb-8 tracking-wide">
                📊 Visualize Your Data
            </h2>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <input
                    type="text"
                    value={chartTitle}
                    onChange={handleChartTitleChange}
                    placeholder="Enter chart title"
                    className="col-span-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <select value={xAxis} onChange={handleXAxisChange} className="border p-2 rounded-md">
                    <option value="">Select X-axis</option>
                    {columns.map((col, idx) => (
                        <option key={idx} value={col}>{col}</option>
                    ))}
                </select>

                <select value={yAxis} onChange={handleYAxisChange} className="border p-2 rounded-md">
                    <option value="">Select Y-axis (numeric)</option>
                    {columns.map((col, idx) => (
                        <option key={idx} value={col}>{col}</option>
                    ))}
                </select>

                {is3d && chartType !== 'Pie' && (
                    <select value={zAxis} onChange={handleZAxisChange} className="border p-2 rounded-md">
                        <option value="">Select Z-axis</option>
                        {columns.map((col, idx) => (
                            <option key={idx} value={col}>{col}</option>
                        ))}
                    </select>
                )}

                <select value={chartType} onChange={handleChartTypeChange} className="border p-2 rounded-md">
                    <option value="">Select Chart Type</option>
                    <option value="Bar">Bar Chart</option>
                    <option value="Line">Line Chart</option>
                    <option value="Pie">Pie Chart</option>
                </select>
            </div>

            <div className="flex items-center gap-4 mb-8">
                <button
                    className={`px-4 py-2 rounded-md font-semibold transition-all ${is3d ? 'bg-green-600 text-white' : 'bg-gray-200 text-green-800'
                        }`}
                    onClick={() => setis3d(!is3d)}
                >
                    {is3d ? '3D Mode: On' : 'Enable 3D Mode'}
                </button>
                <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                    Reset
                </button>
            </div>

            {/* Data Table Preview */}
            <div className="overflow-x-auto mb-6 border rounded-lg">
                <table className="min-w-full text-sm border-collapse">
                    <thead className="bg-green-100 text-green-800">
                        <tr>
                            {columns.map((col, idx) => (
                                <th key={idx} className="border px-3 py-2 text-left font-semibold">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.slice(0, 5).map((row, i) => (
                            <tr key={i} className="even:bg-gray-50">
                                {columns.map((col, j) => (
                                    <td key={j} className="border px-3 py-1">{row[col]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="text-xs text-gray-500 mt-2 ml-1">* Showing first 5 rows only</p>
            </div>

            {/* Chart + Save/Download */}
            <div ref={chartRef}>
                {isValid ? (
                    <>
                        <h3 className="text-center text-xl font-bold mb-2">{chartTitle}</h3>
                        {renderChart()}
                        <Download reference={chartRef} title={chartTitle} onReset={handleReset} />
                        <button
                            onClick={handleSave}
                            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                        >
                            💾 Save Chart
                        </button>
                    </>
                ) : (
                    <p className="text-center text-gray-500">Please select X, Y, chart type to render chart.</p>
                )}
            </div>
        </div>
    );
}

export default ChartDashboard;
