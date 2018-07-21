const elements = document.querySelectorAll('[data-show-text]');
Array.prototype.forEach.call(elements, function(el, i){
    let textElement = document.getElementById(el.getAttribute('data-show-text'));
    el.onclick = function (evt) {
        el.remove();
        textElement.style.display = '';
        evt.preventDefault();
        console.log(evt);
    };
});