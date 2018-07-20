window.diagram = {
    draw: function(outsideData) {

        const MIN_SLICE_WIDTH = 4000,
              MIN_DATA_VALUE = 3000;

        Number.prototype.filterDataNum = function(n, x, s, c) {
            let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
                num = this.toFixed(Math.max(0, ~~n));

            return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
        };

        let sortArray = function () {
            let array = [];
            for(let i=0; i<outsideData.length; i++) {
                if( outsideData[i].y < MIN_DATA_VALUE ) {
                    array.push({
                        name: data[i].name,
                        color: data[i].color,
                        value: data[i].y.filterDataNum(2, 3, ' ', ','),
                        y: MIN_SLICE_WIDTH
                    });
                } else {
                    array.push({
                        name: data[i].name,
                        color: data[i].color,
                        value: data[i].y.filterDataNum(2, 3, ' ', ','),
                        y: data[i].y
                    });
                }
            }
            return array;
        };

        let sortedData = sortArray();


        Highcharts.chart('container', {
            chart: {
                renderTo: 'container',
                type: 'pie',
                spacingBottom:0,
                spacingLeft:0,
                spacingRight:0,
                spacingTop:0,
            },
            yAxis: {
                categories: ['Apples', 'Bananas']
            },
            title: {
                text: 'Title'
            },
            plotOptions: {
                pie: {
                    shadow: false,
                    size: 210
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.point.name + '</b>: ' + (this.point.value ? this.point.value : this.y) + ' РУБ.';
                }
            },
            series: [{
                data: sortedData,
                size: '100%',
                innerSize: '75%',
                showInLegend: false,
                dataLabels: {
                    enabled: false
                }
            }]
        });
    }
};