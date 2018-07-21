import "../css/project.sass";

import * as change_css_url from './partials/change_css_url.js';
import * as mobile_menu from './partials/mobile_menu.js';
import * as data_show_text from './partials/data_show_text.js';
import * as diagram from './partials/diagram.js';
// import * as data_tooltip from './partials/data_tooltip.js';

import Highcharts from 'highcharts';
import addVariablePie from "highcharts/modules/variable-pie";
addVariablePie(Highcharts);

window.Highcharts = Highcharts;