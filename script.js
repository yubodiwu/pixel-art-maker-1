"use strict"

// Constants... these are referenced in css files, if you change them beware!
const PALLET_PIXEL_CLASS = 'pallet-pixel';
const CANVAS_PIXEL_CLASS = 'canvas-pixel';

// TODO: globl brush color is not ideal, figure out how to fix this...
let brushColor = 'red';
let body = document.getElementsByTagName('body');

// MAIN ENTRY
window.onload = function main() {
    buildPallet(undefined, 40);
    buildCanvas(70, 140, 10);
}

/**
 * Builds the color pallet out of an array of input colors. Each item in the pallet
 * is a div, and has an event listener which sets the brush color on click.
 */
function buildPallet(colors, pxSize = 10) {
    let pallet = document.getElementById('pallet');

    if (colors === undefined) {
        colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white'];
    }

    for (let i = 0; i < colors.length; i++) {
        let curDiv = document.createElement('div');

        curDiv.className = 'pallet-pixel';
        curDiv.style.height = pxSize + 'px';
        curDiv.style.width = pxSize + 'px';
        curDiv.style.backgroundColor = colors[i];

        pallet.appendChild(curDiv);
    }

    let twoThirdsWidth = Math.floor(2 * window.innerWidth / 3);
    pallet.style.width = Math.min(twoThirdsWidth, colors.length * (pxSize + 12) + colors.length * 20) + 'px';

    pallet.addEventListener('click', setBrushColorHandler);
}

/**
 * This function creates a heigth by width grid of divs and attaches them to the canvas.
 * Each div in the returned HTML collection represents a pixel and has
 * an event listener attached to set their color to the current brushColor.
 */
function buildCanvas(height = 100, width = 100, pxSize = 10) {
    let canvas = document.getElementById('canvas');

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            let curDiv = document.createElement('div');

            curDiv.className = 'canvas-pixel';
            curDiv.style.height = pxSize + 'px';
            curDiv.style.width = pxSize + 'px';

            canvas.appendChild(curDiv);
        }
    }

    // Fit the canvas to the pixel size -- not "responsively" because pixel art isn't "responsive".
    canvas.style.width = ((width) * (pxSize + 2)) + 'px';
    canvas.style.height = ((height) * (pxSize + 2)) + 'px';
    console.log(body)

    window.addEventListener('mousedown', clickAndDrag);

    window.addEventListener('mouseup', checkEventListener);

    window.addEventListener('mouseup', stopPainting);

}

function checkEventListener(event) {
    console.log(event.target);
    console.log('mouseup triggered');
}

function stopPainting(event) {
    canvas.removeEventListener('mouseover', setBackgroundColorHandler)
}

// TRYING TO MAKE A REAL PAINTBRUSH
function clickAndDrag(event) {
    console.log('mousedown triggered')
    canvas.addEventListener('mouseover', setBackgroundColorHandler);
    // canvas.addEventListener('mouseup',)
    // canvas.removeEventListener('mouseup',setBackgroundColorHandler);
    // canvas.removeEventListener('mouseup',setBackgroundColorHandler)
}


// function addColor2Px(event) {
//     event.target
// }
/**
 * An event handler to set the background color of the target element to the current
 * brushColor.
 */
function setBackgroundColorHandler(event) {
    // Never color the whole canvas
    console.log(event.target.id);


    event.target.style.borderColor = brushColor;
    event.target.style.backgroundColor = brushColor;
    // return;


}

/**
 * An event handler to set the current brushColor to the background color of the
 * event which was clicked.
 */
function setBrushColorHandler(event) {
    // Never set the brush color to the pallets bg color

    if (event.target === event.currentTarget) {
        return;
    }

    brushColor = event.target.style.backgroundColor;
    console.log(brushColor)
}
