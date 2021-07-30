var firebaseConfig = {
    apiKey: "AIzaSyCoglHbEongRzjyeeTxjroSXgdZnd1VpMM",
    authDomain: "fefu2021practice.firebaseapp.com",
    databaseURL: "https://fefu2021practice-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fefu2021practice",
    storageBucket: "fefu2021practice.appspot.com",
    messagingSenderId: "891980561155",
    appId: "1:891980561155:web:b210fa426a425691318736"
};

firebase.initializeApp(firebaseConfig);

let room;
function createRoom() {
    let hostName = document.getElementById("hostName").value;
    name = hostName;
    let maxPlayersNum = document.getElementById("maxPlayersNum").value;
    let roomName = document.getElementById("roomName").value;
    room = roomName;
    let board = new Board();
    board.start([hostName]);
    firebase.database().ref('rooms/' + roomName).set({
        fullUpdate: 1,
        currentPlayer: 0,
        gameStarted: 0,
        playersNum: 1,
        maxPlayersNum: maxPlayersNum ,
        players: {
            0: {
                name: hostName,
                trainCards: board.players[0].playerTrainCards,
                tickets: board.players[0].playerTicketCards,
                trains: 40,
                pts: 0,
            },
        },
        board: {
            visibleCards: board.visibleCards,
            railways: board.railways,
            trains: board.trains,
            tickets: board.tickets,
            colors: ["green", "orange", "red", "blue"],
        },
    });
    let players = document.getElementById("players");
    let playersList = document.getElementById("playersList");
    firebase.database().ref('rooms/' + room + '/players').on("child_added", function (snapshot) {
        let p = document.createElement("p");
        p.textContent = snapshot.val().name;
        playersList.appendChild(p);
    });
    let roomCreate = document.getElementById("roomCreate");
    roomCreate.classList.add("hide");
    players.classList.remove("hide");
    play.classList.remove("hide");
    startGame();
}

function getRooms() {
    firebase.database().ref('rooms/').on('child_added', function(snapshot) {
        let table = document.getElementById("table");
        let data = snapshot.val();
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.textContent = `${snapshot.key}`;
        td.addEventListener("click", function () {
            let chosen = document.getElementsByClassName("chosen");

            for (let i = 0; i < chosen.length; i++) {
                chosen[i].classList.remove("chosen");
            }
            this.classList.add("chosen");
        });
        tr.appendChild(td);

        let td_players = document.createElement("td");
        td_players.textContent = `Игроков: ${data.playersNum}/${data.maxPlayersNum}`
        tr.appendChild(td_players);
        table.appendChild(tr);
    });
}

let join = document.getElementById("join");
join.addEventListener("click", joinRoom);
join.addEventListener("click", () => {
    let players = document.getElementById("players");
    let playersList = document.getElementById("playersList");
    let roomList = document.getElementById("roomList");
    firebase.database().ref('rooms/' + room + '/players/').on("child_added", function (snapshot) {
        let p = document.createElement("p");
        p.textContent = snapshot.val().name;
        playersList.appendChild(p);
    });
    players.classList.remove("hide");
    play.classList.remove("hide");
    roomList.classList.add("hide");
    startGame();
}, { once: true });

function joinRoom() {
    let newUser = document.getElementById("playerName").value;
    name = newUser;
    room = document.getElementsByClassName("chosen")[0].textContent;
    if (room) {
        firebase.database().ref('rooms/'+room).get().then((snapshot) => {
            let data = snapshot.val();
            if (data.playersNum == data.maxPlayersNum) {
                alert("Room is full");
                return;
            }
            let newUserCards = data.board.trains.cards.splice(0, 4);
            let newUserTickets = data.board.tickets.cards.splice(0, 3);
            firebase.database().ref('rooms/' + room).update({
                playersNum: data.playersNum + 1,
            });
            firebase.database().ref('rooms/' + room +'/board/').update({
                trains: data.board.trains,
                tickets: data.board.tickets,
            });
            let newPlayer = firebase.database().ref('rooms/' + room + '/players/' + data.playersNum);
            newPlayer.set({
                name: newUser,
                trainCards: newUserCards,
                tickets: newUserTickets,
                trains: 40,
                pts: 0,
            });
        });
    }
}

