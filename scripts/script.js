
const startScreenElement = document.querySelector(".start-screen")

const gameBoard = document.querySelector("#game-board");

const toolboxElement = document.querySelector(".tool-box");
const toolsElements = toolboxElement.querySelectorAll("div")

// TODO: how to target nth child element in js
// const secondToolElement = document.querySelector(".tool-box:nth-child(2)");

// const firstToolElement = document.querySelector(".axe")
// const secondToolElement = document.querySelector(".pickaxe")
// const thirdToolElement = document.querySelector(".shovel")


const startButton = document.querySelector(".start-button");

const inventoryElement = document.querySelector(".inventory");

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
    nextButton.style.display = "block"
}

const getTool = (event) => {
    state = "tool";
    toolState = event.target.dataset.tool;
    console.log(toolState);
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

// TODO: change if its posible to change data set tilenum to tile and to use just the original func 
const getTile = (event) => {
    console.log("click");
    if (inventoryElement.dataset.tile) {
        state = "tile"
        tileState = inventoryElement.dataset.tile;
        console.log(state, tileState);
    } else {
        if (inventoryElement.dataset.tilenum) {
            state = "tile"
            tileState = inventoryElement.dataset.tilenum;
            console.log(state, tileState);
        }
    }   

}

const setTile = (event) => {
    if (!event.target.dataset.tile){
        event.target.dataset.tile = tileState;
        tileState = "";
        delete inventoryElement.dataset.tile;
    }
}

const nextWorld = (event) => {
    gameBoard.style.display = "none";
    gameBoardNew.style.display = "grid";
    toolsElements[0].dataset.tool = "pink";
    toolsElements[1].dataset.tool = "green";
    toolsElements[2].dataset.tool = "blue";
    state = "";
    toolState = "";
    tileState = "";
}

toolboxElement.addEventListener("click", (e)=>(getTool(e)))

gameBoard.addEventListener("click", (e)=>(clickOnTheBord(e)))

startButton.addEventListener("click", gameStart)

inventoryElement.addEventListener("click", (e)=>(getTile(e)))


nextButton.addEventListener("click", (e)=> (nextWorld(e)))



// TODO: can i use a var both in js and css file? (like the num of colum and rows)


const creatRandomMatrix = () => {
    const arr = [];
    for (let i = 0; i < 10; i++) {
        arr.push (Math.floor(Math.random * 7));
        arr[i] = [];
        for (let j = 0; j < 10; j++) {
            arr[i][j] = Math.floor(Math.random() * 7);
            
        }
    }
    return arr;
}

const newMatrix = creatRandomMatrix();

const creatNewBord = (dataArr, rootElement) => {
    console.log("test");
    dataArr.forEach ((row, rowIndex)=>{
        row.forEach((column, columnIndex) => {
            let newElement = document.createElement("div");
            newElement.dataset.tilenum = dataArr[rowIndex][columnIndex];
            rootElement.appendChild(newElement)
        })
    })
    
}

//chack if the tool that was picked and stored in toolState mach the tile that was click on the bord - returns true/false
const canHit = () => {
    let result;
    switch (toolState) {
        case "pink":  
           result =  (tileState == "1" || tileState =="2")? true : false;
           break;
        case "green":
            result =  (tileState == "3" || tileState =="4")? true : false;
            break;
        case "blue":
            result =  (tileState == "5" || tileState =="6")? true : false;
            break
        default:
            result = false;
    }
    console.log(result);
    return result;
    
}

// TODO: how can i desructur event.target.dataset.tilenum
const clickNewBord = (event) => {
    tileState = event.target.dataset.tilenum;
    if (canHit()) {
        inventoryElement.dataset.tilenum = tileState;
        console.log(inventoryElement.dataset.tilenum);
        delete event.target.dataset.tilenum;
    }
}

creatNewBord (newMatrix, gameBoardNew);

gameBoardNew.addEventListener("click", (e) => (clickNewBord(e)));


