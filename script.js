let body = document.querySelector("body");
let canvas = document.querySelector("canvas");
let reset = document.querySelector(".fa-plus-square");
let squareTool = document.querySelector(".fa-square");
let lineTool = document.querySelector(".fa-arrows-alt-v");
let pencil = document.querySelector(".fa-pencil-alt");
let eraser = document.querySelector(".fa-eraser");
let size = document.querySelectorAll(".size");
let notes = document.querySelector(".fa-sticky-note");
let download = document.querySelector(".fa-save");

canvas.width = window.innerWidth; // Setting width of Canvas
canvas.height = window.innerHeight; // Setting height of Canvas

let tool = canvas.getContext("2d"); // Canvas property which allows 2d Creation.
tool.strokeStyle = "white"; //default Color
let ctool = "pencil"; // Default Tool
let drawingMode = false;

let iX, iY, fX, fY;


// Inserting Shapes
pencil.addEventListener("click", function () {
    if (ctool == "pencil") {
        size[0].style.display = 'block';
    }
    else {
        for (let i = 0; i < size.length; i++) {
            size[i].style.display = "none";
        }
        ctool = "pencil";
        tool.strokeStyle = "white";
    }
    size[0].addEventListener("click", function () {
        let sizep = size[0].value;
        tool.lineWidth = sizep;
    })
})
eraser.addEventListener("click", function () {
    if (ctool == "eraser") {
        size[1].style.display = 'block';
    }
    else {
        for (let i = 0; i < size.length; i++) {
            size[i].style.display = "none";
        }
        ctool = "eraser";
    }
    size[1].addEventListener("click", function () {
        let sizee = size[1].value;
        tool.lineWidth = sizee;
    })
})
squareTool.addEventListener("click", function () {
    if (ctool == "square") {
        size[2].style.display = 'block';
    }
    else {
        for (let i = 0; i < size.length; i++) {
            size[i].style.display = "none";
        }
        ctool = "square";
    }
    size[2].addEventListener("click", function () {
        let sizer = size[2].value;
        tool.lineWidth = sizer;
    })
})
lineTool.addEventListener("click", function () {
    if (ctool == "line") {
        size[3].style.display = 'block';
    }
    else {
        for (let i = 0; i < size.length; i++) {
            size[i].style.display = "none";
        }
        ctool = "line";
    }
    size[3].addEventListener("click", function () {
        let sizel = size[3].value;
        tool.lineWidth = sizel;
    })
})

// Mouse Down
body.addEventListener("mousedown", function (e) { // Getting starting coordinates
    let boardTop = canvas.getBoundingClientRect().top; // gives Canvas Coordinates
    let boardLeft = canvas.getBoundingClientRect().left;
    drawingMode = true;
    iX = e.clientX - boardLeft; // Return X coordinate
    iY = e.clientY - boardTop; // Return Y coordinate
})

// Mouse UP
body.addEventListener("mouseup", function (e) { // Getting Ending coordinates
    let boardTop = canvas.getBoundingClientRect().top;
    let boardLeft = canvas.getBoundingClientRect().left;
    drawingMode = false;
    fX = e.clientX - boardLeft;
    fY = e.clientY - boardTop;

    let width = fX - iX;
    let height = fY - iY;

    if (ctool == "square") {
        tool.strokeRect(iX, iY, width, height); // Creating rectangle
        let sizer = size[2].value;
        tool.lineWidth = sizer;
    }
    if (ctool == "line") {
        // Inbuilt Funtions Required to Build a Line
        tool.beginPath(); // Starts Drawing
        tool.moveTo(iX, iY); // Takes Initial points of Line
        tool.lineTo(fX, fY); // Takes Finals points of Line and Joins it to Initial Points
        tool.stroke();
        let sizel = size[3].value;
        tool.lineWidth = sizel;
    }
})

// MouseMove
body.addEventListener("mousemove", function (e) {
    if ((ctool == "pencil" || ctool == "eraser") && drawingMode == true) {
        if (ctool == "eraser") {
            tool.strokeStyle = "#2e2e2e";
            let sizee = size[1].value;
            tool.lineWidth = sizee;
        }
        if (ctool == "pencil") {
            let sizep = size[0].value;
            tool.lineWidth = sizep;
        }
        let boardTop = canvas.getBoundingClientRect().top; // gives Canvas Coordinates
        let boardLeft = canvas.getBoundingClientRect().left;
        fX = e.clientX - boardLeft;
        fY = e.clientY - boardTop;
        tool.beginPath();
        tool.moveTo(iX, iY);
        tool.lineTo(fX, fY);
        tool.stroke();
        iX = fX;
        iY = fY;
    }
})

// New 
reset.addEventListener("click", function () {
    let resetAlert = confirm("Opening new canvas")
    if (resetAlert) {
        tool.clearRect(0, 0, canvas.width, canvas.height);
    }
})

// Save
download.addEventListener("click", function (e) {
    let lnk = document.createElement('a');
    lnk.download = "MyImage.png";
    lnk.href = canvas.toDataURL("image/png;base64");
    if (document.createEvent) {
        e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window,
            0, 0, 0, 0, 0, false, false, false,
            false, 0, null);

        lnk.dispatchEvent(e);
    } 
    else if (lnk.fireEvent) {
        lnk.fireEvent("onclick");
    }
})

// Color Pallet
let red = document.querySelector(".red");
let green = document.querySelector(".green");
let yellow = document.querySelector(".yellow");
let blue = document.querySelector(".blue");
let black = document.querySelector(".black");
let white = document.querySelector(".white");
let violet = document.querySelector(".violet");
let colorWheel = document.querySelector(".color-wheel")
let colorInput = document.querySelector(".more-colors")

red.addEventListener("click", function () {
    tool.strokeStyle = "red";
})
yellow.addEventListener("click", function () {
    tool.strokeStyle = "yellow";
})
black.addEventListener("click", function () {
    tool.strokeStyle = "black";
})
white.addEventListener("click", function () {
    tool.strokeStyle = "white";
})
violet.addEventListener("click", function () {
    tool.strokeStyle = "#FC49FC";
})
blue.addEventListener("click", function () {
    tool.strokeStyle = "#47C5FF";
})
green.addEventListener("click", function () {
    tool.strokeStyle = "#58FC58";
})
colorWheel.addEventListener("click", function () {
    colorInput.click();
})
colorInput.addEventListener("change", function (e) {
    let color = colorInput.value;
    tool.strokeStyle = color;
})
// notes
notes.addEventListener("click", function (e) {
    let sticky = document.createElement("div");
    sticky.setAttribute("class", "sticky");
    sticky.innerHTML = `<div class="navbar">
            <div class="minimize"></div>
            <div class="close"></div>
        </div>
        <textarea></textarea>`;
    body.appendChild(sticky);
    let minimize = sticky.querySelector(".minimize");
    let close = sticky.querySelector(".close");
    let textArea = sticky.querySelector("textarea");
    let navbar = sticky.querySelector(".navbar");
    let isClose = false;
    minimize.addEventListener("click", function () {
        if (isClose) {
            textArea.style.display = "block";
            sticky.style.boxShadow = "rgb(87, 86, 86) 0px 10px 15px";
            navbar.style.boxShadow = "none";
            isClose = false;
        }
        else {
            textArea.style.display = "none";
            sticky.style.boxShadow = "none";
            navbar.style.boxShadow = "rgb(87, 86, 86) 0px 10px 15px";
            isClose = true;
        }
    })
    close.addEventListener("click", function () {
        sticky.remove();
    })
})
