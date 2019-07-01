import _ from 'lodash';
import './style.css';
import Icon from './icon.png';
import qrcode from 'qrjs2';

//import SVG from 'svgjs'

//const fs = require('fs');


var grid;
var textBoxField;
var toolGrid;
var selectedShape;
var selectedShapeClass;
var selectedShapeIndex;
var selectedShapeColor = "#373737"
var selectedBackgroundColor = "#FFFFFF"
var isMouseDown = false;

var shapes = [];


function setColor(first) {

    shapes = [

        '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="224.19251234649042 234.48933004818042 22.045407685048616 22.045407685048588" width="18" height="18">    <defs>        <path d="M228.85 234.49L246.24 239.15L241.58 256.53L224.19 251.88L228.85 234.49Z" id="b1epJBBya">        </path>        <path d="M0 0L400 0L400 400L0 400L0 0Z" id="doIFws33x"></path>    </defs>        <g>            <g>                <use xlink:href="#doIFws33x" opacity="1" fill="' + selectedBackgroundColor + '" fill-opacity="1"></use>            </g>        </g>    <g>        <use xlink:href="#b1epJBBya" opacity="1" fill="' + selectedShapeColor + '" fill-opacity="1">        </use>    </g></svg>',
        '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="222.4872941276563 232.78411182934684 25.455844122715746 25.455844122715746" width="18" height="18"><defs><path d="M235.22 232.78L247.94 245.51L235.22 258.24L222.49 245.51L235.22 232.78Z" id="b4esh8CIQA"></path><path d="M0 0L400 0L400 400L0 400L0 0Z" id="doIFws33x"></path></defs><g><g><use xlink:href="#doIFws33x" opacity="1" fill="' + selectedBackgroundColor + '" fill-opacity="1"></use></g></g><g><use xlink:href="#b4esh8CIQA" opacity="1" fill="' + selectedShapeColor + '" fill-opacity="1"></use></g></svg>',
        '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="223.4561495051262 233.75296720681678 23.518133367774823 23.51813336777485" width="18" height="18"><defs><path d="M240.09 233.75L246.97 250.38L230.34 257.27L223.46 240.64L240.09 233.75Z" id="a25D55ffkb"></path><path d="M0 0L400 0L400 400L0 400L0 0Z" id="doIFws33x"></path></defs><g><g><use xlink:href="#doIFws33x" opacity="1" fill="' + selectedBackgroundColor + '" fill-opacity="1"></use></g></g><g><use xlink:href="#a25D55ffkb" opacity="1" fill="' + selectedShapeColor + '" fill-opacity="1"></use></g></svg>',
        '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 400 400" width="18" height="18"><defs><path d="M350 50L0 0L50 350L400 400L350 50Z" id="bveysfU3l"><path d="M0 0L400 0L400 400L0 400L0 0Z" id="doIFws33x"></path></path></defs><g><g><use xlink:href="#doIFws33x" opacity="1" fill="' + selectedBackgroundColor + '" fill-opacity="1"></use></g></g><g><use xlink:href="#bveysfU3l" opacity="1" fill="' + selectedShapeColor + '" fill-opacity="1"></use></g></svg>',
        '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 400 400" width="18" height="18"><defs><path d="M350 350L0 400L50 50L400 0L350 350Z" id="b3RJcFDS3l"></path><path d="M0 0L400 0L400 400L0 400L0 0Z" id="doIFws33x"></path></defs><g><g><use xlink:href="#doIFws33x" opacity="1" fill="' + selectedBackgroundColor + '" fill-opacity="1"></use></g></g><g><use xlink:href="#b3RJcFDS3l" opacity="1" fill="' + selectedShapeColor + '" fill-opacity="1"></use></g></svg>',
        '<?xml version="1.0" encoding="UTF-8" standalone="no"?>    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 400 400" width="18" height="18"><defs><path d="M0 0L400 0L400 400L0 400L0 0Z" id="doIFws33x"></path><path d="M63 62L338 62L338 337L63 337L63 62Z" id="jQ2Tyg38B"></path></defs><g><g><use xlink:href="#doIFws33x" opacity="1" fill="' + selectedBackgroundColor + '" fill-opacity="1"></use></g><g><use xlink:href="#jQ2Tyg38B" opacity="1" fill="' + selectedShapeColor + '" fill-opacity="1"></use></g></g></svg>'


    ];
    if (!first)
        document.getElementsByClassName("qrcode")[0].children[0].querySelectorAll("td").forEach(function (e) {
            if (e.className == "marked")
                e.style.backgroundColor = selectedShapeColor;  
            else if (IsShapeClass(e.classList) == true){
                e.style.backgroundColor = selectedBackgroundColor;
            }
            e.style.backgroundImage = "url(data:image/svg+xml;base64," + window.btoa(getShapeClass(e.classList)) + ")";
            
        })
        selectedShape = updateSelectedShape();
}

