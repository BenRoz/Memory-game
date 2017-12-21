var template = document.getElementsByClassName("container")[0].innerHTML;
var container = document.getElementsByClassName("container")[0];

var difficulty = {
    easy : 2,
    medium : 3,
    hard : 4
}

var addRow = function(num){
    for(var i = 0; i < num; i++){
        container.innerHTML = container.innerHTML + template;
        console.log(container.innerHTML);
    }
}
addRow(difficulty.easy);

var pic = ['1.jpg','1.jpg', '2.jpg', '2.jpg' , '3.jpg', '3.jpg','4.jpg', '4.jpg', '5.jpg', '5.jpg','0.jpg', '0.jpg'];
if (difficulty.easy==3){
    pic = ['1.jpg','1.jpg', '2.jpg', '2.jpg' , '3.jpg', '3.jpg','4.jpg', '4.jpg', '5.jpg', '5.jpg','6.jpg', '6.jpg', '7.jpg', '7.jpg', '0.jgp','0.jpg',];
}
else if (difficulty.easy==4){
    pic = ['1.jpg','1.jpg', '2.jpg', '2.jpg' , '3.jpg', '3.jpg','4.jpg', '4.jpg', '5,jpg', '5.jpg','6.jpg', '6.jpg', '7.jpg', '7.jpg', '8.jgp','8.jpg','9.jpg', '9.jpg','0.jpg','0.jpg'];
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


var allCards= document.getElementsByClassName('card');
for (var x=0; x<allCards.length; x++){
    allCards[x].id= "card"+ x;
    console.log("card"+ x);
    allCards[x].addEventListener("click", flipCards);
    allCards[x].style.backgroundImage="url('./images/back6.jpg')";
}

var counter=0;
var firstFlip={};
var locat=0;
 var secondFlip={};
function flipCards(){
    counter+=1
    var cardId = this.id;
    var take = cardId.split("card");
    locat=take[1];
    this.style.backgroundImage= "url('./images/"+pic[locat]+"')" ;
    console.log(pic[locat]);

    if (counter==1){
        firstFlip.url=this.style.backgroundImage;
        firstFlip.locat = locat;
        firstFlip.id = cardId;
    }
    else if (counter==2){
        secondFlip.url= this.style.backgroundImage;
        secondFlip.locat = locat;
        secondFlip.id = cardId;
        setTimeout(function(){
            console.log(firstFlip);
            console.log(secondFlip);
            if (secondFlip.url!=firstFlip.url){
                console.log("printingonly if no match");
                document.getElementById("firstFlip.id").style.backgroundImage = "url('./images/"+pic[firstFlip]+"')" ;
            }
            counter=0;

            console.log(counter);

        }, 1500);
    }
}