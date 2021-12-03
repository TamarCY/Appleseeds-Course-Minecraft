
const startScreenElement = document.querySelector(".start-screen")

const gameBoard = document.querySelector("#game-board");

const toolboxElemnt = document.querySelector(".tool-box");

const startButton = document.querySelector(".start-button");

const inventoryElement = document.querySelector(".inventory")

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
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4] ,
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],


];

// TODO: delete the object or change to tile name
const materialObj = {
    tree: { className: "tree", id: 1 },
    leaves: { className: "leaves", id: 2 },
    rock: { className: "rock", id: 3 },
    ground: { className: "ground", id: 4 },
    grass: { className: "grass", id: 5 },
    cloud: { className: "cloud", id: 6 },
};

// runs on each row
gameBoardMatrix.forEach((row, yIndex) => {
    // runs on each column
    row.forEach((column, xIndex) => {
        // save current position id
        const currentPositionId = gameBoardMatrix[yIndex][xIndex];
        // create a block
        const block = document.createElement("div");
        // add style by id
        switch (currentPositionId) {
            case 1:
                block.dataset.tile = materialObj.tree.className;
                
                break;
            case 2:
                block.dataset.tile = materialObj.leaves.className;
                
                break;
            case 3:
                block.dataset.tile = materialObj.rock.className;
                
                break;
            case 4:
                block.dataset.tile = materialObj.ground.className;
                
                break;
            case 5:
                block.dataset.tile = materialObj.grass.className;
                
                break;
            case 6:
                block.dataset.tile = materialObj.cloud.className;
                
                break;
        }
        gameBoard.appendChild(block);
    });
});


//states if the player picked a tool a tile or none
let state;

let toolState = "";
let tileState = "";




const gameStart = () => {
    startScreenElement.style.display = "none";
    gameBoard.style.display = "grid";
}

const getTool = (event) => {
    state = "tool"
    toolState = event.target.dataset.tool;
}


const clickOnTheBord = (event) => {
    if (state === "tool") {
        return hitTile (event);
    }
    if (state === "tile") {
        return setTile(event)
    }

}

//TODO: think on a batter data type to cheak if the tool fits the tile
// TODO: think if to create a function that remove the tile
const hitTile = (event) => {
    let clickedTile = event.target.dataset.tile;
    switch (clickedTile) {
        case "tree":
            if (toolState === "axe") {
                inventoryElement.dataset.tile = clickedTile
                event.target.dataset.tile = "";
            }
        break;
        case "leaves":
            if (toolState === "axe") {
                inventoryElement.dataset.tile = clickedTile
                event.target.dataset.tile = "";
            }
        break;
        case "rock": 
         if (toolState === "pickaxe") {
            inventoryElement.dataset.tile = clickedTile
                event.target.dataset.tile = "";
         }
        case "ground":
            if (toolState === "shovel") {
                inventoryElement.dataset.tile = clickedTile
                event.target.dataset.tile = "";
            }
        case "grass":
            if (toolState === "shovel") {
                inventoryElement.dataset.tile = clickedTile
                event.target.dataset.tile = "";
            }
    }
}


const getTile = (event) => {
    if (inventoryElement.dataset.tile) {
        state = "tile"
        tileState = inventoryElement.dataset.tile;
    }   
}

const setTile = (event) => {
    if (!event.target.dataset.tile){
        event.target.dataset.tile = tileState;
        tileState = "";
        delete inventoryElement.dataset.tile;
    }
}



toolboxElemnt.addEventListener("click", (e)=>(getTool(e)))

gameBoard.addEventListener("click", (e)=>(clickOnTheBord(e)))

startScreenElement.addEventListener("click", gameStart)

inventoryElement.addEventListener("click", (e)=>(getTile(e)))


