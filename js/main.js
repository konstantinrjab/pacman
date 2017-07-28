//sounds
var audio_beginning = new Audio();
audio_beginning.src = 'sounds/pacman_beginning.wav';

var audio_eat = new Audio();
audio_eat.src = 'sounds/pacman_eatfruit.wav';

//intro sound
audio_beginning.autoplay = true;

function feed() {
    counter++;
    console.log("click ", counter);
    var food = document.createElement("div");

    if (counter%10 !== random) {
        food.className = "food food__cake";
    } else {
        food.className = "food food__ghost";
    }
    //new random for next 10 cakes
    if (counter%10 == 0){
        getRandom(1, 9);
    }

    var id_food = counter;
    food.setAttribute("id", id_food);
    food__container.appendChild(food);
    setTimeout(eat_food, 1000, id_food);
};

function eat_food(id_food) {
    document.getElementById(id_food).parentNode.removeChild(document.getElementById(id_food));
    audio_eat.currentTime = 0;
    audio_eat.play();
    console.log("omnomnom");

    //create notice
    var notice = document.createElement("div");
    notice.className = "notice__num";
    notice.setAttribute("id", id_food);
    notice__container.appendChild(notice);

    //ghost check
    if (id_food%10 !== random) {
        notice.innerHTML = id_food + " cakes are eaten";
    } else {
        var cry = document.createElement("div");
        cry.className = "cry";
        cry.setAttribute("id", "cry");
        cry.innerHTML = "It's a ghost!";
        cry__container.appendChild(cry);
        setTimeout(delete_notice, 3000, "cry");
    }


    setTimeout(delete_notice, 1000, id_food);   //call number of foods eaten
    if (id_food%10 == random){
        eye_display(1);                          //call eye
    } else {
        eye_display(0);
    }

    //determine the direction
    if (marginLeft > 60) {
        move_right = 0;
    } else if (marginLeft < 15){
        move_right = 1;
    }

    //move pacman
    if (move_right){
        marginLeft = marginLeft+10;
    } else {
        marginLeft = marginLeft-10;
    }
    console.log(marginLeft);
    document.getElementById("pacman__container").style.marginLeft = marginLeft+"vw";

};

function delete_notice(id_food){
    document.getElementById(id_food).parentNode.removeChild(document.getElementById(id_food));
}

function eye_display(bool) {
    if (bool) {
        document.getElementsByClassName("eye")[0].style.display = 'block';
    } else {
        document.getElementsByClassName("eye")[0].style.display = 'none';
    }
}

function getRandom(min, max) {
    random = Math.round(Math.random() * (max - min) + min);
    console.log("new random = " + random);
    return random
}

var counter = 0;
var random = getRandom(3, 10);
var marginLeft = 0;
var move_right = 1;
console.log("random = " + random);
console.log("loading is complete");