let game = document.getElementById("game");
let rect = game.getBoundingClientRect();

const cardWidth = 90;
const cardHeight = 90*474/292;

const mapWidth = rect.width/1.6;
const mapHeight = mapWidth*2301/3578;


game.addEventListener("click", function (e) {
    console.log(e.clientX, e.clientY);
});

let unavailablePathsId = new Set();

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
    let playerCards = document.createElementNS("http://www.w3.org/2000/svg", "g");
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
        playerCards.appendChild(card);
        card.setAttribute("color", trainColor);
        card.setAttribute("number", value);
        i += 1;
    }
    playerCards.setAttribute("class", "playerCards");
    game.appendChild(playerCards);

    drawPlayersPath();
}

function drawPlayersPath() {
    let paths = document.getElementsByClassName("railway");
    let cards = document.getElementsByClassName("card");
    let checkLocomotive = false, countLocomotive = 0, cardLocomotive;
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].getAttribute("color") === "locomotive") {
            cardLocomotive = cards[i];
            checkLocomotive = true;
            countLocomotive = cards[i].getAttribute("number");
            break;
        }
    }
    let allRailways = board.railways;
    let railwaysWithLocomotive = allRailways.filter(item => item["locomotive"] === 1);
    let railwaysWithLocomotiveId = [];
    for (let i = 0; i < railwaysWithLocomotive.length; i++) {
        railwaysWithLocomotiveId.push(railwaysWithLocomotive[i]["id"]);
    }
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", function (){
            let playerTrainCard = board.players[0]["playerTrainCards"];
            if (!cards[i].classList.contains("selected")) {
                for (let j = 0; j < cards.length; j++) {
                    if (cards[j].getAttribute("color") === "locomotive") {
                        cardLocomotive = cards[j];
                        checkLocomotive = true;
                        countLocomotive = cards[j].getAttribute("number");
                        break;
                    }
                }
                for (let j = 0; j < cards.length; j++) {
                    cards[j].classList.remove("selected");
                }
                cards[i].classList.add("selected");
                let colorWagon, countWagon;
                console.log(unavailablePathsId);
                for(let j = 0; j < paths.length; j++) {
                    if (!unavailablePathsId.has(paths[j].getAttribute("id"))) {
                        paths[j].classList.add("hide");
                    }
                }
                if (checkLocomotive) {
                    colorWagon = cards[i].getAttribute("color");
                    countWagon = Number(cards[i].getAttribute("number")) + Number(countLocomotive);
                    let countCardsSameColor = Number(cards[i].getAttribute("number"));
                    let availablePaths = allRailways.filter(item => Number(item["length"]) <= countWagon);
                    availablePaths = availablePaths.filter(item => (item["color"] === colorWagon || item["color"] === "grey"));
                    let availablePathsId = [];
                    for (let j = 0; j < availablePaths.length; j++) {
                        if (!unavailablePathsId.has(String(availablePaths[j]["id"]))) {
                            availablePathsId.push(availablePaths[j]["id"]);
                        }
                    }
                    for (let j = 0; j < availablePathsId.length; j++) {
                        if (!unavailablePathsId.has(availablePathsId[j])) {
                            let availablePath = document.getElementById(availablePathsId[j]);
                            availablePath.classList.remove("hide");
                            availablePath.addEventListener("click", function (){
                                let lengthPath = allRailways[Number(availablePath.getAttribute("id")) - 1]["length"];
                                if (railwaysWithLocomotiveId.includes(Number(availablePath.getAttribute("id")))) {
                                    for (let k = playerTrainCard.length-1; k >= 0; k--) {
                                        if (playerTrainCard[k]["color"] === "locomotive") {
                                            playerTrainCard.splice(k, 1);
                                            break;
                                        }
                                    }
                                    lengthPath--;
                                    cardLocomotive.setAttribute("number", String(countLocomotive - 1));
                                    if (lengthPath <= countCardsSameColor) {
                                        for (let k = playerTrainCard.length-1; k >= 0; k--) {
                                            if (playerTrainCard[k]["color"] === colorWagon && lengthPath !== 0) {
                                                playerTrainCard.splice(k, 1);
                                                lengthPath--;
                                            }
                                        }
                                        cards[i].setAttribute("number", String(countCardsSameColor - lengthPath));
                                    } else {
                                        for (let k = playerTrainCard.length-1; k >= 0; k--) {
                                            if (playerTrainCard[k]["color"] === colorWagon) {
                                                playerTrainCard.splice(k, 1);
                                                lengthPath--;
                                            }
                                        }
                                        cards[i].setAttribute("number", "0");
                                        for (let k = playerTrainCard.length-1; k >= 0; k--) {
                                            if (playerTrainCard[k]["color"] === "locomotive" && lengthPath !== 0) {
                                                playerTrainCard.splice(k, 1);
                                                lengthPath--;
                                            }
                                        }
                                        cardLocomotive.setAttribute("number", String(countLocomotive - (lengthPath - countCardsSameColor)));
                                    }
                                } else {
                                    if (lengthPath <= countCardsSameColor) {
                                        for (let k = playerTrainCard.length-1; k >= 0; k--) {
                                            if (playerTrainCard[k]["color"] === colorWagon && lengthPath !== 0) {
                                                playerTrainCard.splice(k, 1);
                                                lengthPath--;
                                            }
                                        }
                                        cards[i].setAttribute("number", String(countCardsSameColor - lengthPath));
                                    } else {
                                        for (let k = playerTrainCard.length-1; k >= 0; k--) {
                                            if (playerTrainCard[k]["color"] === colorWagon) {
                                                playerTrainCard.splice(k, 1);
                                                lengthPath--;
                                            }
                                        }
                                        for (let k = playerTrainCard.length-1; k >= 0; k--) {
                                            if (playerTrainCard[k]["color"] === "locomotive" && lengthPath !== 0) {
                                                playerTrainCard.splice(k, 1);
                                                lengthPath--;
                                            }
                                        }
                                        cards[i].setAttribute("number", "0");
                                        cardLocomotive.setAttribute("number", String(countLocomotive - (lengthPath - countCardsSameColor)));
                                    }
                                }
                                availablePath.setAttribute("fill", "purple");
                                unavailablePathsId.add(availablePath.getAttribute("id"));
                                availablePath.classList.add("unavailable");
                                allRailways[Number(availablePath.getAttribute("id")) - 1].player = "purple";
                                cards[i].classList.remove("selected");
                                for(let j = 0; j < paths.length; j++) {
                                    if (!unavailablePathsId.has(paths[j].getAttribute("id"))) {
                                        paths[j].classList.add("hide");
                                    }
                                }
                                redrawPlayerCards(board.players[board.currentPlayer]);
                            })
                        }
                    }
                } else {
                    colorWagon = cards[i].getAttribute("color");
                    countWagon = Number(cards[i].getAttribute("number"));
                    let availablePaths = allRailways.filter(item => !item["locomotive"]);
                    availablePaths = availablePaths.filter(item => Number(item["length"]) <= countWagon);
                    availablePaths = availablePaths.filter(item => (item["color"] === colorWagon || item["color"] === "grey"));
                    let availablePathsId = [];
                    for (let j = 0; j < availablePaths.length; j++) {
                        if (!unavailablePathsId.has(availablePaths[j]["id"])) {
                            availablePathsId.push(availablePaths[j]["id"]);
                        }
                    }
                    for (let j = 0; j < availablePathsId.length; j++) {
                        if (!unavailablePathsId.has(availablePathsId[j])) {
                            let availablePath = document.getElementById(availablePathsId[j]);
                            //console.log(availablePath);
                            availablePath.classList.remove("hide");
                            availablePath.addEventListener("click", function (){
                                let lengthPath = allRailways[Number(availablePath.getAttribute("id")) - 1]["length"];
                                for (let k = playerTrainCard.length-1; k >= 0; k--) {
                                    if (playerTrainCard[k]["color"] === colorWagon && lengthPath !== 0) {
                                        playerTrainCard.splice(k, 1);
                                        lengthPath--;
                                    }
                                }
                                cards[i].setAttribute("number", String(countWagon - lengthPath));
                                availablePath.setAttribute("fill", "purple");
                                unavailablePathsId.add(availablePath.getAttribute("id"));
                                availablePath.classList.add("unavailable");
                                allRailways[Number(availablePath.getAttribute("id")) - 1].player = "purple";
                                cards[i].classList.remove("selected");
                                for(let j = 0; j < paths.length; j++) {
                                    if (!unavailablePathsId.has(paths[j].getAttribute("id"))) {
                                        paths[j].classList.add("hide");
                                    }
                                }
                                redrawPlayerCards(board.players[board.currentPlayer]);
                            })
                        }
                    }
                }
            }
            else {
                cards[i].classList.remove("selected");
                for(let j = 0; j < paths.length; j++) {
                    if (!unavailablePathsId.has(paths[j].getAttribute("id"))) {
                        paths[j].classList.add("hide");
                    }
                }
            }
        })
    }
}

