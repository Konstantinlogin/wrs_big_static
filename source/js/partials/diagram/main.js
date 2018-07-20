window.diagram = {
    draw: function(outsideData) {
        const MIN_SLICE_WIDTH = 0,
            MIN_DATA_VALUE = 0;

        Number.prototype.filterDataNum = function(n, x, s, c) {
            let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
                num = this.toFixed(Math.max(0, ~~n));

            return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
        };

        let sortArray = function () {
            let array = [],
                categories = [],
                categoriesAmount = [];

            outsideData.forEach(function(element, key) {
                if (categories.indexOf(element.category) === -1) {
                    categories.push(element.category);
                }
                array.push({
                    name: element.name,
                    color: element.color,
                    value: element.amount,
                    y: element.amount,
                    category: element.category
                });
            });

            categories.forEach(function(element, key) {
                categoriesAmount.push({category: element, amount: 0});
                array.forEach(function(innerElement, innerKey) {
                    if (element === innerElement.category) {
                        categoriesAmount[key].amount += innerElement.value
                    }
                });
            });

            let percentageFromCategory = 0;

            array.forEach(function(element, key) {
                categoriesAmount.forEach(function(innerElement, innerKey) {
                    if (element.category === innerElement.category) {
                        percentageFromCategory = (array[key].value / innerElement.amount)*100;
                        array[key].y = percentageFromCategory <= MIN_DATA_VALUE ? MIN_SLICE_WIDTH : percentageFromCategory;
                    }
                });
            });

            return {
                data: array,
                categories: categoriesAmount
            }
        };

        let sortedArray = sortArray();

        console.log(sortedArray);

        let drawChart = function() {
            Highcharts.chart('diagramContainer', {
                chart: {
                    type: 'pie',
                    spacingBottom:0,
                    spacingLeft:0,
                    spacingRight:0,
                    spacingTop:0,
                },
                title: {
                    text: 'Title'
                },
                plotOptions: {
                    pie: {
                        shadow: false,
                        startAngle: 180,
                        borderWidth: 0
                    }
                },
                tooltip: {
                    backgroundColor: null,
                    borderWidth: 0,
                    shadow: false,
                    useHTML: true,
                    style: {
                        padding: 0,
                    },
                    formatter: function() {
                        return '<b>' + this.point.name + '</b>: ' + (this.point.value.filterDataNum(2, 3, ' ', ',')) + ' &#8381;';
                    }
                },
                series: [{
                    data: sortedArray.data,
                    size: '100%',
                    innerSize: '75%',
                    showInLegend: false,
                    dataLabels: {
                        enabled: false
                    }
                }]
            });
        };
        drawChart();
    }
};