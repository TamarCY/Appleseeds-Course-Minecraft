
const startScreenElement = document.querySelector(".start-screen")

const startButton = document.querySelector(".start-button");

const gameBoard = document.querySelector("#game-board");

const toolboxElement = document.querySelector(".tool-box");

const toolsElements = toolboxElement.querySelectorAll("div")

// TODO: how to target nth child element in js
// const secondToolElement = document.querySelector(".tool-box:nth-child(2)");

const inventoryElement = document.querySelector(".inventory");

const inventoryDivsElements = inventoryElement.querySelectorAll("div");

const nextButton = document.querySelector(".next-button");

const gameBoardNew = document.querySelector("#game-bord-new");

const gameBoardMatrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [3, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 3, 3],
    [3, 3, 3, 0, 0, 0, 2, 2, 2, 0, 0, 0, 1, 1, 1, 0, 0, 0, 3, 3],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],


];

//Create the game bord divs from the matrix
gameBoardMatrix.forEach((row, rowIndex) => {
    // Runs on each column
    row.forEach((column, columnIndex) => {
        // Save current position id
        const currentPositionId = gameBoardMatrix[rowIndex][columnIndex];
        // Create a block
        const block = document.createElement("div");
        // Add data-tile type by id
        switch (currentPositionId) {
            case 1:
                block.dataset.tile = "tree";
                break;
            case 2:
                block.dataset.tile = "leaves";
                break;
            case 3:
                block.dataset.tile = "rock";
                break;
            case 4:
                block.dataset.tile = "ground";
                break;
            case 5:
                block.dataset.tile = "grass";
                break;
            case 6:
                block.dataset.tile = "cloud";
                break;
        }
        //Appand each new block div to the gameBord element 
        gameBoard.appendChild(block);
    });
});


//States if the player clicked tool/tile/none
let state;
let toolState = "";
let tileState = "";
let focusElement;

//Store the last 4 selected tiles
const tileStack = [];


const addToStack = (item) => {
    tileStack.unshift(item);
    if (tileStack.length > 4) {
        tileStack.pop();
    }
    for (let i = 0; i < tileStack.length; i++) {
        inventoryDivsElements[i].dataset.tile = tileStack[i];
    }
    return
}

const removeFromStack = () => {
    let result;
    if (tileStack.length > 0) {
        result = tileStack.shift()
    }
    for (let i = 0; i < 4; i++) {
        inventoryDivsElements[i].dataset.tile = tileStack[i];
    }
    return result
}



const gameStart = () => {
    startScreenElement.style.display = "none";
    gameBoard.style.display = "grid";
    nextButton.style.display = "block"
}

//When a tool is clicked
const getTool = (event) => {
    state = "tool";
    toolState = event.target.dataset.tool;
    if (focusElement) {
        focusElement.classList.remove("focus");
    }
    focusElement = event.target;
    focusElement.classList.add("focus");
}




//TODO: think on a batter data type to cheak if the tool fits the tile
// TODO: think if to create a function that remove the tile
const hitTile = (event) => {
    let clickedTile = event.target.dataset.tile;
    switch (clickedTile) {
        case "tree":
            if (toolState === "axe") {
                addToStack(clickedTile);
                event.target.dataset.tile = "";
            }
            break;
        case "leaves":
            if (toolState === "axe") {
                addToStack(clickedTile)
                event.target.dataset.tile = "";
            }
            break;
        case "rock":
            if (toolState === "pickaxe") {
                addToStack(clickedTile)
                event.target.dataset.tile = "";
            }
            break;

        case "ground":
            if (toolState === "shovel") {
                addToStack(clickedTile)
                event.target.dataset.tile = "";
            }
            break;

        case "grass":
            if (toolState === "shovel") {
                addToStack(clickedTile)
                event.target.dataset.tile = "";
            }
            break;

    }
    
}

//When inventory is clicked, change takes the tile from the stack and ready to place it on the game board
const getTile = (event) => {
    if (tileStack.length > 0) {
        state = "tile"
        tileState = tileStack[0];
    }
    if (focusElement) {
        focusElement.classList.remove("focus");
    }
    focusElement = inventoryElement;
    focusElement.classList.add("focus");
}


//Place the tile on the board in the first geme 
const setTile = (event) => {
    if (!event.target.dataset.tile) {
        event.target.dataset.tile = removeFromStack()
    }
}

//Place the tile on the board in the second geme 
const setTile2 = (event) => {
    if (event.target.dataset.tile == "0") {
        event.target.dataset.tile = removeFromStack()
    }
}


const clickOnTheBord = (event) => {
    if (state === "tool") {
        return hitTile(event);
    }
    if (state === "tile") {
        return setTile(event)
    }
}


// TODO: Can i use a var both in js and css file? (like the num of colum and rows both in the css for the grid and in the js for the matrix)?



//The second game

const nextWorld = () => {
    //Remove the first game board 
    gameBoard.style.display = "none";
    //Show the new board
    gameBoardNew.style.display = "grid";
    //Replace the tools elemnts
    toolsElements[0].dataset.tool = "pink";
    toolsElements[1].dataset.tool = "green";
    toolsElements[2].dataset.tool = "blue";
    //Clear the states
    state = "";
    toolState = "";
    tileState = "";
    //Clear the focus element
    focusElement.classList.remove("focus");
    focusElement = "";
    //Remove the "next world" button
    nextButton.style.display = "none";
    //Clear the inventory
    for (let i = 0; i < 4; i++) {
        delete inventoryDivsElements[i].dataset.tile;
        tileStack.pop();
    }    
}


const creatRandomMatrix = () => {
    const arr = [];
    for (let i = 0; i < 10; i++) {
        arr.push(Math.floor(Math.random * 7));
        arr[i] = [];
        for (let j = 0; j < 10; j++) {
            arr[i][j] = Math.floor(Math.random() * 7);

        }
    }
    return arr;
}


const creatNewBord = (dataArr, rootElement) => {
    dataArr.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            let newElement = document.createElement("div");
            newElement.dataset.tile = dataArr[rowIndex][columnIndex];
            rootElement.appendChild(newElement)
        })
    })

}

//Creating the second board

const newMatrix = creatRandomMatrix();

creatNewBord(newMatrix, gameBoardNew);



//Chack if the tool picked match the clicked tile - returns true/false
const canHit = (event) => {
    clickedTile = event.target.dataset.tile;
    let result;
    switch (toolState) {
        case "pink":
            result = (clickedTile == "1" || clickedTile == "2") ? true : false;
            break;
        case "green":
            result = (clickedTile == "3" || clickedTile == "4") ? true : false;
            break;
        case "blue":
            result = (clickedTile == "5" || clickedTile == "6") ? true : false;
            break
        default:
            result = false;
    }
    return result;
}

// TODO: How can i desructur event.target.dataset.tilenum
const clickNewBord = (event) => {
    if (state === "tool") {
        if (canHit(event)) {
            tileState = event.target.dataset.tile;
            addToStack(tileState)
            event.target.dataset.tile = 0;
        }
    } else {
        if (state === "tile") {
            setTile2(event)
        }
    }

}


toolboxElement.addEventListener("click", (e) => (getTool(e)))

gameBoard.addEventListener("click", (e) => (clickOnTheBord(e)))

startButton.addEventListener("click", gameStart)

inventoryElement.addEventListener("click", (e) => (getTile(e)))

nextButton.addEventListener("click", nextWorld)

gameBoardNew.addEventListener("click", (e) => (clickNewBord(e)));











