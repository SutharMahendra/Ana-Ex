import Plot from 'react-plotly.js';

function BarChart3D({ xAxis, yAxis, zAxis, chartTitle }) {

    const data = [
        {
            type: 'surface',
            x: xAxis,
            y: yAxis,
            z: zAxis,
            colorscale: 'virdis',
        }
    ];

    const layout =
    {
        title: { chartTitle },
        autosize: true,
        scane: {
            xaxis: { title: 'X-Axis' },
            yaxis: { title: 'Y-Axis' },
            zaxis: { title: 'Z-Axis' }
        },
        margin: { l: 50, r: 50, b: 50, t: 50 }
    }

    return (
        <div className="p-6 bg-white shadow rounded-xl">
            <Plot
                data={data}
                layout={layout}
                style={{ width: '100%', height: '500px' }}
            />
        </div>
    )
}

export default BarChart3D;