function updateSelectedShape(){
    
    selectedShape = shapes[selectedShapeIndex];
    selectedShapeClass = "shape" + (selectedShapeIndex+1);

}

function IsShapeClass(classlist) {
    var result = false;
    classlist.forEach(function (e) {
        var array = ["shape1", "shape2", "shape3", "shape4", "shape5", "shape6"];
        for (let index = 0; index < array.length; index++) {
            if (e == array[index])
                result = true;
        }
    });
    return result
}


function TextBox() {

    textBoxField = document.createElement("input");
    textBoxField.classList.add("text_input");
    textBoxField.addEventListener('input', function (evt) {
        grid = clickableGrid(this.value);
        updateGrid();

    });


    return textBoxField;

}


function updateGrid() {
    var myNode = document.getElementById("grid-div");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    document.getElementById("grid-div").appendChild(grid);
    setColor(false);

}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? "rgb("+ parseInt(result[1], 16) +", "+ parseInt(result[2], 16) +", "+ parseInt(result[3], 16)+")" : null;
  }

function setCellEventListeners(cell) {

    if (cell.style.backgroundColor == hexToRgb(selectedShapeColor) ) {
        cell.style.backgroundColor = null;
        cell.classList.add('marked');

        cell.addEventListener('mousedown', function (e) {

            isMouseDown = true;

            paintShapes(this)

            return false;
        });

        cell.addEventListener('mouseover', function (e) {
            if (isMouseDown) {
                paintShapes(this);
            }
        });


        //        cell.addEventListener('click', function (e) {
        //            // Adds marked class to cell
        //
        //
        //
        //            if (checkValidCell(this) == true)
        //                rotateShapes(this);
        //            //if (this.classList.contains('clicked'))
        //            //    this.classList.remove('clicked')
        //            //else
        //            //    this.classList.add('clicked');
        //        });
    }
}


function checkValidCell(cell) {
    var col = cell.cellIndex + 1;
    var row = cell.parentNode.rowIndex + 1;

    var rowLength = cell.parentNode.childElementCount;

    if (col < 8 && row < 8)
        return false;
    else if (col < 8 && row > rowLength - 8)
        return false;
    else if (col > rowLength - 8 && row < 8)
        return false;



    return true;
}

function onLoad() {

    setColor(true);
    document.body.appendChild(Guide());
    document.body.appendChild(TextBox());
    textBoxField.value = "https://www.inf.elte.hu/";

    grid = document.createElement("div");
    grid.setAttribute("id", "grid-div");
    grid.appendChild(clickableGrid("https://www.inf.elte.hu/"));
    document.body.appendChild(toolBox());
    document.body.appendChild(grid);

    document.addEventListener("mouseup", function (e) {
        isMouseDown = false;
    });

}


function toolBox() {
    toolGrid = document.createElement("div");
    toolGrid.setAttribute("id", "tool-div");

    var shapeColorInput = document.createElement("input");

    shapeColorInput.classList.add("color_input");
    shapeColorInput.type = "color";
    shapeColorInput.id = "shapeColor";
    shapeColorInput.name = "shapeColor";
    shapeColorInput.value = "#373737";


    shapeColorInput.addEventListener('change', function (e) {

        selectedShapeColor = e.currentTarget.value;
        setColor(false);
    });

    var shapeColorLabel = document.createElement("label");
    shapeColorLabel.htmlFor = "shapeColor";
    shapeColorLabel.name = "shapeColorLabel";
    shapeColorLabel.innerText = "Shape Color";

    var backColorInput = document.createElement("input");

    backColorInput.classList.add("color_input");
    backColorInput.type = "color";
    backColorInput.id = "backColorInput";
    backColorInput.name = "backColorInput";
    backColorInput.value = "#FFFFFF";

    var backColorLabel = document.createElement("label");
    backColorLabel.htmlFor = "backColorInput";
    backColorLabel.name = "backColorLabel";
    backColorLabel.innerText = "Background Color";

    backColorInput.addEventListener('change', function (e) {

        document.getElementsByClassName("qrcode")[0].children[0].style.backgroundColor = e.currentTarget.value;
        document.getElementsByClassName("qrcode")[0].children[0].style.borderColor = e.currentTarget.value;
        selectedBackgroundColor = e.currentTarget.value;
        setColor(false);
    });

    var toolGridTable = document.createElement("table");
    toolGridTable.classList.add("toolbox");
    toolGridTable.classList.add("grid");

    var tbdy = document.createElement('tbody');
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');


    var td = document.createElement('td');
    td.classList.add("toolboxitem");
    td.classList.add("marked");
    td.appendChild(document.createTextNode('\u0020'));


    td1.classList.add("toolboxitem");
    //td1.classList.add("shape1");

    td1.style.backgroundImage = "url(data:image/svg+xml;base64," + window.btoa(shapes[0]) + ")";
    td1.style.backgroundRepeat = "no-repeat";
    td1.classList.add("toolboxitem");
    td1.classList.add("shape1");
    td1.appendChild(document.createTextNode('\u0020'));

    td2.style.backgroundImage = "url(data:image/svg+xml;base64," + window.btoa(shapes[1]) + ")";
    td2.style.backgroundRepeat = "no-repeat";
    td2.classList.add("toolboxitem");
    td2.classList.add("shape2");
    td2.appendChild(document.createTextNode('\u0020'));


    td3.style.backgroundImage = "url(data:image/svg+xml;base64," + window.btoa(shapes[2]) + ")";
    td3.style.backgroundRepeat = "no-repeat";
    td3.classList.add("toolboxitem");
    td3.classList.add("shape3");
    td3.appendChild(document.createTextNode('\u0020'));


    td4.style.backgroundImage = "url(data:image/svg+xml;base64," + window.btoa(shapes[3]) + ")";
    td4.style.backgroundRepeat = "no-repeat";
    td4.classList.add("toolboxitem");
    td4.classList.add("shape4");
    td4.appendChild(document.createTextNode('\u0020'));


    td5.style.backgroundImage = "url(data:image/svg+xml;base64," + window.btoa(shapes[4]) + ")";
    td5.style.backgroundRepeat = "no-repeat";
    td5.classList.add("toolboxitem");
    td5.classList.add("shape5");
    td5.appendChild(document.createTextNode('\u0020'));


    td6.style.backgroundImage = "url(data:image/svg+xml;base64," + window.btoa(shapes[5]) + ")";
    td6.style.backgroundRepeat = "no-repeat";
    td6.classList.add("toolboxitem");
    td6.classList.add("shape6");
    td6.appendChild(document.createTextNode('\u0020'));


    tr.appendChild(td);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);




    tbdy.appendChild(tr);
    toolGridTable.appendChild(tbdy);

    toolGrid.appendChild(toolGridTable);
    toolGrid.appendChild(shapeColorLabel);
    toolGrid.appendChild(shapeColorInput);
    toolGrid.appendChild(backColorLabel);
    toolGrid.appendChild(backColorInput);


    toolGridTable.children[0].querySelectorAll("td").forEach(selectShape);

    return toolGrid;

}


