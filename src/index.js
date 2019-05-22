import _ from 'lodash';
import './style.css';
import Icon from './icon.png';
import qrcode from 'qrjs2';

var grid;
var textBoxField;

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


}

function setCellEventListeners(cell) {

    if (cell.style.backgroundColor == "rgb(55, 55, 55)") {
        cell.style.backgroundColor = null;
        cell.classList.add('marked');
        cell.addEventListener('click', function (e) {
            // Adds marked class to cell



            if (checkValidCell(this) == true)
                rotateShapes(this);
            //if (this.classList.contains('clicked'))
            //    this.classList.remove('clicked')
            //else
            //    this.classList.add('clicked');
        });
    }
}


function checkValidCell(cell){
    var col  = cell.cellIndex + 1;  
    var row = cell.parentNode.rowIndex + 1;

    var rowLength = cell.parentNode.childElementCount;

    if (col < 8 && row < 8 )
        return false;
    else if(col < 8 && row > rowLength-8)
        return false;
    else if(col > rowLength-8 && row < 8)
        return false; 
    


    return true;    
}

function onLoad() {


    document.body.appendChild(TextBox());
    textBoxField.value = "https://www.inf.elte.hu/";

    grid = document.createElement("div");
    grid.setAttribute("id", "grid-div");
    grid.appendChild(clickableGrid("https://www.inf.elte.hu/"));
    document.body.appendChild(grid);

}

function clickableGrid(text) {

    var
        u = text,
        s = QRCode.generateHTML(u, {
            ecclevel: "M",
            fillcolor: "#FFFFFF",
            textcolor: "#373737",
            margin: 4,
            modulesize: 18
        });
    s.children[0].className = "grid";

    s.children[0].querySelectorAll("td").forEach(setCellEventListeners);
    return s;

}

onLoad();


//Will do rotate colors first
function rotateShapes(cell) {

    if (cell.classList.contains('shape1') ) {
        cell.classList.remove('shape1');
        cell.classList.add('shape2');
    }else if (cell.classList.contains('shape2') ) {
        cell.classList.remove('shape2');
        cell.classList.add('shape3');
    }else if (cell.classList.contains('shape3') ) {
        cell.classList.remove('shape3');
        cell.classList.add('shape4');
    }else if (cell.classList.contains('shape4') ) {
        cell.classList.remove('shape4');
        cell.classList.add('shape5');
    }else if (cell.classList.contains('shape5') ) {
        cell.classList.remove('shape5');
        cell.classList.add('shape6');
    }else if (cell.classList.contains('shape6') ) {
        cell.classList.remove('shape6');
    }else{
        cell.classList.add('shape1');
    }

}


