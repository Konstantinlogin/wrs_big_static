var devCss = function(value) {
    var devStylesActive = localStorage.getItem('devStyles');
    if (value && !devStylesActive) {
        localStorage.setItem('devStyles', 'true');
    } else if (!value && devStylesActive) {
        localStorage.removeItem('devStyles');
    }
};