window.diagram = {
    draw: function (outsideData) {
        const mainData = outsideData.data;
        const MIN_SLICE_WIDTH = 0.7,
            MIN_DATA_VALUE = 0.7,
            DIAGRAM_CONTAINER_ID = 'diagramContainer',
            DIAGRAM_CONTAINER_WRAPPER_ID = 'diagramContainerWrapper',
            DIAGRAM_CONTAINER_INNER_ID = 'diagramContainerInner',
            WARNING_CONTAINER_ID = 'diagramWarning',
            LEGEND_CONTAINER_ID = 'diagramLegend';

        function filterDataNum(value) {
            let n = 2,
                x = 3,
                s = ' ',
                c = ','
            let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
                num = value.toFixed(Math.max(0, ~~n));
            return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
        };

        let generateLegendSection = function (color, text, value) {
            return `
                <li class="rg-legend-list__item">
                    <i style="background:${color}" class="rg-legend-list__leg-color"></i>
                    <span class="rg-legend-list__text">${text}</span>
                    <span class="rg-legend-list__num">
                        <span>${filterDataNum(value)}</span> &#8381;
                    </span>
                </li>
            `;
        };

        let sortArray = function () {
            let array = [],
                categories = [],
                categoriesAmount = [],
                totalSumm = 0,
                legendSections = '';

            function sortBaseData (callback) {
                mainData.forEach(function (element, key) {
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

                    if (element.amount > 0) {
                        legendSections += generateLegendSection(element.color, element.name, element.amount);
                    }
                    totalSumm += element.amount;
                });
                callback();
            };

            function sortByCategories(callback) {
                categories.forEach(function (element, key) {
                    categoriesAmount.push({ category: element, amount: 0 });
                    array.forEach(function (innerElement, innerKey) {
                        if (element === innerElement.category) {
                            categoriesAmount[key].amount += innerElement.value
                        }
                    });
                });
                callback();
            };

            function sortByPercentageOfCategory () {
                let percentageFromCategory = 0;
                array.forEach(function (element, key) {
                    categoriesAmount.forEach(function (innerElement, innerKey) {
                        if (element.category === innerElement.category) {
                            percentageFromCategory = (array[key].value / innerElement.amount) * 100;
                            if (percentageFromCategory <= 0) {
                                array[key].y = 0; 
                            } else {
                                array[key].y = percentageFromCategory <= MIN_DATA_VALUE ? MIN_SLICE_WIDTH : percentageFromCategory;
                            }
                        }
                    });
                });
            };

            sortBaseData(function(){
                sortByCategories(function(){
                    sortByPercentageOfCategory();
                });
            });

            return {
                date: outsideData.date,
                data: array,
                categories: categoriesAmount,
                total: totalSumm,
                sections: legendSections
            }
        };

        let sortedArray = sortArray();

        let drawLegend = function () {
            document.getElementById(LEGEND_CONTAINER_ID).innerHTML = sortedArray.sections;
            if (outsideData.hasOwnProperty('showWarning') &&
                outsideData.showWarning === true
            ) {
                document.getElementById(WARNING_CONTAINER_ID).classList.remove('warning-hidden');
            } else {
                document.getElementById(WARNING_CONTAINER_ID).classList.add('warning-hidden');
            }
        };

        let titleTemplate = `
            <div class="rg-diagram-title">
                <div class="rg-diagram-title__number">
                    ${filterDataNum(sortedArray.total)} &#8381;
                </div>
                <div class="rg-diagram-title__description">
                    По состоянию на <br/>
                    ${sortedArray.date}
                </div>
            </div> `;

        let resizeDiagram = function () {
            let wrapperWidth = document.getElementById(DIAGRAM_CONTAINER_WRAPPER_ID).offsetWidth;
            let inner = document.getElementById(DIAGRAM_CONTAINER_INNER_ID);
            inner.style.width = wrapperWidth + 'px';
            inner.style.height = wrapperWidth + 'px';
        };

        let drawChart = function () {
            Highcharts.chart(DIAGRAM_CONTAINER_ID, {
                chart: {
                    type: 'pie',
                    spacingBottom: 0,
                    spacingLeft: 0,
                    spacingRight: 0,
                    spacingTop: 0,
                    marginTop: 0,
                    marginLeft: 0,
                    marginLeft: 0
                },
                title: {
                    text: titleTemplate,
                    align: 'center',
                    x: 0,
                    y: -20,
                    verticalAlign: 'middle',
                    useHTML: true,
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    pie: {
                        shadow: false,
                        startAngle: 180,
                        borderWidth: 0,
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
                    formatter: function () {
                        return `
                        <div class="rg-tooltip">
                            <div class="rg-tooltip__description" style="border-color: ${this.point.color}">
                                ${this.point.name}
                            </div>
                            <div class="rg-tooltip__number">
                                ${filterDataNum(this.point.value)} &#8381;
                            </div>
                        </div> `;
                    }
                },
                series: [{
                    data: sortedArray.data,
                    size: '100%',
                    innerSize: '70%',
                    showInLegend: false,
                    dataLabels: {
                        enabled: false
                    }
                }]
            });
        };

        resizeDiagram();
        let onWindowResize = function (evt) {
            resizeDiagram();
        };
        window.addEventListener('resize', onWindowResize);

        setTimeout(function () {
            drawChart();
            drawLegend();
        }, 100);


    }
};