let scoreArray = [];
		
let hasStarted = false;
let startedAt = null;

let timeoutInterval = null;

let averageScore;

window.addEventListener("mousedown", mouseHandler);
window.addEventListener("keydown", keyHandler);

function mouseHandler(e) {
    if (!hasStarted) {
        start();
    } else {
        stop();
    }
}

function keyHandler(e){
    if (e.which !== 32)return;
    if (!hasStarted) {
        start();
    } else {
        stop();
    }
}

function start(){
    if (timeoutInterval !== null) {
        clearTimeout(timeoutInterval);
        timeoutInterval = null;
    }

    document.getElementById("body").style = "background-color: #2e86de";
    hasStarted = true;
    document.getElementById("main").innerText = "Wait for green...";
    document.getElementById("sub").innerText = "";		
    
    let randomTime = Math.random() * (5000 - 1000) + 1000;
    
    timeoutInterval = setTimeout(() => {
        if (hasStarted){
            document.getElementById("body").style = "background-color: #2ed573; cursor:pointer;"
            document.getElementById("main").innerText = "Click!";
            
            startedAt = Date.now();
        }
    }, randomTime)
}

function stop(){
    let totalScore = 0;
    if (startedAt !== null){
        let reactionTime = Date.now() - startedAt;
        document.getElementById("main").innerText = reactionTime + " ms";
        
        scoreArray.push(reactionTime);
        
        document.getElementById("scoreboard").innerHTML = "";
        scoreArray.sort();
        
        for (let i = 0; i < scoreArray.length; i++){
            const reactionTime = scoreArray[i];
        
            const div = document.createElement("div");
            div.innerText = reactionTime + " ms";
            document.getElementById("scoreboard").appendChild(div);
            totalScore += reactionTime;
            averageScore = totalScore / scoreArray.length;
        }
        
        document.getElementById("body").style = "background-color: #2e86de";
        
        startedAt = null;
        
        document.getElementById("average").innerHTML = averageScore;
        document.getElementById("average").innerHTML = averageScore.toFixed(0);
    } else {
        document.getElementById("main").innerText = "You clicked too fast!";
        document.getElementById("body").style = "background-color: #ff4757";
    }
    
    document.getElementById("sub").innerText = "Click to restart.";
    hasStarted = false;
}