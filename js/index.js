
//game constant and variable
let inputDir ={x: 0,y: 0};
let board = document.getElementById("board");
let foodSound = new Audio('/food.mp3');
let gameOverSound = new Audio('/gameover.mp3');
let moveSound = new Audio('/move.mp3');
let musicSound = new Audio('/music.mp3');
let speed = 8;
let score = 0;
let lastPaintTime = 0;
let isPaused = false;
let snakeArr = [
    {x: 13,y : 15}
];
food = {x: 6, y: 7};


//game function
function main(ctime){
    window.requestAnimationFrame(main);

    if (isPaused){
    board.innerHTML += "<h1 class='pauseText'>PAUSED</h1>";
    return;
}

     if (isPaused) return;
     //console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine(); 
}

function isCollide(snake){
    //if bump into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
     //snake bump into wall
     if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true
     }
     
 
}

function gameEngine(){
    // part 1: update the snake variable or snake  array
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("GAME OVER . Press any key to restart ");
    // after entering any key
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;    
    }
// if sake has eaten the food , incremeant the score  and regenrate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score>hiscore){
        hiscoreval = score;
        localStorage.setItem("hiscore" , JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore:" +  hiscoreval;


        }
        scoreBox.innerHTML = "Score :" + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food ={x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }
// moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--){
       // const element = array[i];
        snakeArr[i+1] = {...snakeArr[i]};
    }   

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;





    // part 2: display the snake and food
    //display the snake
    board.innerHTML="";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');

        }
        
        board.appendChild(snakeElement);
    });
    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}




//main logic
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore" , JSON.stringify(hiscoreval))

}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore:" + hiscore;
}
window.requestAnimationFrame(main);
document.addEventListener('keydown', e =>{
   // inputDir = {x: 0, y: 1}// start the game
    moveSound.play();

        // pause / resume
    if (e.code === "Space") {
        isPaused = !isPaused;
        return;
    }


    switch (e.key) {
        
        case "ArrowUp":
            if (inputDir.y !== 1) {
                inputDir = { x: 0, y: -1 };
            }
            break;

        case "ArrowDown":
            if (inputDir.y !== -1) {
                inputDir = { x: 0, y: 1 };
            }
            break;

        case "ArrowLeft":
            if (inputDir.x !== 1) {
                inputDir = { x: -1, y: 0 };
            }
            break;

        case "ArrowRight":
            if (inputDir.x !== -1) {
                inputDir = { x: 1, y: 0 };
            }
            break;
        default:
            break;


            
    }
});