let data;
let board;
let name;
let meIndex = 0;
function startGame() {
    let startFlag = 0;
    let moveType = "";
    let moveEndFlag = 0;
    let takenCards = 0;
    let moveContinue = 0;
    let unavailablePathsId = new Set();
    let move;
    let availablePaths;
    let availablePathsId;
    let clickPath;
    let paths = document.getElementsByClassName("railway");
    let cards;
    let checkLocomotive = false, countLocomotive = 0, cardLocomotive;
    let allRailways;
    let railwaysWithLocomotive;
    let railwaysWithLocomotiveId = [];
    let colorWagon, countWagon;
    let countCardsSameColor;
    let railwayCost = 0;
    let lengthPath = 0;
    let len = 0;
    let lastTurnFlag = 0;
    let endGame = 0;

    let body = document.getElementsByTagName("body");
    body[0].addEventListener("click", function clicked(e) {
        if (e.target && e.target.classList.contains("visibleCards")) {
            if ((moveType == "takeVisibleCard" || moveType == "" || moveType == "takeDeckCard") && takenCards < 2) {
                if (takenCards == 1 && e.target.getAttribute("color") == "locomotive") {
                    alert("You can't take locomotive now");
                }
                else {
                    moveContinue = 1;
                    takenCards++
                    if (takenCards == 2) {
                        moveEndFlag = 1;
                    }
                    moveType = "takeVisibleCard";
                    let color = takeVisibleCards(board, e.target, meIndex);
                    if (e.target.getAttribute("color") == "locomotive") {
                        takenCards = 2;
                        moveEndFlag = 1;
                    }

                    firebase.database().ref('rooms/'+room).update({
                        fullUpdate: 0,
                    }, () => {
                        let newMove = firebase.database().ref('rooms/' + room + '/players/' + board.players[data.currentPlayer].id +
                            '/move');
                        newMove.set({
                            moveType: "takeVisibleCard",
                            cardIndex: e.target.getAttribute("index"),
                            newCard: color,
                        }, () => {
                            firebase.database().ref('rooms/'+room+'/board/visibleCards/'+e.target.getAttribute("index")).update({
                                color: color,
                            }, () => {
                                firebase.database().ref('rooms/'+room+'/players/'+board.players[data.currentPlayer].id).update({
                                    trainCards: board.players[data.currentPlayer].playerTrainCards,
                                }, () => {
                                    firebase.database().ref("rooms/"+room+'/board').update({
                                        trains: board.trains,
                                    }, () => {
                                        firebase.database().ref('rooms/'+room).update({
                                            fullUpdate: 1,
                                        });
                                    });
                                })
                            });
                        });
                    });
                }
            }
        }
        if (e.target && e.target.classList.contains("takeCardsDeck")) {
            if((moveType == "takeDeckCard" || moveType == "" || moveType == "takeVisibleCard") && takenCards < 2) {
                moveContinue = 1;
                moveType = "takeDeckCard";
                takenCards++;
                if (takenCards == 2) {
                    moveEndFlag = 1;
                }
                takeTrainCards(board, e.target, meIndex);
                firebase.database().ref('rooms/'+room).update({
                    fullUpdate: 0,
                }, () => {
                    let newMove = firebase.database().ref('rooms/' + room + '/players/' + board.players[data.currentPlayer].id +
                        '/move');
                    newMove.set({
                        moveType: "takeDeckCard",
                    }, () => {
                        firebase.database().ref('rooms/'+room+'/board').update({
                            trains: board.trains,
                        }, () => {
                            firebase.database().ref('rooms/'+room+'/players/'+board.players[data.currentPlayer].id).update({
                                trainCards: board.players[data.currentPlayer].playerTrainCards,
                            }, () => {
                                firebase.database().ref('rooms/'+room).update({
                                    fullUpdate: 1,
                                });
                            });
                        });
                    });
                });
            }
        }
        if (e.target && e.target.classList.contains("ticketDeck")) {
            if (moveType == "") {
                moveType = "takeTickets";
                let ticketsToChoose = drawTicketChoice(board);
                let chosenNum = ticketsToChoose.length;
                let visibleCards = document.getElementsByClassName("visibleCards");
                let text = document.getElementsByClassName("btn");
                let textRect = document.getElementsByClassName("btnRect");
                let btn = document.getElementsByClassName("btnContainer");
                let ticketDeck = document.getElementsByClassName("ticketDeck");
                let ticketCards = document.getElementsByClassName("ticketCards");
                let ticketList = document.getElementsByClassName("ticketList");

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
                                board.players[meIndex].playerTicketCards.push(ticketsToChoose[i]);
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
                        drawPlayerTickets(board, meIndex);
                        ticketList[0].remove();
                        btn[0].remove();
                        this.removeEventListener('click', arguments.callee);
                        moveEndFlag = 1;
                        firebase.database().ref('rooms/'+room).update({
                            fullUpdate: 0,
                        }, () => {
                            let newMove = firebase.database().ref('rooms/' + room + '/players/' + board.players[data.currentPlayer].id +
                                '/move');
                            newMove.set({
                                moveType: "takeTickets",
                                chosenNum: chosenNum,
                            }, () => {
                                firebase.database().ref('rooms/'+room+'/board/tickets/').update({
                                    cards: board.tickets.cards,
                                }, () => {
                                    firebase.database().ref('rooms/'+room+'/players/'+board.players[data.currentPlayer].id).update({
                                        tickets: board.players[data.currentPlayer].playerTicketCards,
                                    }, () => {
                                        firebase.database().ref('rooms/'+room).update({
                                            fullUpdate: 1,
                                        });
                                    });
                                })
                            });
                        });
                    }
                });
            }
        }
        if (e.target && e.target.parentNode && e.target.parentNode.classList.contains("card")) {
            if (moveType == "") {
                checkLocomotive = false;
                cards = document.getElementsByClassName("card");
                let target = e.target.parentNode;
                allRailways = board.railways;
                railwaysWithLocomotive = allRailways.filter(item => item["locomotive"] === 1);
                railwaysWithLocomotiveId = [];
                for (let i = 0; i < railwaysWithLocomotive.length; i++) {
                    railwaysWithLocomotiveId.push(railwaysWithLocomotive[i]["id"]);
                }
                if (!target.classList.contains("selected")) {
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
                    target.classList.add("selected");

                    for (let j = 0; j < paths.length; j++) {
                        if (!unavailablePathsId.has(paths[j].getAttribute("id"))) {
                            paths[j].classList.add("hide");
                        }
                    }
                    if (checkLocomotive) {
                        colorWagon = target.getAttribute("color");
                        countWagon = Number(target.getAttribute("number")) + Number(countLocomotive);
                        countCardsSameColor = Number(target.getAttribute("number"));
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
                            }
                        }
                    }
                    else {
                        colorWagon = target.getAttribute("color");
                        countWagon = Number(target.getAttribute("number"));
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
                                availablePath.classList.remove("hide");
                            }
                        }
                    }
                }
                else {
                    target.classList.remove("selected");
                    for(let j = 0; j < paths.length; j++) {
                        if (!unavailablePathsId.has(paths[j].getAttribute("id"))) {
                            paths[j].classList.add("hide");
                        }
                    }
                }
            }
        }
        if (e.target && e.target.classList.contains("railway") && !e.target.classList.contains("unavailable")) {
            moveType = "fillPath";
            let playerTrainCard = board.players[data.currentPlayer].playerTrainCards;
            if (checkLocomotive) {
                lengthPath = allRailways[Number(e.target.getAttribute("id")) - 1]["length"];
                len = lengthPath;
                railwayCost = allRailways[Number(e.target.getAttribute("id")) - 1]["cost"];
                if (railwaysWithLocomotiveId.includes(Number(e.target.getAttribute("id")))) {
                    for (let k = playerTrainCard.length - 1; k >= 0; k--) {
                        if (playerTrainCard[k]["color"] === "locomotive") {
                            playerTrainCard.splice(k, 1);
                            break;
                        }
                    }
                    lengthPath--;
                    if (lengthPath <= countCardsSameColor) {
                        for (let k = playerTrainCard.length-1; k >= 0; k--) {
                            if (playerTrainCard[k]["color"] === colorWagon && lengthPath !== 0) {
                                playerTrainCard.splice(k, 1);
                                lengthPath--;
                            }
                        }
                    }
                    else {
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
                    }
                }
                else {
                    if (lengthPath <= countCardsSameColor) {
                        for (let k = playerTrainCard.length-1; k >= 0; k--) {
                            if (playerTrainCard[k]["color"] === colorWagon && lengthPath !== 0) {
                                playerTrainCard.splice(k, 1);
                                lengthPath--;
                            }
                        }
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
                    }
                }
                e.target.setAttribute("fill", board.colors[data.currentPlayer]);
                unavailablePathsId.add(e.target.getAttribute("id"));
                e.target.classList.add("unavailable");
                allRailways[Number(e.target.getAttribute("id")) - 1].player = data.currentPlayer;
                for(let i = 0; i < cards.length; i++) {
                    cards[i].classList.remove("selected");
                }
                for(let i = 0; i < paths.length; i++) {
                    if (!unavailablePathsId.has(paths[i].getAttribute("id"))) {
                        paths[i].classList.add("hide");
                    }
                }
            }
            else {
                lengthPath = allRailways[Number(e.target.getAttribute("id")) - 1]["length"];
                len = lengthPath;
                railwayCost = allRailways[Number(e.target.getAttribute("id")) - 1]["length"];
                for (let k = playerTrainCard.length-1; k >= 0; k--) {
                    if (playerTrainCard[k]["color"] === colorWagon && lengthPath !== 0) {
                        playerTrainCard.splice(k, 1);
                        lengthPath--;
                    }
                }
                e.target.setAttribute("fill", board.colors[data.currentPlayer]);
                unavailablePathsId.add(e.target.getAttribute("id"));
                e.target.classList.add("unavailable");
                allRailways[Number(e.target.getAttribute("id")) - 1].player = data.currentPlayer;
                for(let i = 0; i < cards.length; i++) {
                    cards[i].classList.remove("selected");
                }
                for(let j = 0; j < paths.length; j++) {
                    if (!unavailablePathsId.has(paths[j].getAttribute("id"))) {
                        paths[j].classList.add("hide");
                    }
                }
            }

            let finishedTickets = board.checkTickets(board.players[data.currentPlayer]);
            for(let i = 0; i < finishedTickets.length; i++) {
                board.players[data.currentPlayer].playerPts += board.players[data.currentPlayer].playerTicketCards[i].cost;
                removeTicket(finishedTickets[i]);
            }
            board.players[data.currentPlayer].playerPts += railwayCost;
            board.players[data.currentPlayer].trains -= len;
            if (board.players[data.currentPlayer].trains <= 2) {
                lastTurnFlag = 1;
            }
            redrawPlayerInfo(board, meIndex);
            moveEndFlag = 1;
            redrawPlayerCards(board.players[data.currentPlayer]);
            firebase.database().ref('rooms/'+room).update({
                fullUpdate: 0,
            }, () => {
                let newMove = firebase.database().ref('rooms/' + room + '/players/' + board.players[data.currentPlayer].id +
                    '/move');
                newMove.set({
                    moveType: "fillPath",
                    filledPath: e.target.getAttribute("id"),
                }, () => {
                    firebase.database().ref('rooms/'+room+'/board').update({
                        railways: board.railways,
                    }, () => {
                        firebase.database().ref('rooms/'+room+'/players/'+board.players[data.currentPlayer].id).update({
                            trainCards: board.players[data.currentPlayer].playerTrainCards,
                            pts: board.players[data.currentPlayer].playerPts,
                            trains: board.players[data.currentPlayer].trains,
                            tickets: board.players[data.currentPlayer].playerTicketCards,
                        }, () => {
                            firebase.database().ref('rooms/'+room).update({
                                fullUpdate: 1,
                            });
                        });
                    })
                });
            });
        }
    });

    firebase.database().ref('rooms/' + room).on('value', function(snapshot){
        data = snapshot.val();
        if (meIndex == data.currentPlayer && !endGame) {
            body[0].style.pointerEvents = "unset";
        }
        if (meIndex != data.currentPlayer) {
            body[0].style.pointerEvents = "none";
        }
        drawCurrentPlayer(board, data.currentPlayer);
        if (data.fullUpdate) {
            if (lastTurnFlag) {
                endGame = 1;
                let max = 0;
                for (let i = 0; i < board.players.length; i++) {
                    for(let j = 0; j < board.players[i].playerTicketCards.length; j++) {
                        board.players[i].playerPts -= board.players[i].playerTicketCards[j].cost;
                    }

                        if(i == meIndex) {
                            redrawPlayerInfo(board, i);
                        }
                        else {
                            redrawCurrentPlayer(board, i);
                        }
                    }
                for (let i = 0; i < board.players.length; i++) {
                    if (board.players[i].playerPts > max) {
                        max = i;
                    }
                    if (!board.players[i].lastTurn) {
                        endGame = 0;
                    }
                }
                if (endGame) {
                    alert("GAME ENDED!"+"\nWINNER IS " + board.colors[max]);
                }
            }
            if (lastTurnFlag && !board.players[data.currentPlayer].lastTurn) {
                board.players[data.currentPlayer].lastTurn = 1;
            }
            if (data.gameStarted == 1 && !startFlag) {
                startFlag = 1;
                board = new Board();
                let meFlag = 0;
                for(let [k, v] of Object.entries(data.players)) {
                    if (v.name !== name && !meFlag) {
                        meIndex++;
                    }
                    else {
                        meFlag = 1;
                    }
                    let player = new Player(v.name);
                    player.playerTrainCards = v.trainCards;
                    player.playerTicketCards = v.tickets;
                    player.playerPts = v.pts;
                    player.trains = v.trains;
                    player.id = k;
                    board.players.push(player);
                }
                board.trains = data.board.trains;
                board.tickets = data.board.tickets;
                board.visibleCards = data.board.visibleCards;
                let game = document.getElementById("gameMain");
                game.classList.remove("hide");
                let menu = document.getElementById("menu");
                menu.classList.add("hide");
                drawOtherPlayers(board, meIndex);
                drawPlayerHand(board.players[meIndex]);
                drawRightDecks(board);
                drawPlayerTickets(board, meIndex);
                drawPlayerInfo(board, meIndex);
                let path = document.getElementsByTagName("path");
                for(let i = 0; i < path.length; i++) {
                    path[i].classList.add("hide");
                }
                if (meIndex != data.currentPlayer) {
                    body[0].style.pointerEvents = "none";
                }
            }

            if(data.gameStarted == 1 && meIndex != data.currentPlayer) {
                board.update(data);
                redrawCurrentPlayer(board, data.currentPlayer);
                firebase.database().ref('rooms/'+room+'/players/'+data.currentPlayer+'/move/').get().then((snapshot) => {
                    move = snapshot.val();
                    if (move != null && move.moveType == "takeDeckCard") {
                        removeTopCardDeck(data.currentPlayer);
                    }
                    if (move != null && move.moveType == "takeVisibleCard") {
                        removeVisibleCard(data.currentPlayer, move.cardIndex, move.newCard);
                    }
                    if (move != null && move.moveType == "takeTickets") {
                        removeTicketCards(move.chosenNum);
                    }
                    if (move != null && move.moveType == "fillPath") {
                        fillPath(move.filledPath, unavailablePathsId);
                    }
                })
            }

            if (moveEndFlag == 1) {
                moveType = "";
                moveEndFlag = 0;
                takenCards = 0;
                moveContinue = 0;
                railwayCost = 0;

                let currentPlayer = data.currentPlayer;
                if (currentPlayer == data.playersNum-1) {
                    currentPlayer = 0;
                }
                else {
                    currentPlayer++;
                }
                console.log("endturn");
                firebase.database().ref('rooms/'+room).update({
                    fullUpdate: 0,
                }, () => {
                    firebase.database().ref('rooms/'+room).update({
                        currentPlayer: currentPlayer,
                    });
                });
            }
        }
    });
}

getRooms();

