import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highcharts3d from 'highcharts/highcharts-3d'


const PieChart3D = ({ labels, values, chartTitle }) => {
    const formateData = labels.map((labels, index) => [labels, values[index]]);
    const pieChartOptions = {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: chartTitle || '3D Pia Chart',
            align: 'left'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Share',
            data: formateData
        }]
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
        </div>
    );
};

export default PieChart3D