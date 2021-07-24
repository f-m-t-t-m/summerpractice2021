const cardWidth = 90;
const cardHeight = 90*474/292;

const mapWidth = 975;
const mapHeight = 975*2301/3578;

let game = document.getElementById("game");
game.addEventListener("click", function (e) {
    console.log(e.clientX, e.clientY);
});
var rect = game.getBoundingClientRect();

function drawPlayerHand(player) {
    let playerTrainCardsDict = {};
    let uniqueCardsLen = 0;
    for (let i = 0; i < player.playerTrainCards.length; i++) {
        if (playerTrainCardsDict[player.playerTrainCards[i].color]) {
            playerTrainCardsDict[player.playerTrainCards[i].color]++;
        }
        else {
            playerTrainCardsDict[player.playerTrainCards[i].color] = 1;
            uniqueCardsLen++;
        }
    }
    let i = 0;
    for (let [trainColor, value] of Object.entries(playerTrainCardsDict)) {
        let card = document.createElementNS("http://www.w3.org/2000/svg", "g");
        let image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        image.setAttributeNS(null, "href", `img/wagons/${trainColor}.png`);
        image.setAttribute("width", cardWidth);
        image.setAttribute("height", cardHeight);
        image.setAttribute("x", rect.width / 2 - cardWidth/2+cardWidth*i-40*uniqueCardsLen);
        image.setAttribute("y", rect.height-cardHeight/2);
        card.setAttribute("class", "card");
        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        let textNode = document.createTextNode(value);
        text.appendChild(textNode);
        text.setAttributeNS(null, 'x', rect.width / 2 - cardWidth/2.5+cardWidth*i-40*uniqueCardsLen);
        text.setAttributeNS(null, 'y', rect.height-30);
        text.setAttribute('class', 'cardNumber');
        card.appendChild(image);
        card.appendChild(text);
        game.appendChild(card);
        i += 1;
    }
}

let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
function drawLeftDecks() {
    let image = document.createElementNS("http://www.w3.org/2000/svg", "image");
    image.setAttributeNS(null, "href", "img/wagons/reverse_side.png");
    image.setAttribute("width", cardWidth);
    image.setAttribute("height", cardHeight);
    image.setAttribute("x", rect.width - cardHeight);
    image.setAttribute("y", rect.height-cardHeight-cardWidth);
    image.setAttribute("class", "rightPanel");
    image.setAttribute("transform", "rotate(-90)")
    image.classList.add("takeCardsDeck");
    addAnimation(image, cardHeight);

    image = document.createElementNS("http://www.w3.org/2000/svg", "image");
    image.setAttributeNS(null, "href", "img/special ticket.jpg");
    image.setAttribute("width", cardWidth);
    image.setAttribute("height", cardHeight);
    image.setAttribute("x", rect.width - cardHeight);
    image.setAttribute("y", rect.height - cardHeight);
    image.setAttribute("class", "rightPanel")
    image.setAttribute("transform", "rotate(-90)")
    g.appendChild(image);

    for (let i = 0; i < board.visibleCards.length; i++) {
        let trainColor = board.visibleCards[i].color;
        let image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        image.setAttributeNS(null, "href", `img/wagons/${trainColor}.png`);
        image.setAttribute("width", cardWidth)
        image.setAttribute("height", cardHeight);
        image.setAttribute("x", rect.width - cardHeight);
        image.setAttribute("y", rect.height - cardHeight - i*cardWidth - 2*cardWidth-20);
        image.setAttribute("class", "rightPanel");
        image.setAttribute("color", trainColor);
        image.setAttribute("transform", "rotate(-90)")
        addAnimation(image, cardHeight+i*cardWidth+cardWidth+20);
        image.classList.add("visibleCards")
        g.appendChild(image)
    }

    g.setAttribute("transform", "translate(-90 -45)");
    game.appendChild(g);
}

function addAnimation(image, yPos) {
    let animation = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
    animation.setAttribute("attributeName", "transform");
    animation.setAttribute("type", "translate");
    animation.setAttribute("dur", "1s");
    animation.setAttribute("begin", "indefinite");
    animation.setAttribute("repeatCount", "1");
    animation.setAttribute("from", `0, 0`);
    animation.setAttribute("to", `${-rect.width/2 + cardWidth + 90}, ${yPos}`);
    animation.setAttribute("class", `deckAnimation`);
    animation.setAttribute("fill", `freeze`);
    image.appendChild(animation);

    animation = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
    animation.setAttribute("attributeName", "transform");
    animation.setAttribute("type", "scale");
    animation.setAttribute("dur", "1s");
    animation.setAttribute("begin", "indefinite");
    animation.setAttribute("repeatCount", "1");
    animation.setAttribute("from", `1 1`);
    animation.setAttribute("to", `0 0`);
    animation.setAttribute("class", `scaleAnimation`);
    animation.setAttribute("fill", `freeze`);
    animation.setAttribute("additive", `sum`);
    image.appendChild(animation);

    animation = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
    animation.setAttribute("attributeName", "transform");
    animation.setAttribute("type", "rotate");
    animation.setAttribute("dur", "1s");
    animation.setAttribute("begin", "indefinite");
    animation.setAttribute("repeatCount", "1");
    animation.setAttribute("from", `-90`);
    animation.setAttribute("to", `0`);
    animation.setAttribute("fill", `freeze`);
    animation.setAttribute("class", `rotAnimation`);
    animation.setAttribute("additive", `sum`);
    image.appendChild(animation);
    g.appendChild(image);
}

