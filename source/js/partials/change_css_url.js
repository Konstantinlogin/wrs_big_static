const CSS_FILE_PATH = 'http://localhost:3000/project.css';
const cssLink = document.getElementById('local_dev_css');
const devStylesActive = localStorage.getItem('devStyles');

let changeCssUrl = function () {
    if (cssLink) {
        cssLink.setAttribute('href', CSS_FILE_PATH);
    }
};
if (devStylesActive) {
    changeCssUrl();
}