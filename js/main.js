//sounds
var audio_beginning = new Audio();
audio_beginning.src = 'sounds/pacman_beginning.wav';

var audio_eat = new Audio();
audio_eat.src = 'sounds/pacman_eatfruit.wav';

//intro sound
audio_beginning.autoplay = true;

function feed() {
    counter++;
    var food = document.createElement('div');

    if (counter % 10 !== random) {
        food.className = 'food food__cake';
    } else {
        food.className = 'food food__ghost';
        ghosts_count++;
    }
    //new random for next 10 cakes
    if (counter % 10 === 0) {
        getRandom(1, 9);
    }

    food.setAttribute('id', 'food_' + counter.toString());
    document.getElementById('food__container').appendChild(food);
    setTimeout(eat_food, 1000, counter, ghosts_count);
}

function eat_food(id_food) {
    document.getElementById('food_' + id_food).parentNode.removeChild(document.getElementById('food_' + id_food));
    audio_eat.currentTime = 0;
    audio_eat.play();
    console.log('omnomnom');

    //create notice
    var notice = document.createElement('div');
    notice.className = 'notice__num';
    notice.setAttribute('id', 'notice_' + id_food);
    document.getElementById('notice__container').appendChild(notice);

    //ghost check
    if (id_food % 10 !== random) {
        notice.innerHTML = (id_food - ghosts_count) + " cakes were eaten";
    } else {
        var cry = document.createElement("div");
        cry.className = 'cry';
        cry.setAttribute('id', 'cry_' + id_food);
        cry.innerHTML = 'It\'s a ghost!';
        document.getElementById('cry__container').appendChild(cry);
        setTimeout(delete_notice, 3000, 'cry_' + id_food);
    }

    setTimeout(delete_notice, 1000, 'notice_' + id_food);
    //display eye
    if (id_food % 10 === random) {
        eye_display(1);
    } else {
        eye_display(0);
    }

    //determine the direction
    if (marginLeft > 60) {
        move_right = 0;
    } else if (marginLeft < 10) {
        move_right = 1;
    }

    //move pacman
    if (move_right) {
        marginLeft = marginLeft + 8;
    } else {
        marginLeft = marginLeft - 8;
    }
    document.getElementById('pacman__container').style.marginLeft = marginLeft + "vw";
}

function delete_notice(id) {
    console.log(id);
    document.getElementById(id).parentNode.removeChild(document.getElementById(id));
}

function eye_display(bool) {
    if (bool) {
        document.getElementsByClassName('eye')[0].style.display = 'block';
    } else {
        document.getElementsByClassName('eye')[0].style.display = 'none';
    }
}

function getRandom(min, max) {
    random = Math.round(Math.random() * (max - min) + min);
    console.log('new random = ' + random);
    return random
}

var counter = 0;
var random = getRandom(3, 10);
var marginLeft = 0;
var move_right = 1;
var ghosts_count = 0;
console.log('random = ' + random);