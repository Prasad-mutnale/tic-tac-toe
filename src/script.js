let btnRef = document.querySelectorAll(".button-option");
let popupref = document.querySelector(".popup");
let newgamebtn = document.getElementById("new-game");
let restartbtn = document.getElementById("restart");
let msgref = document.getElementById("message");

//Winning pattern Array
let winningPattern = [[0,1,2],[0,3,6],[2,5,8],[6,7,8],[3,4,5],[1,4,7],[0,4,8],[2,4,6],];

let xTurn = true;
let count = 0;

// Disable All Buttons
const disableButtons=()=>{
    btnRef.forEach((element)=> (element.disabled=true));
    // Enable popup
    popupref.classList.remove("hide");
}
// Enable all buttons (for New Game and restart)
const enableButtons=()=>{
    btnRef.forEach((element)=>{
        element.innerText="";
        element.disabled = false;
    });
    // Disable popup
    popupref.classList.add("hide");

}

// This function is executed when a player wins 
const winFunction = (letter)=>
{
    disableButtons();
    if(letter == "X")
    {
        msgref.innerHTML = "&#x1F389;<br> 'X' Wins ";
    }
    else{
        msgref.innerHTML = "&#x1F389;<br> 'O' Wins";

    }
}

// Function for draw
const drawFunction = ()=>{
    disableButtons();
    msgref.innerHTML = "&#x1F60E;<br> It's Draw";
}
// New Game
newgamebtn.addEventListener("click",()=>{
    count=0;
    enableButtons();


});
restartbtn.addEventListener("click",()=>{
    count=0;
    enableButtons();
})


//Win logic 
const winChecker= () =>{
    // Loop through all win patterns
    for(let i of winningPattern){
        let[element1, element2, element3]=[
        btnRef[i[0]].innerText,
        btnRef[i[1]].innerText,
        btnRef[i[2]].innerText,
        ];
        // Check if elements are filled 
        // If 3 empty elements are same  and would give  win as would
        if(element1!="" && (element2 !="") & (element3 !="")){
            if(element1 == element2 && element2 == element3){
                // If all 3 buttons have same values then pass the value to winFunction
                winFunction(element1);
            }
        }
    }
}

// Display X/O on click 
btnRef.forEach((element)=>{
    element.addEventListener("click",()=>{
        if(xTurn){
            xTurn=false;
            // Display X
            element.innerText = "X";
            element.disabled = true;

        }
        else{
            xTurn = true;
            // Display Y
            element.innerText = "O"
            element.disabled = true;
        }
        // Increment count on each click
        count += 1;
        if(count===9)
        {
            // It's a draw since there are total of 9 boxed
            drawFunction();
        }
        // Check for win on every click
        winChecker();
    })
})