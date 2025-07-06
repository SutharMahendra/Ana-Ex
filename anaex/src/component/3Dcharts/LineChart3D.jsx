import Plot from 'react-plotly.js';

function LineChart3D({ xValue, yValue, zValue, chartTitle }) {
    const data = [
        {
            type: 'scatter3d',
            mode: 'lines+markers',
            x: xValue,
            y: yValue,
            z: zValue,
            line: {
                width: 6,
                color: '#636EFA',
            },
            marker: {
                size: 4,
                color: '#EF553B',
            }
        }
    ];

    const layout = {
        title: chartTitle || '3D Line Chart',
        autosize: true,
        scene: {
            xaxis: { title: 'X-Axis', backgroundcolor: "#f0f0f0" },
            yaxis: { title: 'Y-Axis', backgroundcolor: "#f0f0f0" },
            zaxis: { title: 'Z-Axis', backgroundcolor: "#f0f0f0" }
        },
        margin: { l: 50, r: 50, b: 50, t: 50 },
    };

    return (
        <div className="p-6 bg-white shadow rounded-xl">
            <Plot
                data={data}
                layout={layout}
                style={{ width: '100%', height: '500px' }}
                config={{ responsive: true }}
            />
        </div>
    );
}

export default LineChart3D;
