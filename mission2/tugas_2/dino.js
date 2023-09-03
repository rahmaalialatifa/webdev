const dino = document.getElementById("dino")
const cactus = document.getElementById("cactus")
const playerScore = document.getElementById("score")

let score = 0;
let interval = null;

let jumlahScore = () => {
    score++;
    playerScore.innerHTML = `Score : ${score}`
};

function jump() {
    if (dino.classList != "animate") {
        dino.classList.add("animate");
    }
    setTimeout(function(){
        dino.classList.remove("animate")
    }, 500)
    interval = setInterval(jumlahScore, 100)
}

const ifHitCactus = setInterval(function(){
    const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"))
    const cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))

    if(cactusLeft < 90 && cactusLeft > 0 && dinoTop >= 60){
        cactus.style.animation = "none"
        cactus.style.display = "none"
        if(confirm("Game Over")){
            window.location.reload()
        }
    }
})
