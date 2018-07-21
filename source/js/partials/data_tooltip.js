const elements = document.querySelectorAll('[data-tooltip]');
Array.prototype.forEach.call(elements, function(el, i){
    let textFromElement = document.getElementById(el.getAttribute('data-tooltip')).innerHTML;

    let generateTooltipTemplate = function (posX, posY) {
        return `<span class="rg-info-tooltip" style="left: ${posX}px; top: ${posY}px">
                <span class="rg-info-tooltip__caption">
                    <span class="rg-info-tooltip__caption-text">
                        ${textFromElement}
                    </span>
                </span>
        </span>`;
    } 

    let activeClass = false;


    let renderTooltip = function (target) {
        let elem = document.createElement('div'),
            idEnt = target.getAttribute('data-tooltip'),
            offsetTop = getCoords(elem).top,
            offsetLeft = getCoords(elem).left;

        console.log(getCoords(elem).top);

        elem.className = idEnt + '-tooltip-Wrapper';
        activeClass = idEnt + '-tooltip-Wrapper';
        setTimeout(function(){
            elem.innerHTML = generateTooltipTemplate(offsetLeft, offsetTop);
            document.body.appendChild(elem);
        }, 200);
    };

    let removeTooltip = function () {
        if (activeClass) {
            let activeTooltip = document.querySelector('.' + activeClass);
            activeTooltip.parentNode.removeChild(activeTooltip);
        }
    };

    el.onclick = function (evt) {
        removeTooltip();
        renderTooltip(evt.target);
    };
});