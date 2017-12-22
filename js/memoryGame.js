var oneRow = document.getElementsByClassName("container")[0].innerHTML;
var container = document.getElementsByClassName("container")[0];

var difficulty = {
    easy : 2,
    medium : 3,
    hard : 4
}
var difficultLevel=2;
var pic= ['1.jpg','1.jpg', '2.jpg', '2.jpg' , '3.jpg', '3.jpg','4.jpg', '4.jpg', '5.jpg', '5.jpg','0.jpg', '0.jpg'];


var addRow = function(num){
    container.innerHTML = oneRow;
    for(var i = 0; i < num; i++){
       container.innerHTML = container.innerHTML + oneRow;
    }
}
addRow(difficulty.easy);


function difficultChangeParameterss(){
var select= document.getElementById("select").value;
    if (select=="3"){
        addRow(difficulty.medium);
        difficultLevel=3;
    }
    else if (select=="4"){
        addRow(difficulty.hard);
         difficultLevel=4;
    }
     else if (select=="2"){
        addRow(difficulty.easy);
        difficultLevel=2;
    }

    if(difficultLevel==2){
       pic = ['1.jpg','1.jpg', '2.jpg', '2.jpg' , '3.jpg', '3.jpg','4.jpg', '4.jpg', '5.jpg', '5.jpg','0.jpg', '0.jpg'];
    }
    else if (difficultLevel==3){
        pic = ['1.jpg','1.jpg', '2.jpg', '2.jpg' , '3.jpg', '3.jpg','4.jpg', '4.jpg', '5.jpg', '5.jpg','6.jpg', '6.jpg', '7.jpg', '7.jpg', '0.jpg','0.jpg',];
    }
    else if (difficultLevel==4){
        pic = ['1.jpg','1.jpg', '2.jpg', '2.jpg' , '3.jpg', '3.jpg','4.jpg', '4.jpg', '5.jpg', '5.jpg','6.jpg', '6.jpg', '7.jpg', '7.jpg', '8.jpg','8.jpg','9.jpg', '9.jpg','0.jpg','0.jpg'];
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
shuffleArray(pic);

var allCards;
function assigningIdAndImageAndEvent(){
    allCards= document.getElementsByClassName('card');
    for (var x=0; x<allCards.length; x++){
        allCards[x].id= "card"+ x;
        allCards[x].addEventListener("click", flipCards);
        allCards[x].style.backgroundImage="url('./images/back6.jpg')";
    }
}
assigningIdAndImageAndEvent();

var counter=0;
var firstFlip={};
var locat=0;
var secondFlip={};
var correctAnswer=0;
var mistake=0;
var sucessCardDetails=[]
function flipCards(){
    counter+=1
    var cardId = this.id;
    var take = cardId.split("card");
    locat=take[1];

    if (counter==1){
        this.style.backgroundImage= "url('./images/"+pic[locat]+"')" ;
        firstFlip.url=this.style.backgroundImage;
        firstFlip.locat = locat;
        firstFlip.id = cardId;
    }
    else if (counter==2){
        this.style.backgroundImage= "url('./images/"+pic[locat]+"')" ;
        secondFlip.url= this.style.backgroundImage;
        secondFlip.locat = locat;
        secondFlip.id = cardId;

        setTimeout(function(){
            if (secondFlip.url!=firstFlip.url){
                document.getElementById(firstFlip.id).style.backgroundImage = "url('./images/back6.jpg')";
                document.getElementById(secondFlip.id).style.backgroundImage = "url('./images/back6.jpg')";
                mistake=mistake+2;
            }
            else if (secondFlip.url==firstFlip.url){
                 sucessCardDetails.push(firstFlip.locat);
                 sucessCardDetails.push(secondFlip.locat);
                correctAnswer=correctAnswer+2;
            }

            if (correctAnswer==pic.length){
                console.log("correct");
                alert("you win you had "+mistake+" mistakes ");
            }
        counter=0;
        }, 900);
    }
}
document.getElementById("newGame").addEventListener("click",newGame)
function newGame(){
    counter=0;
    firstFlip={};
    locat=0;
    secondFlip={};
    correctAnswer=0;
    mistake=0;
    for (var x=0; x<allCards.length; x++){
         allCards[x].style.backgroundImage="url('./images/back6.jpg')";

    }
}
document.getElementById("select").addEventListener("click", changingGameLevel);
function changingGameLevel(){
    difficultChangeParameterss();
    shuffleArray(pic);
    assigningIdAndImageAndEvent();
    newGame();
}

document.getElementById("save").addEventListener("click", saveGame);
var saveData={};
function saveGame(){

    saveData.picArray=pic;
    saveData.correct= correctAnswer;
    saveData.mistake= mistake;
    saveData.correctCardsDetails= sucessCardDetails;
    localStorage.setItem('Game', JSON.stringify(saveData));
    alert("Game Saved");
};

document.getElementById("load").addEventListener("click", loadGame);
function loadGame(){
    pic=saveData.picArray;
    correctAnswer = saveData.correct;
    mistake =saveData.mistake;
    for (var i=0;i<saveData.correctCardsDetails.length; i++){
        document.getElementById("card"+saveData.correctCardsDetails[i]+"").style.backgroundImage= "url('./images/"+pic[saveData.correctCardsDetails[i]]+"')" ;
    }


};