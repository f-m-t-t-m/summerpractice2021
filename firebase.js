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
    let maxPlayersNum = document.getElementById("maxPlayersNum").value;
    let roomName = document.getElementById("roomName").value;
    room = roomName;
    let board = new Board();
    board.start([hostName]);
    firebase.database().ref('rooms/' + roomName).set({
        currentPlayer: 0,
        gameStarted: 0,
        playersNum: 1,
        maxPlayersNum: maxPlayersNum ,
        players: {
            0: {
                name: hostName,
                trainCards: board.players[0].playerTrainCards,
                tickets: board.players[0].playerTicketCards,
                trains: 45,
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

    firebase.database().ref('rooms/' + room + '/players').on("child_added", function (snapshot) {
        let p = document.createElement("p");
        p.textContent = snapshot.val().name;
        players.appendChild(p);
    });
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
    firebase.database().ref('rooms/' + room + '/players/').on("child_added", function (snapshot) {
        let p = document.createElement("p");
        p.textContent = snapshot.val().name;
        players.appendChild(p);
    });
    startGame();
}, { once: true });

function joinRoom() {
    let newUser = document.getElementById("hostName").value;
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
                trains: 45,
            });
        });
    }
}

let data;
function startGame() {
    let startFlag = 0;
    let meIndex = 0;
    let moveType = "";
    let moveEndFlag = 0;
    let takenCards = 0;
    let moveContinue = 0;
    let move;
    let board;
    let name = document.getElementById("hostName").value;
    firebase.database().ref('rooms/' + room).on('value', function(snapshot){
        data = snapshot.val();
        console.log(data);
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
            drawOtherPlayers(board, name);
            drawPlayerHand(board.players[meIndex]);
            drawRightDecks(board);
            drawTicketChoice(board);
            drawPlayerTickets(board.players[meIndex]);
        }
        if (data.gameStarted == 1) {
            if (meIndex == data.currentPlayer && moveEndFlag == 0 && !moveContinue) {
                alert("Your turn");
                document.addEventListener("click", function clicked(e) {
                    console.log("click");
                    if (e.target && e.target.classList.contains("visibleCards")) {
                        console.log(takenCards, moveType);
                        if ((moveType == "takeVisibleCard" || moveType == "" || moveType == "takeDeckCard") && takenCards < 2) {
                            if (takenCards == 1 && e.target.getAttribute("color") == "locomotive") {
                                alert("You can't take locomotive now");
                            }
                            else {
                                moveContinue = 1;
                                takenCards++;
                                if (takenCards == 2) {
                                    moveEndFlag = 1;
                                }
                                moveType = "takeVisibleCard";
                                let color = takeVisibleCards(board, e.target, meIndex);
                                if (e.target.getAttribute("color") == "locomotive") {
                                    takenCards = 2;
                                    moveEndFlag = 1;
                                }

                                let newMove = firebase.database().ref('rooms/' + room + '/players/' + board.players[data.currentPlayer].id +
                                    '/move');
                                newMove.set({
                                    moveType: "takeVisibleCard",
                                    cardIndex: e.target.getAttribute("index"),
                                    newCard: color,
                                });
                                firebase.database().ref('rooms/'+room+'/board/visibleCards/'+e.target.getAttribute("index")).update({
                                    color: color,
                                });
                                firebase.database().ref('rooms/'+room+'/board/trains/').update({
                                    cards: data.board.trains.cards.slice(1),
                                });
                                firebase.database().ref('rooms/'+room+'/players/'+board.players[data.currentPlayer].id).update({
                                    trainCards: board.players[data.currentPlayer].playerTrainCards,
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
                            let newMove = firebase.database().ref('rooms/' + room + '/players/' + board.players[data.currentPlayer].id +
                                '/move');
                            newMove.set({
                                moveType: "takeDeckCard",
                            });
                            firebase.database().ref('rooms/'+room+'/board/trains/').update({
                                cards: data.board.trains.cards.slice(1),
                            });
                            firebase.database().ref('rooms/'+room+'/players/'+board.players[data.currentPlayer].id).update({
                                trainCards: board.players[data.currentPlayer].playerTrainCards,
                            });
                        }
                    }
                },);
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
                })
            }
            console.log(moveEndFlag);
            if (moveEndFlag == 1) {
                document.removeEventListener("click", clicked);
                moveType = "";
                moveEndFlag = 0;
                takenCards = 0;
                moveContinue = 0;
                let currentPlayer = data.currentPlayer;
                if (currentPlayer == data.playersNum-1) {
                    currentPlayer = 0;
                }
                else {
                    currentPlayer++;
                }
                firebase.database().ref('rooms'+room).update({
                    currentPlayer: currentPlayer,
                });
            }
        }
    });
}

getRooms();

