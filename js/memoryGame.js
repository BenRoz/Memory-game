var oneRow = document.getElementsByClassName("container")[0].innerHTML;
var container = document.getElementsByClassName("container")[0];
var difficulty = {
    easy : 2,
    medium : 3,
    hard : 4
}
var difficultLevel=2;
var pic= ['1.jpg','1.jpg', '2.jpg', '2.jpg' , '3.jpg', '3.jpg','4.jpg', '4.jpg', '5.jpg', '5.jpg','0.jpg', '0.jpg'];

var createRow = function(num){
    container.innerHTML = oneRow;
    for(var i = 0; i < num; i++){
       container.innerHTML = container.innerHTML + oneRow;
    }
}
createRow(difficulty.easy);

var select= document.getElementById("select").value;
function difficultChangeParameters(select){
    if (select=="3"){
        createRow(difficulty.medium);
        difficultLevel=3;
    }
    else if (select=="4"){
        createRow(difficulty.hard);
         difficultLevel=4;
    }
     else if (select=="2"){
        createRow(difficulty.easy);
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
var boolea=[];
var allCards;
var backSideImageColoful ="url('./images/images.jpg')"
var backSideImageGold = "url('./images/image.jpg')"

function firstBackImage(){
 allCards= document.getElementsByClassName('card');
  for (var x=0; x<allCards.length; x++){
        allCards[x].style.backgroundImage= backSideImageColoful;
         boolea[x]="Coloful";
  }
}
firstBackImage();

function assigningIdAndImageAndEvent(){
    for (var x=0; x<allCards.length; x++){
        allCards[x].id= "card"+ x;
        allCards[x].addEventListener("click", flipCards);

    }
}
assigningIdAndImageAndEvent();

var counter=0;
var firstFlip={};
var locat=0;
var secondFlip={};
var correctAnswer=0;
var mistake=0;
var sucessCardDetails=[] ;
function flipCards(){
    counter+=1
    var cardId = this.id;
    var take = cardId.split("card");
    locat=take[1];

    if (counter==1){
        firstFlip.backImage = this.style.backgroundImage;
        this.style.backgroundImage= "url('./images/"+pic[locat]+"')" ;
        firstFlip.url=this.style.backgroundImage;
        firstFlip.locat = locat;
        firstFlip.id = cardId;
    }
    else if (counter==2){
        secondFlip.backImage = this.style.backgroundImage;
        this.style.backgroundImage= "url('./images/"+pic[locat]+"')" ;
        secondFlip.url= this.style.backgroundImage;
        secondFlip.locat = locat;
        secondFlip.id = cardId;

        setTimeout(function(){
            if (secondFlip.url!=firstFlip.url){
                document.getElementById(firstFlip.id).style.backgroundImage =  firstFlip.backImage ;
                document.getElementById(secondFlip.id).style.backgroundImage =  secondFlip.backImage ;
                mistake=mistake+2;
            }
            else if (secondFlip.url==firstFlip.url){
                sucessCardDetails.push(firstFlip.locat);
                sucessCardDetails.push(secondFlip.locat);
                boolea[firstFlip.locat] = "frontSideImg";
                boolea[secondFlip.locat] = "frontSideImg";
                correctAnswer=correctAnswer+2;
            }

            if (correctAnswer==pic.length){
                console.log("correct");
                $('#myModal').modal('show');
                document.getElementById('Modal-text').innerHTML= "you win you had "+mistake+" mistakes";
            }
        counter=0;
        }, 900);
    }
}
document.getElementById("newGame").addEventListener("click",newGame)

function newGame(){
    shuffleArray(pic);
    for (var x=0; x<allCards.length; x++){
        if (boolea[0]=="gold" || boolea[1]=="gold" || boolea[2]=="gold"){
            allCards[x].style.backgroundImage=backSideImageGold ;
            boolea[x] = "gold" ;
        }
        else {
         allCards[x].style.backgroundImage = backSideImageColoful ;
         boolea[x] = "Coloful" ;
        }
    }
    counter=0;
    firstFlip={};
    locat=0;
    secondFlip={};
    correctAnswer=0;
    mistake=0;
    sucessCardDetails=[] ;

}
document.getElementById("select").addEventListener("click", changingGameLevel);

function changingGameLevel(){
    select= document.getElementById("select").value;
    difficultChangeParameters(select);
    shuffleArray(pic);
    assigningIdAndImageAndEvent();
    newGame();
}

document.getElementById("save").addEventListener("click", saveGame);
var saveData={};
function saveGame(){
    saveData={};
    saveData.boardSize=select;
    saveData.picArray=pic;
    saveData.correct= correctAnswer;
    saveData.mistake= mistake;
    saveData.correctCardsDetails= sucessCardDetails;
    localStorage.setItem('Game', JSON.stringify(saveData));
    alert("Game Saved");
};

document.getElementById("load").addEventListener("click", loadGame);
function loadGame(){
    var loadedGame = localStorage.getItem('Game');
    var loadData = JSON.parse(loadedGame);
    difficultChangeParameters(loadData.boardSize);
    newGame();
    assigningIdAndImageAndEvent();
    pic= loadData.picArray;
    correctAnswer = loadData.correct;
    mistake = loadData.mistake;
    document.getElementById('select').value = loadData.boardSize;
    for (var i=0;i<loadData.correctCardsDetails.length; i++){
        document.getElementById("card"+loadData.correctCardsDetails[i]+"").style.backgroundImage= "url('./images/"+pic[loadData.correctCardsDetails[i]]+"')" ;
        boolea[loadData.correctCardsDetails[i]] = "frontSideImg";
    }
};

document.getElementById("backChange").addEventListener("click", changeImage);
function changeImage(){
    for (var x=0; x<allCards.length; x++){
        if (  boolea[x]== "Coloful"){
             allCards[x].style.backgroundImage = backSideImageGold;
             boolea[x]="gold";
        }
        else if (boolea[x]=="gold"){
              allCards[x].style.backgroundImage = backSideImageColoful;
               boolea[x]="Coloful"
        }
    }
};