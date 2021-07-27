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


function createRoom() {
    let hostName = document.getElementById("hostName").value;
    let maxPlayersNum = document.getElementById("maxPlayersNum").value;
    let roomName = document.getElementById("roomName").value;
    firebase.database().ref('rooms/' + roomName).set({
       hostName: hostName,
       playersNum: 1,
       maxPlayersNum: maxPlayersNum ,
       players: [hostName],
    });
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

let room;
let join = document.getElementById("join");
join.addEventListener("click", joinRoom);
join.addEventListener("click", () => {
    let players = document.getElementById("players");
    firebase.database().ref('rooms/' + room + '/players/').on("child_added", function (snapshot) {
        console.log(snapshot.val());
        let p = document.createElement("p");
        p.textContent = snapshot.val();
        players.appendChild(p);
    });
}, { once: true });


function joinRoom() {
    let newUser = document.getElementById("hostName").value;
    room = document.getElementsByClassName("chosen")[0].textContent;
    if (room) {
        firebase.database().ref('rooms/'+room).get().then((snapshot) => {
            let data = snapshot.val();
            if(data.playersNum == data.maxPlayersNum) {
                alert("Room is full");
                return;
            }
            data.players.push(newUser)
            firebase.database().ref('rooms/' + room).update({
                playersNum: data.playersNum + 1,
                players: data.players,
            });
            let players = document.getElementById("players");
        });
    }
}


getRooms();