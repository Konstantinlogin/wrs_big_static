/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

var _change_css_url = __webpack_require__(2);

var change_css_url = _interopRequireWildcard(_change_css_url);

var _mobile_menu = __webpack_require__(3);

var mobile_menu = _interopRequireWildcard(_mobile_menu);

var _data_show_text = __webpack_require__(4);

var data_show_text = _interopRequireWildcard(_data_show_text);

var _main = __webpack_require__(5);

var diagram = _interopRequireWildcard(_main);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CSS_FILE_PATH = 'http://localhost:3000/project.css';
var cssLink = document.getElementById('local_dev_css');
var devStylesActive = localStorage.getItem('devStyles');

var changeCssUrl = function changeCssUrl() {
    if (cssLink) {
        cssLink.setAttribute('href', CSS_FILE_PATH);
    }
};
if (devStylesActive) {
    changeCssUrl();
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mobileBtn = document.querySelector('.js-mobile-menu');
var mobileMenu = document.querySelector('.js-mobile-nav');

var menuActive = true;

var onKeyDown = function onKeyDown(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        closeMenu();
    }
};

var onBodyClick = function onBodyClick(evt) {
    evt = evt || window.event;
    var targetHref = evt.target.getAttribute('href');
    if (/^#/.test(targetHref) || evt.target.classList.contains('js-mobile-link')) {
        closeMenu();
    }
};

var showMenu = function showMenu() {
    mobileBtn.classList.add('open');
    mobileMenu.classList.add('open');
    document.body.classList.add('mobile-menu-opened');
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onBodyClick);
    menuActive = false;
};
var closeMenu = function closeMenu() {
    mobileBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.classList.remove('mobile-menu-opened');
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('click', onBodyClick);
    menuActive = true;
};

mobileBtn.onclick = function () {
    if (menuActive) {
        showMenu();
    } else {
        closeMenu();
    }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var elements = document.querySelectorAll('[data-show-text]');
Array.prototype.forEach.call(elements, function (el, i) {
    var textElement = document.getElementById(el.getAttribute('data-show-text'));
    console.log(textElement);
    el.onclick = function (evt) {
        el.remove();
        textElement.style.display = '';
        evt.preventDefault();
        console.log(evt);
    };
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.diagram = {
    draw: function draw(outsideData) {
        Highcharts.chart('container', {
            chart: {
                type: 'variablepie',
                dataLabels: {
                    enabled: false
                }
            },
            title: {
                text: "Some text here",
                margin: 0,
                y: 0,
                x: 0,
                align: 'center',
                verticalAlign: 'middle'
            },
            subtitle: {
                text: '... and subtitle styles',
                margin: 0,
                y: 20,
                x: 0,
                align: 'center',
                verticalAlign: 'middle'
            },
            tooltip: {
                headerFormat: '',
                pointFormat: '<span style="color:{point.color}">●</span> <b> {point.name}</b><br/>' + 'Area (square km): <b>{point.y}</b><br/>' + 'Population density (people per square km): <b>{point.z}</b><br/>'
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

/***/ })
/******/ ]);