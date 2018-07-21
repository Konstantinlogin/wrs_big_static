window.dynamics = {
    draw: function (outsideData) {

        // const mainData = outsideData.data;
        const GRAPH_CONTAINER_ID = 'dynamicsContainer',
            GRAPH_CONTAINER_WRAPPER_ID = 'dynamicsContainerWrapper',
            GRAPH_CONTAINER_INNER_ID = 'dynamicsContainerInner';

        Highcharts.chart(GRAPH_CONTAINER_ID, {
            title: {
                text: null,
            },
            credits: {
                enabled: false
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            tooltip: {
                crosshairs: true
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010,
                    marker: {
                        fillColor: '#FFFFFF',
                        lineWidth: 2,
                        lineColor: null,
                        symbol: 'circle'
                    }
                },
                line: {
                    enableMouseTracking: true
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'Installation',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
                color: 'red'
            }, {
                name: 'Project Development',
                data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
            }, {
                name: 'Other',
                data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
            }],
        
        });

    }
};