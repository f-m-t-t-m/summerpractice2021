var firebaseConfig = {
    apiKey: "AIzaSyCoglHbEongRzjyeeTxjroSXgdZnd1VpMM",
    authDomain: "fefu2021practice.firebaseapp.com",
    databaseURL: "https://fefu2021practice-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fefu2021practice",
    storageBucket: "fefu2021practice.appspot.com",
    messagingSenderId: "891980561155",
    appId: "1:891980561155:web:b210fa426a425691318736"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function createRoom() {
    let hostName = document.getElementById("hostName").value;
    let maxPlayersNum = document.getElementById("maxPlayersNum").value;
    let roomName = document.getElementById("roomName").value;
    firebase.database().ref('rooms/' + roomName).set({
       hostName: hostName,
       playersNum: 1,
       maxPlayersNum: maxPlayersNum ,
       players: {
           0: hostName,
       }
    });
}
