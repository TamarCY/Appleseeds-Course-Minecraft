
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

const TILES = ["tree", "leaves", "rock", "ground", "grass", "cloud"];

const GRID_SIZE = 10;

const TILE_TYPE_COUNT = 6;

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

// Create the game board divs from the matrix
gameBoardMatrix.forEach((row, rowIndex) => {
    // Runs on each column
    row.forEach((column, columnIndex) => {
        // Save current position id
        const tileType = gameBoardMatrix[rowIndex][columnIndex];
        // Create a block
        const block = document.createElement("div");
        // Add data-tile type by id
        if (tileType !== 0) {
            block.dataset.tile = TILES[tileType - 1];
        }
        // Append each new block div to the gameBoard element 
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

// When a tool is clicked
const getTool = (event) => {
    state = "tool";
    toolState = event.target.dataset.tool;
    if (focusElement) {
        focusElement.classList.remove("focus");
    }
    focusElement = event.target;
    focusElement.classList.add("focus");
}




//TODO: think on a better data type to check if the tool fits the tile
// TODO: think if to create a function that remove the tile
const hitTile = (event) => {
    let tileType = event.target.dataset.tile;
    const tileTypeToTool = {
        tree: "axe",
        leaves: "axe",
        rock: "pickaxe",
        ground: "shovel",
        grass: "shovel"
    }
    const tool = tileTypeToTool[tileType];
    if (toolState === tool) {
        addToStack(tileType);
        event.target.dataset.tile = "";
    }
}

// When inventory is clicked, change takes the tile from the stack and ready to place it on the game board
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


// Place the tile on the board in the first geme 
const setTile = (event) => {
    if (!event.target.dataset.tile) {
        event.target.dataset.tile = removeFromStack();
    }
}

// Place the tile on the board in the second geme 
const setTile2 = (event) => {
    if (event.target.dataset.tile == "0") {
        event.target.dataset.tile = removeFromStack()
    }
}


const clickOnTheBoard = (event) => {
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


const createRandomMatrix = () => {
    const result = [];
    for (let i = 0; i < GRID_SIZE; i++) {
        result[i] = [];
        for (let j = 0; j < GRID_SIZE; j++) {
            result[i][j] = Math.floor(Math.random() * (TILE_TYPE_COUNT + 1));
        }
    }
    return result;
}


const creatNewBoard = (data, parent) => {
    data.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            let newElement = document.createElement("div");
            newElement.dataset.tile = data[rowIndex][columnIndex];
            parent.appendChild(newElement)
        })
    })
}

// Creating the second board

const newMatrix = createRandomMatrix();

creatNewBoard(newMatrix, gameBoardNew);



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

gameBoard.addEventListener("click", (e) => (clickOnTheBoard(e)))

startButton.addEventListener("click", gameStart)

inventoryElement.addEventListener("click", (e) => (getTile(e)))

nextButton.addEventListener("click", nextWorld)

gameBoardNew.addEventListener("click", (e) => (clickNewBord(e)));











