let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset");
let newbtn=document.querySelector("#newbtn");
let msgcontainer=document.querySelector(".msgcontainer");
let msg=document.querySelector("#msg");
let turnO=true;//playerX,playerO
const winpatterns=[
    [ 0,1,2],
    [ 3,4,5],
    [ 6,7,8],
    [ 0,3,6],
    [ 1,4,7],
    [ 2,5,8],
    [ 0,4,8],
    [ 2,4,6]
];
const resetGame=()=>{
    turnO=true;
    enableBoxes();
    msgcontainer.classList.add("hide");
};
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const show_winner=(winner)=>{
    msg.innerText=`Congratulations! Player ${winner} wins!`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
}
const show_draw = () => {
    msg.innerText = `It's a Draw! 🤝`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
}

const checkwinner = () => {
    let isWinner = false;
    for (let pattern of winpatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                console.log("Winner:", pos1);
                show_winner(pos1);
                isWinner = true;
                break;
            }
        }
    }

    // Check for Draw
    let filledBoxes = 0;
    for (let box of boxes) {
        if (box.innerText !== "") {
            filledBoxes++;
        }
    }
    
    if (!isWinner && filledBoxes === 9) {
        console.log("Game is a Draw");
        show_draw();
    }
};


boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if (turnO) {
            box.innerText="O";
            turnO=false;
        }
        else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        checkwinner();
    });
});

newbtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);