// Game logic
const Gameboard = (function(){
    const Gameboard = {
        gameboard :[
            ["","",""],
            ["","",""],
            ["","",""]
        ]
    }

    function play(playerSymbol, playerPosPlay){
        let [pos1 , pos2] = playerPosPlay.split("")
        pos1 = Number(pos1)
        pos2 = Number(pos2)
        Gameboard.gameboard[pos1][pos2] = playerSymbol
    }
    
    function isFull(){
        for(arr of Gameboard.gameboard){
            for(element of arr){
                if (element === ""){
                    return false
                }
            }
        }
        return true
    }

    function check(){
        //first check
        for (let prop of Object.values(Gameboard)){
            if (Array.isArray(prop)){
                for (let row of Object.values(prop)){
                    if (row.every(cell => cell === row[0] && cell !== "")) {
                        return true;
                    }
                }
                }
            
        }
        //second check
        for (let i = 0; i<=2; i++){
            if (Gameboard.gameboard[0][i] && Gameboard.gameboard[0][i] === Gameboard.gameboard[1][i] && Gameboard.gameboard[0][i] === Gameboard.gameboard[2][i] ){
                return true
            }
        }
        //third check
        if (Gameboard.gameboard[0][0] && Gameboard.gameboard[0][0] === Gameboard.gameboard[1][1] && Gameboard.gameboard[0][0] === Gameboard.gameboard[2][2] ||
            Gameboard.gameboard[0][2] && Gameboard.gameboard[0][2] === Gameboard.gameboard[1][1] && Gameboard.gameboard[0][2] === Gameboard.gameboard[2][0]){
            return true
        }
        return false
        }
    function cleanGameBoard(){
        Gameboard.gameboard.forEach(array =>{
            array.forEach((element, index) =>{
                array[index] = ""
            })
        })
    }
    return {play, check, cleanGameBoard, Gameboard,isFull}
})()


function players(){
    let player1 = {
        name : "mark",
        symb : "x",
        score: 0
    }
    let player2 = {
        name : "henry",
        symb : "o",
        score : 0
    }
    let ai = {
        name : "ai",
        symb : "o",
        score : 0
    }
    return {player1,player2,ai}
}


// function create grid elements
function createGrid(){
    let divId = ["00", "01", "02", "10", "11", "12", "20", "21", "22"]
    const gameBoard = document.querySelector(".gameBoard")
    for(let i = 0; i < 9 ; i++){
        const gameDiv = document.createElement("div")
        gameDiv.setAttribute("id", divId[i])
        gameDiv.classList.add("grid-item")
        //events for the divs
        gameBoard.appendChild(gameDiv)
    }
}

function deleteGrid(){
    const gameBoard = document.querySelector(".gameBoard")
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
    Gameboard.cleanGameBoard()
}


function clearBoard(){
    deleteGrid()
    const playerDet = document.querySelectorAll(".playerDet")
    const detImg = document.querySelectorAll("#detImg")
    playerDet.forEach((playerDet, index) => {
        playerDet.removeChild(detImg[index])
    })

    const playerSpan1 = document.querySelector(".playerSpan1")
    const playerSpan2 = document.querySelector(".playerSpan2")

    playerSpan1.textContent = '----------';
    playerSpan2.textContent = '----------';

    const firstScore = document.querySelector(".firstScore")
    firstScore.textContent = 0

    const secondScore = document.querySelector(".secondScore")
    secondScore.textContent = 0

    playOn = false
}

let player1Score = 0
let player2Score = 0

function checkForWin(boolean,player){
    if (Gameboard.isFull()){
        deleteGrid()
        playGame()
    }else{
        if (player === "player1"){
            if (boolean === true){
                player1Score = player1Score + 1
                // display on board
                const firstScore = document.querySelector(".firstScore")
                firstScore.textContent = player1Score
                console.log(player1Score)
                if(player1Score === 3){
                    clearBoard()
                    player1Score = 0
                    player2Score = 0
                    console.log("ya1 u win")
                }else{
                    deleteGrid()
                    console.log("let continue 1")
                    playGame()
                }
                
            }
        }else if(player === "player2"){
            if (boolean === true){
                player2Score = player2Score + 1
                // display on board
                const secondScore = document.querySelector(".secondScore")
                secondScore.textContent = player2Score
                console.log(player2Score)
                if(player2Score === 3){
                    clearBoard()
                    player1Score = 0
                    player2Score = 0
                    console.log("ya2 u win")
                }else{
                    deleteGrid()
                    console.log("lets continue 2")
                    playGame()
                }
                
            }
        }
    }
    
}
function playGame(){
    createGrid()
    // if which player is = true, the div when clicked will have access to player1 symb i.e X
    // else when false the div will have access to player2 symb i.e o 
    let whichPlayer = true
    const divsArr = document.querySelectorAll(".grid-item")
    for (let i of divsArr){
        i.addEventListener("click",()=>{
            if (whichPlayer === true){
                const playerSymb = players().player1.symb
                const playerPosition = i.getAttribute("id")
                i.textContent = playerSymb
                Gameboard.play(playerSymb,playerPosition)
                checkForWin(Gameboard.check(),"player1")
                whichPlayer = false
            }else{
                const playerSymb = players().player2.symb
                const playerPosition = i.getAttribute("id")
                i.textContent = playerSymb
                Gameboard.play(playerSymb,playerPosition)
                checkForWin(Gameboard.check(),"player2")
                whichPlayer = true
            }
        },{once:true})
    }
}
let playOn = false
const workingOnDom = (function(){
    // access dom
    const p_v_pBtn = document.querySelector(".p_start");
    const p_v_aiBtn = document.querySelector(".ai_start")
    const dialog1 = document.querySelector("#dialog1")
    const submitForm1 = document.querySelector("#submitForm")


    // events for pvp
    p_v_pBtn.addEventListener("click", () =>{
        if (playOn === false){
            dialog1.showModal()
        }
        
    })

    submitForm1.addEventListener("click", (event)=>{
        playOn = true
        event.preventDefault();
        dialog1.close()
        const playerDet1 = document.querySelector(".playerDet1")
        const playerDet2 = document.querySelector(".playerDet2")
        const playerSpan1 = document.querySelector(".playerSpan1")
        const playerSpan2 = document.querySelector(".playerSpan2")

        playerSpan1.textContent = '';
        playerSpan2.textContent = '';
        // player 1 image
        const player1Img = document.createElement('img')
        player1Img.src = "player1.jpeg"
        player1Img.alt = "player 1 image"
        player1Img.setAttribute("id","detImg")
        playerDet1.appendChild(player1Img)
        // player 2 image
        const player2Img = document.createElement('img')
        player2Img.src = "player2.jpeg"
        player2Img.alt = "player 2 image"
        player2Img.setAttribute("id","detImg")
        playerDet2.appendChild(player2Img)
        // read players name
        const playerName1 = document.querySelector("#player1Name").value;
        const playerName2 = document.querySelector("#player2Name").value;
        players().player1.name = document.querySelector("#player1Name").value;
        players().player2.name = document.querySelector("#player2Name").value;
        //player name display
        playerSpan1.textContent = playerName1
        playerSpan2.textContent = playerName2

        playGame()
    })

    // events for ai

})()

