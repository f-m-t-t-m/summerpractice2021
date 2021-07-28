function drawPlayerHand(player) {
    let game = document.getElementById("game");
    let rect = game.getBoundingClientRect();

    const cardWidth = 90;
    const cardHeight = 90*474/292;

    const mapWidth = rect.width/1.6;
    const mapHeight = mapWidth*2301/3578;

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
}

let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
function drawRightDecks(board) {
    let game = document.getElementById("game");
    let rect = game.getBoundingClientRect();

    const cardWidth = 90;
    const cardHeight = 90*474/292;

    const mapWidth = rect.width/1.6;
    const mapHeight = mapWidth*2301/3578;
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
    let game = document.getElementById("game");
    let rect = game.getBoundingClientRect();

    const cardWidth = 90;
    const cardHeight = 90*474/292;

    const mapWidth = rect.width/1.6;
    const mapHeight = mapWidth*2301/3578;
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

function drawTicketChoice(board) {
    let game = document.getElementById("game");
    let rect = game.getBoundingClientRect();

    const cardWidth = 90;
    const cardHeight = 90*474/292;

    const mapWidth = rect.width/1.6;
    const mapHeight = mapWidth*2301/3578;
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
    let game = document.getElementById("game");
    let rect = game.getBoundingClientRect();

    const cardWidth = 90;
    const cardHeight = 90*474/292;

    const mapWidth = rect.width/1.6;
    const mapHeight = mapWidth*2301/3578;
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
    let game = document.getElementById("game");
    let rect = game.getBoundingClientRect();

    const cardWidth = 90;
    const cardHeight = 90*474/292;

    const mapWidth = rect.width/1.6;
    const mapHeight = mapWidth*2301/3578;
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
    let game = document.getElementById("game");
    let rect = game.getBoundingClientRect();

    const cardWidth = 90;
    const cardHeight = 90*474/292;

    const mapWidth = rect.width/1.6;
    const mapHeight = mapWidth*2301/3578;
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
    let game = document.getElementById("game");
    let rect = game.getBoundingClientRect();

    const cardWidth = 90;
    const cardHeight = 90*474/292;

    const mapWidth = rect.width/1.6;
    const mapHeight = mapWidth*2301/3578;
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
    let game = document.getElementById("game");
    let rect = game.getBoundingClientRect();

    const cardWidth = 90;
    const cardHeight = 90*474/292;

    const mapWidth = rect.width/1.6;
    const mapHeight = mapWidth*2301/3578;
    let cards = document.getElementsByClassName("card");
    for(let i = cards.length-1; i >= 0; i--) {
        cards[i].parentNode.removeChild(cards[i]);
    }
    drawPlayerHand(board.players[0]);
}

function drawOtherPlayers(board, me) {
    let game = document.getElementById("game");
    let otherPlayerIndex = 0;
    for(let i = 0; i < board.players.length; i++) {
        if (board.players[i].playerName != me) {
            let otherPlayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
            let btn = document.createElementNS("http://www.w3.org/2000/svg", "rect");

            btn.setAttributeNS(null, 'x', 75);
            btn.setAttributeNS(null, 'y', 10 + 110*otherPlayerIndex);
            btn.setAttributeNS(null, 'width', 150);
            btn.setAttributeNS(null, 'height', 90);
            btn.setAttributeNS(null, 'rx', 5);
            btn.setAttributeNS(null, 'ty', 5);
            btn.setAttributeNS(null, 'fill', board.colors[i]);
            otherPlayer.appendChild(btn);

            let textNode = document.createTextNode(board.players[i].playerName);
            let btnText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            btnText.appendChild(textNode);
            btnText.classList.add("otherPlayerName");
            btnText.setAttributeNS(null, 'x', 80);
            btnText.setAttributeNS(null, 'y', 35 + 110*otherPlayerIndex);
            otherPlayer.appendChild(btnText);

            textNode = document.createTextNode(`Поездов ${board.players[i].trains}`);
            btnText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            btnText.appendChild(textNode);
            btnText.classList.add("otherPlayerStat");
            btnText.classList.add("otherPlayerTrains");
            btnText.setAttributeNS(null, 'x', 80);
            btnText.setAttributeNS(null, 'y', 65 + 110*otherPlayerIndex);
            otherPlayer.appendChild(btnText);

            textNode = document.createTextNode(`Карт поездов ${board.players[i].playerTrainCards.length}`);
            btnText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            btnText.appendChild(textNode);
            btnText.classList.add("otherPlayerStat");
            btnText.classList.add("otherPlayerCards");
            btnText.setAttributeNS(null, 'x', 80);
            btnText.setAttributeNS(null, 'y', 75 + 110*otherPlayerIndex);
            otherPlayer.appendChild(btnText);

            textNode = document.createTextNode(`Карт маршрутов ${board.players[i].playerTicketCards.length}`);
            btnText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            btnText.appendChild(textNode);
            btnText.classList.add("otherPlayerStat");
            btnText.classList.add("otherPlayerTickets");
            btnText.setAttributeNS(null, 'x', 80);
            btnText.setAttributeNS(null, 'y', 85 + 110*otherPlayerIndex);
            otherPlayer.appendChild(btnText);


            otherPlayer.classList.add("otherPlayer");
            game.appendChild(otherPlayer);

            otherPlayerIndex++;
        }
    }
}

play = document.getElementById("play");
play.addEventListener("click", function(){
    firebase.database().ref('rooms/' + room).update({
        gameStarted: 1,
    });
    // let menu = document.getElementById("menu");
    // menu.classList.add("hide");
    // let gam = document.getElementById("gameMain");
    // gam.classList.remove("hide");
    //
    // drawPlayerHand(board.players[0]);
    //
    // drawRightDecks();
    //
    // document.addEventListener("click", function (e) {
    //     if (e.target && e.target.classList.contains("ticketDeck")) {
    //         takeTickets(board);
    //     }
    // });
    // document.addEventListener("click", function (e) {
    //     if (e.target && e.target.classList.contains("visibleCards")) {
    //         takeVisibleCards(board, e.target);
    //     }
    // });
    // document.addEventListener("click", function (e) {
    //     if (e.target && e.target.classList.contains("takeCardsDeck")) {
    //         takeTrainCards(board, e.target);
    //     }
    // });
    //
    // drawPlayerTickets(board.players[0])
    // document.addEventListener("click", function (e) {
    //     if (e.target && e.target.classList.contains("playerTicket")) {
    //         let index = e.target.getAttribute("index");
    //         let tmp = board.players[0].playerTicketCards[index];
    //         board.players[0].playerTicketCards[index] = board.players[0].playerTicketCards[0]
    //         board.players[0].playerTicketCards[0] = tmp;
    //         let tick = document.getElementsByClassName("playerTicket");
    //         for(let i = tick.length-1; i >= 0; i--) {
    //             tick[i].parentNode.removeChild(tick[i]);
    //         }
    //         drawPlayerTickets(board.players[0]);
    //     }
    // });
});