function drawMap() {
    let centerX = rect.width/2;
    let centerY = rect.height/2;
    let x = centerX - mapWidth/2;
    let y = centerY - mapHeight/2-40;
    let map = document.createElementNS("http://www.w3.org/2000/svg", "image");
    map.setAttributeNS(null, "href", `img/map.jpg`);
    map.setAttribute("width", mapWidth)
    map.setAttribute("height", mapHeight);
    map.setAttribute("x", x);
    map.setAttribute("y", y);
    map.setAttribute("class", "map")
    game.appendChild(map);
}

function takeTrainCards(board) {
    let takenCardsNum = 0;
    let locomotiveFlag = 0;
    let deck = document.getElementsByClassName("takeCardsDeck");
    let visibleCards = document.getElementsByClassName("visibleCards")
    let playerCards = document.getElementsByClassName("card");
    deck[0].addEventListener("click", function () {
        // if (takenCardsNum == 2 || locomotiveFlag) {
        //     return;
        // }
        let trainColor = board.trains.cards[0].color;
        board.players[board.currentPlayer].playerTrainCards.push(board.trains.cards.shift());

        deck[0].setAttributeNS(null, "href", `img/wagons/${trainColor}.png`)
        let animation = this.getElementsByClassName("deckAnimation");
        let rotAnimation = this.getElementsByClassName("rotAnimation")
        let scaleAnimation = this.getElementsByClassName("scaleAnimation")
        animation[0].beginElement();
        rotAnimation[0].beginElement();
        scaleAnimation[0].beginElement();
        takenCardsNum++;
        redraw();
    });
        let visibleIndex = 0;
        for(let i = 0; i < visibleCards.length; i++) {
            visibleCards[i].addEventListener("click", function () {
                visibleIndex = i;
            });
        }
        document.addEventListener("click", function (e){
            if (e.target && e.target.classList.contains('visibleCards')) {
                // if (takenCardsNum == 2 || locomotiveFlag) {
                //     return;
                // }
                let trainColor = e.target.getAttribute("color");
                let x = e.target.getAttribute("x");
                let y = e.target.getAttribute("y");
                let newCard = document.createElementNS("http://www.w3.org/2000/svg", "image");
                let newTrainCard = board.trains.cards.shift();
                let newCardColor = newTrainCard.color;
                newCard.setAttributeNS(null, "href", `img/wagons/${newCardColor}.png`);
                newCard.setAttribute("width", cardWidth)
                newCard.setAttribute("height", cardHeight);
                newCard.setAttribute("x", x);
                newCard.setAttribute("y", rect.height-cardHeight-cardWidth);
                newCard.setAttribute("class", "rightPanel");
                newCard.setAttribute("color", newCardColor);
                newCard.setAttribute("transform", "rotate(-90)")
                addAnimation(newCard);
                let topDeckAnimation = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
                topDeckAnimation.setAttribute("attributeName", "transform");
                topDeckAnimation.setAttribute("type", "translate");
                topDeckAnimation.setAttribute("dur", "1s");
                topDeckAnimation.setAttribute("begin", "indefinite");
                topDeckAnimation.setAttribute("repeatCount", "1");
                topDeckAnimation.setAttribute("from", `0, 0`);
                topDeckAnimation.setAttribute("to", `0, ${-visibleIndex*cardWidth - cardWidth-20}`);
                topDeckAnimation.setAttribute("class", `deckAnimation`);
                topDeckAnimation.setAttribute("fill", `freeze`);

                let topDeckAnimationRotate = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
                topDeckAnimationRotate.setAttribute("attributeName", "transform");
                topDeckAnimationRotate.setAttribute("type", "rotate");
                topDeckAnimationRotate.setAttribute("dur", "1s");
                topDeckAnimationRotate.setAttribute("begin", "indefinite");
                topDeckAnimationRotate.setAttribute("repeatCount", "1");
                topDeckAnimationRotate.setAttribute("to", `-90`);
                topDeckAnimationRotate.setAttribute("from", `-90`);
                topDeckAnimationRotate.setAttribute("class", `topDeckAnimationRotate`);
                topDeckAnimationRotate.setAttribute("fill", `freeze`);
                topDeckAnimationRotate.setAttribute("additive", `sum`);

                newCard.appendChild(topDeckAnimation);
                newCard.appendChild(topDeckAnimationRotate);
                newCard.classList.add("visibleCards")
                g.appendChild(newCard)

                //board.visibleCards[i] = newTrain;
                // if (takenCardsNum > 0 && trainColor == "locomotive") {
                //     return;
                // }
                // if (takenCardsNum == 0 && trainColor == "locomotive") {
                //     locomotiveFlag = 1;
                // }
                let train = new trainCard(trainColor);
                board.players[board.currentPlayer].playerTrainCards.push(train);
                let moveAnimation = e.target.getElementsByClassName("deckAnimation");
                let rotAnimation = e.target.getElementsByClassName("rotAnimation")
                let scaleAnimation = e.target.getElementsByClassName("scaleAnimation")
                let to = moveAnimation[0].getAttribute("to");
                newCard.getElementsByClassName("deckAnimation")[0].setAttribute("to", to);
                moveAnimation[0].beginElement();
                rotAnimation[0].beginElement();
                scaleAnimation[0].beginElement();
                setTimeout(function() {
                    topDeckAnimation.beginElement();
                    topDeckAnimationRotate.beginElement();
                }, 300)
                takenCardsNum++;
                redraw();
            }
        });
}

function redraw() {
    let cards = document.getElementsByClassName("card");
    for(let i = cards.length-1; i >= 0; i--) {
        cards[i].parentNode.removeChild(cards[i]);
    }
    drawPlayerHand(board.players[0]);
}

drawMap();
drawPlayerHand(board.players[0]);
drawLeftDecks();
takeTrainCards(board);