let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
function drawRightDecks() {
    for(let i = 0; i < board.trains.cards.length; i++) {
        let image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        image.setAttributeNS(null, "href", "img/wagons/reverse_side.png");
        image.setAttribute("width", cardWidth);
        image.setAttribute("height", cardHeight);
        image.setAttribute("x", rect.width - cardHeight-i/20);
        image.setAttribute("y", rect.height - cardHeight - cardWidth-i/20);
        image.setAttribute("class", "rightPanel");
        image.setAttribute("transform", "rotate(-90)")
        image.classList.add("takeCardsDeck");
        addAnimation(image, cardHeight);
    }
    for (let i = 0; i < board.tickets.cards.length; i++) {
        let image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        image.setAttributeNS(null, "href", "img/railways/reverse side.jpg");
        image.setAttribute("width", cardWidth);
        image.setAttribute("height", cardHeight);
        image.setAttribute("x", rect.width - cardHeight - i/20);
        image.setAttribute("y", rect.height - cardHeight + 10 - i/20);
        image.setAttribute("class", "rightPanel");
        image.classList.add("ticketDeck");
        image.setAttribute("transform", "rotate(-90)")
        g.appendChild(image);
    }

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
        image.setAttribute("index", i);
        addAnimation(image, cardHeight+i*cardWidth+cardWidth+20);
        image.classList.add("visibleCards")
        g.appendChild(image)
    }

    g.setAttribute("transform", "translate(-90 -45)");
    game.appendChild(g);
}