function selectShape(cell) {
    cell.addEventListener('click', function (e) {
        selectedShape = getShapeClass(this.classList);
    });
}

function getShapeClass(cellClasses) {

    if (cellClasses.contains("shape1")) {
        selectedShapeClass = "shape1"
        selectedShapeIndex = 0;
        return shapes[0]

    }
    if (cellClasses.contains("shape2")) {
        selectedShapeClass = "shape2"
        selectedShapeIndex = 1;
        return shapes[1]

    }
    if (cellClasses.contains("shape3")) {
        selectedShapeClass = "shape3"
        selectedShapeIndex = 2;
        return shapes[2]

    }
    if (cellClasses.contains("shape4")) {
        selectedShapeClass = "shape4"
        selectedShapeIndex = 3;
        return shapes[3]

    }
    if (cellClasses.contains("shape5")) {
        selectedShapeClass = "shape5"
        selectedShapeIndex = 4;
        return shapes[4]

    }
    if (cellClasses.contains("shape6")) {
        selectedShapeClass = "shape6"
        selectedShapeIndex = 5;
        return shapes[5]

    }

    return null

}

function clickableGrid(text) {

    var
        u = text,
        s = QRCode.generateHTML(u, {
            ecclevel: "M",
            fillcolor: selectedBackgroundColor,
            textcolor: selectedShapeColor,
            margin: 1,
            modulesize: 18
        });
    s.children[0].className = "grid";

    s.children[0].querySelectorAll("td").forEach(setCellEventListeners);


    return s;

}

onLoad();



function paintShapes(cell) {

    if (checkValidCell(cell)) {

        if (!selectedShape) {
            cell.style.backgroundImage = null;
            cell.className = "marked";
            cell.style.backgroundColor = selectedShapeColor
        } else {
            cell.classList.remove(cell.classList[cell.classList.length - 1]);
            cell.style.backgroundColor = selectedBackgroundColor
            cell.style.backgroundImage = "url(data:image/svg+xml;base64," + window.btoa(selectedShape) + ")";
            cell.style.backgroundRepeat = "no-repeat";
            cell.classList.add(selectedShapeClass);
        }

    }
}

function Guide() {

    var description = document.createElement("div");
    description.innerHTML = `<blockquote>
    <p style="text-align: left;">1- Enter the text you want to create QR code from to the input below. It will automatically generate QR code.</p>
    <p style="text-align: left;">2- You can select&nbsp; shapes from the toolbox below the input field. It will snap to your mouse cursor. Then you can use it like brush over the QR code to paint it. Start brushing from a valid node.</p>
    <p style="text-align: left;">3- You can also change color palette from the options below. You need to reselect the shape after changing colors.</p>
    </blockquote>`;

    return description;

}






