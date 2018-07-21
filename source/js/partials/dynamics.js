window.dynamics = {
    draw: function (outsideData) {

        const mainData = outsideData.data;
        const startYear = outsideData.fromYear;
        const GRAPH_CONTAINER_ID = 'dynamicsContainer',
            GRAPH_CONTAINER_WRAPPER_ID = 'dynamicsContainerWrapper',
            GRAPH_CONTAINER_INNER_ID = 'dynamicsContainerInner',
            LEGEND_CONTSINER_ID = 'dynamicsLegend';

        let legendSections = '';

        function collectLegendSections(callback) {

            mainData.forEach(function (element, key) {
                legendSections +=
                    `<li class="dynamics__legend-item">
                        <i style="background: ${element.color}" class="dynamics__legend-item-point"></i>
                        <span class="dynamics__legend-text">${element.name}</span>
                    </li>`;
            });
            callback();
        };

        collectLegendSections(function () {
            let legendContainer = document.getElementById(LEGEND_CONTSINER_ID);
            legendContainer.innerHTML = legendSections;
        });

        let drawDynamics = function () {
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
                    borderRadius: 8,
                    backgroundColor: '#232c3d',
                    borderWidth: 0,
                    shadow: false,
                    useHTML: true,
                    style: {
                        padding: 0,
                        width: 420,
                    },
                    formatter: function () {
                        return `
                        <div class="dinamics-tooltip">
                            <div class="dinamics-tooltip__date">
                                ${this.point.x} г.
                            </div>
                            <div class="dinamics-tooltip__name">
                                ${this.series.name}
                            </div>
                            <div class="dinamics-tooltip__number">
                                ${this.point.y}%
                            </div>
                        </div> `;
                    }
                },
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: startYear,
                        marker: {
                            fillColor: '#FFFFFF',
                            lineWidth: 3,
                            lineColor: null,
                            symbol: 'circle',
                            radius: 6
                        },
                        lineWidth: 4
                    },
                    line: {
                        enableMouseTracking: true
                    }
                },
                legend: {
                    enabled: false
                },
                series: mainData
            });
        };
        drawDynamics();
    }
};