function addAnimation(image, yPos=0, xFrom=0, yFrom=0) {
    let animation = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
    animation.setAttribute("attributeName", "transform");
    animation.setAttribute("type", "translate");
    animation.setAttribute("dur", "1s");
    animation.setAttribute("begin", "indefinite");
    animation.setAttribute("repeatCount", "1");
    animation.setAttribute("from", `${xFrom}, ${yFrom}`);
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

// function drawPath() {
//     let pathes = document.createElementNS("http://www.w3.org/2000/svg", "g");
//     let map = document.getElementsByClassName("map")[0];
//     let path = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
//     path.setAttribute("points", `325, 277, 500, 125`);
//     path.classList.add("path");
//     pathes.appendChild(path);
//     game.appendChild(pathes);
// }

// function drawMap() {
//     let centerX = rect.width/2;
//     let centerY = rect.height/2;
//     let x = centerX - mapWidth/2;
//     let y = centerY - mapHeight/2-40;
//     let map = document.createElementNS("http://www.w3.org/2000/svg", "image");
//     map.setAttributeNS(null, "href", `img/map.jpg`);
//     map.setAttribute("width", mapWidth)
//     map.setAttribute("height", mapHeight);
//     map.setAttribute("x", x);
//     map.setAttribute("y", y);
//     map.setAttribute("class", "map");
//     game.appendChild(map);
// }

function drawTicketChoice() {
    let tickets = document.createElementNS("http://www.w3.org/2000/svg", "g");
    tickets.classList.add("ticketList")
    let ticketNum = Math.min(3, board.tickets.cards.length);
    let ticketCards = board.tickets.cards.splice(0, 3);
    for (let i = 0; i < ticketNum; i++) {
        let ticket = ticketCards[i];
        let image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        image.setAttributeNS(null, "href", `img/railways/${ticket.cities[0]}-${ticket.cities[1]}.jpg`);
        image.setAttribute("width", cardWidth)
        image.setAttribute("height", cardHeight);
        image.setAttribute("x", rect.width - cardHeight);
        image.setAttribute("y", rect.height - cardHeight - i*cardWidth - 2*cardWidth-20);
        image.setAttribute("class", "rightPanel");
        image.setAttribute("from", `${ticket.cities[0]}`);
        image.setAttribute("to", `${ticket.cities[1]}`);
        image.setAttribute("cost", `${ticket.cost}`);
        image.setAttribute("index", i);
        image.setAttribute("transform", "rotate(90)")
        addAnimation(image, cardHeight+i*cardWidth+cardWidth+20);
        image.classList.add("ticketCards");
        image.classList.add("hide");
        tickets.appendChild(image)
    }
    let btnContainer = document.createElementNS("http://www.w3.org/2000/svg", "g");
    let btn = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    let textNode = document.createTextNode("Confirm");

    btn.setAttributeNS(null, 'x', rect.width-150);
    btn.setAttributeNS(null, 'y', rect.height);
    btn.setAttributeNS(null, 'width', 100);
    btn.setAttributeNS(null, 'height', 30);
    btn.setAttributeNS(null, 'rx', 15);
    btn.setAttributeNS(null, 'ty', 15);
    btn.setAttributeNS(null, 'fill', 'green');
    btn.classList.add("btnRect");
    btn.classList.add("hide");
    let btnText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    btnText.appendChild(textNode);
    btnText.classList.add("btn");
    btnText.classList.add("hide");
    btnText.setAttributeNS(null, 'x', rect.width-140);
    btnText.setAttributeNS(null, 'y', rect.height+22);

    btnContainer.appendChild(btn);
    btnContainer.appendChild(btnText);
    btnContainer.classList.add("btnContainer")
    g.appendChild(btnContainer);
    g.appendChild(tickets);
    return ticketCards;
}

function drawPlayerTickets(player) {
    let tickets = player.playerTicketCards;
    for(let i = tickets.length-1; i >= 0; i--) {
        let image = document.createElementNS("http://www.w3.org/2000/svg", "image");
        image.setAttributeNS(null, "href", `img/railways/${tickets[i].cities[0]}-${tickets[i].cities[1]}.jpg`);
        image.setAttribute("width", cardWidth);
        image.setAttribute("height", cardHeight);
        image.setAttribute("x", cardHeight-10);
        image.setAttribute("index", i);
        image.setAttribute("y", rect.height-cardWidth-45-i*20);
        image.setAttribute("transform", "rotate(90), scale(1.25)");
        image.classList.add("playerTicket");
        game.appendChild(image);
    }
}

function takeTrainCards(board, target) {
    let takenCardsNum = 0;
    let locomotiveFlag = 0;
    let deck = document.getElementsByClassName("takeCardsDeck");
    let visibleCards = document.getElementsByClassName("visibleCards")
    let playerCards = document.getElementsByClassName("card");
    // if (takenCardsNum == 2 || locomotiveFlag) {
    //     return;
    // }
    let trainColor = board.trains.cards[0].color;
    board.players[board.currentPlayer].playerTrainCards.push(board.trains.cards.shift());
    target.setAttributeNS(null, "href", `img/wagons/${trainColor}.png`)
    let animation = target.getElementsByClassName("deckAnimation");
    let rotAnimation = target.getElementsByClassName("rotAnimation")
    let scaleAnimation = target.getElementsByClassName("scaleAnimation")
    animation[0].beginElement();
    rotAnimation[0].beginElement();
    scaleAnimation[0].beginElement();
    takenCardsNum++;
    redrawPlayerCards();
}

function takeVisibleCards(board, target) {
    let takenCardsNum = 0;
    let locomotiveFlag = 0;
    let deck = document.getElementsByClassName("takeCardsDeck");
    let visibleCards = document.getElementsByClassName("visibleCards")
    let playerCards = document.getElementsByClassName("card");
    // if (takenCardsNum == 2 || locomotiveFlag) {
    //     return;
    // }

    let trainColor = target.getAttribute("color");
    // if (takenCardsNum > 0 && trainColor == "locomotive") {
    //     return;
    // }
    let x = target.getAttribute("x");
    let y = target.getAttribute("y");
    let newCard = document.createElementNS("http://www.w3.org/2000/svg", "image");
    let newTrainCard = board.trains.cards.shift();
    let newCardColor = newTrainCard.color;
    let index = target.getAttribute("index");
    let xDeck = deck[deck.length-1].getAttribute("x");
    let yDeck = deck[deck.length-1].getAttribute("y");
    let yDeck0 = deck[0].getAttribute("y");
    let diff = yDeck-yDeck0;

    newCard.setAttributeNS(null, "href", `img/wagons/${newCardColor}.png`);
    newCard.setAttribute("width", cardWidth)
    newCard.setAttribute("height", cardHeight);
    newCard.setAttribute("x", xDeck);
    newCard.setAttribute("y", yDeck);
    newCard.setAttribute("class", "rightPanel");
    newCard.setAttribute("color", newCardColor);
    newCard.setAttribute("transform", "rotate(-90)")
    newCard.setAttribute("index", index);
    addAnimation(newCard, cardHeight, 0, -index*cardWidth - cardWidth-20);
    let topDeckAnimation = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
    topDeckAnimation.setAttribute("attributeName", "transform");
    topDeckAnimation.setAttribute("type", "translate");
    topDeckAnimation.setAttribute("dur", "0.5s");
    topDeckAnimation.setAttribute("begin", "indefinite");
    topDeckAnimation.setAttribute("repeatCount", "1");
    topDeckAnimation.setAttribute("from", `0, 0`);
    topDeckAnimation.setAttribute("to", `${x-xDeck}, ${-index*cardWidth - cardWidth-20-diff}`);
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


    // if (takenCardsNum == 0 && trainColor == "locomotive") {
    //     locomotiveFlag = 1;
    // }
    let train = new trainCard(trainColor);
    board.players[board.currentPlayer].playerTrainCards.push(train);
    let moveAnimation = target.getElementsByClassName("deckAnimation");
    let rotAnimation = target.getElementsByClassName("rotAnimation")
    let scaleAnimation = target.getElementsByClassName("scaleAnimation")
    moveAnimation[0].beginElement();
    rotAnimation[0].beginElement();
    scaleAnimation[0].beginElement();
    setTimeout(function() {
        topDeckAnimation.beginElement();
        topDeckAnimationRotate.beginElement();
    }, 50)
    board.visibleCards[index] = newTrainCard;
    takenCardsNum++;
    deck[deck.length-1].remove();
    redrawPlayerCards();
}

function takeTickets(board) {
    let ticketsToChoose = drawTicketChoice();
    let visibleCards = document.getElementsByClassName("visibleCards");
    let ticketCards = document.getElementsByClassName("ticketCards")

    let text = document.getElementsByClassName("btn");
    let textRect = document.getElementsByClassName("btnRect");
    let btn = document.getElementsByClassName("btnContainer");
    let ticketDeck = document.getElementsByClassName("ticketDeck");
    let chosenNum = ticketsToChoose.length;
    console.log(chosenNum, ticketDeck.length);
    for (let i = 0; i < visibleCards.length; i++) {
        visibleCards[i].classList.add("hide");
    }
    for (let i = 0; i < ticketCards.length; i++) {
        ticketCards[i].classList.remove("hide");
    }
    text[0].classList.remove("hide");
    textRect[0].classList.remove("hide");

    for (let i = 0; i < ticketCards.length; i++) {
        ticketCards[i].addEventListener("click", function () {
            if (!ticketCards[i].classList.contains("filter")) {
                chosenNum--;
            }
            else {
                chosenNum++;
            }
            if (chosenNum == 0) {
                textRect[0].setAttribute("fill", "grey");
            }
            else {
                textRect[0].setAttribute("fill", "green");
            }
            ticketCards[i].classList.toggle("filter");
        })
    }
    btn[0].addEventListener("click", function() {
        if (chosenNum > 0) {
            text[0].classList.add("hide");
            textRect[0].classList.add("hide");
            for (let i = 0; i < visibleCards.length; i++) {
                visibleCards[i].classList.remove("hide");
            }
            for (let i = 0; i < ticketCards.length; i++) {
                if (!ticketCards[i].classList.contains("filter")) {
                    board.players[board.currentPlayer].playerTicketCards.push(ticketsToChoose[i]);
                } else {
                    board.tickets.cards.push(ticketsToChoose[i]);
                }
            }
            for(let i = ticketCards.length-1; i >= 0; i--) {
                ticketCards[i].parentNode.removeChild(ticketCards[i]);
            }
            if (chosenNum == ticketDeck.length) {
                for(let i = ticketDeck.length-1; i >= 0; i--) {
                    ticketDeck[i].parentNode.removeChild(ticketDeck[i]);
                }
            }
            else {
                for (let i = 0; i < chosenNum; i++) {
                    ticketDeck[ticketDeck.length - 1 - i].remove();
                }
            }
            let tick = document.getElementsByClassName("playerTicket");
            for(let i = tick.length-1; i >= 0; i--) {
                tick[i].parentNode.removeChild(tick[i]);
            }
            drawPlayerTickets(board.players[0]);
            this.removeEventListener('click', arguments.callee);
        }
    });

}

function redrawPlayerCards() {
    let cards = document.getElementsByClassName("card");
    for(let i = cards.length-1; i >= 0; i--) {
        cards[i].parentNode.removeChild(cards[i]);
    }
    drawPlayerHand(board.players[0]);
}

// drawMap();
drawPlayerHand(board.players[0]);

drawRightDecks();
document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("ticketDeck")) {
        takeTickets(board);
    }
});
document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("visibleCards")) {
        takeVisibleCards(board, e.target);
    }
});
document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("takeCardsDeck")) {
        takeTrainCards(board, e.target);
    }
});

drawPlayerTickets(board.players[0])
document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("playerTicket")) {
        let index = e.target.getAttribute("index");
        let tmp = board.players[0].playerTicketCards[index];
        board.players[0].playerTicketCards[index] = board.players[0].playerTicketCards[0]
        board.players[0].playerTicketCards[0] = tmp;
        let tick = document.getElementsByClassName("playerTicket");
        for(let i = tick.length-1; i >= 0; i--) {
            tick[i].parentNode.removeChild(tick[i]);
        }
        drawPlayerTickets(board.players[0]);
    }
});

let path = document.getElementsByTagName("path");
for(let i = 0; i < path.length; i++) {
    path[i].classList.add("hide");
    path[i].addEventListener("click",function (){
    });
}