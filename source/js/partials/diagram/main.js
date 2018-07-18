window.diagram = {
    draw: function (outsideData) {
        Highcharts.chart('container', {
            chart: {
              type: 'variablepie',
              dataLabels: {
                enabled: false,
                }
            },
            title: {
                text: "Some text here",
                margin: 0,
                y: 0,
                x: 0,
                align: 'center',
                verticalAlign: 'middle',
            },
            subtitle: {
                text: '... and subtitle styles',
                margin: 0,
                y: 20,
                x: 0,
                align: 'center',
                verticalAlign: 'middle',
            },
            tooltip: {
              headerFormat: '',
              pointFormat: '<span style="color:{point.color}">●</span> <b> {point.name}</b><br/>' +
                'Area (square km): <b>{point.y}</b><br/>' +
                'Population density (people per square km): <b>{point.z}</b><br/>'
            },
            series: [{
              minPointSize: 10,
              innerSize: '80%',
              zMin: 0,
              name: 'countries',
              data: outsideData
            }]
          });
    }
};