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
            let newPlayer = firebase.database().ref('rooms/' + room + '/players').push();
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
    let name = document.getElementById("hostName").value;
    firebase.database().ref('rooms/' + room).on('value', function(snapshot){
        data = snapshot.val();
        if (data.gameStarted == 1 && !startFlag) {
            startFlag = 1;
            let board = new Board();

            let meIndex = 0;
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
                board.players.push(player);
                console.log(player);
            }
            board.trains = data.board.trains;
            board.tickets = data.board.tickets;
            board.visibleCards = data.board.visibleCards;
            console.log(data);
            console.log(board);
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
    });
}

getRooms();

