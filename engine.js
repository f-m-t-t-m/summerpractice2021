class trainCard {
    constructor(color) {
        this.color = color;
    }
}

class trainDeck {
    constructor() {
        this.cards = [];
    }

    createDeck() {
        let colors = ["pink", "white", "blue", "yellow",
                      "orange", "black", "red", "green"];

        for (let i = 0; i < colors.length-1; i++) {
            for (let j = 0; j < 12; j++) {
                this.cards.push(new trainCard(colors[i]));
            }
        }
        for(let i = 0; i < 14; i++) {
            this.cards.push(new trainCard("locomotive"));
        }
    }
}

class ticketDeck {
    constructor() {
        this.cards = [
            {
                "cities": ["Kagoshima", "Yamagata"],
                "cost": 18,
            },
            {
                "cities": ["Kagoshima",  "Mito"],
                "cost": 17,
            },
            {
                "cities": ["Nagasaki",  "Sendai"],
                "cost": 13,
            },
            {
                "cities": ["Fukuoka",  "Oyama"],
                "cost": 13,
            },
            {
                "cities": ["Oita",  "Fukushima"],
                "cost": 13,
            },
            {
                "cities": ["Kochi",  "Osaka"],
                "cost": 4,
            },
            {
                "cities": ["Yamaguchi",  "Shima"],
                "cost": 7,
            },
            {
                "cities": ["Hiroshima",  "Shima"],
                "cost": 6,
            },
            {
                "cities": ["Takamatsu",  "Nagano"],
                "cost": 10,
            },
            {
                "cities": ["Takamatsu",  "Nagano"],
                "cost": 10,
            },
            {
                "cities": ["Miyazu",  "Mito"],
                "cost": 8,
            },
            {
                "cities": ["Miyazu",  "Shima"],
                "cost": 3,
            },
            {
                "cities": ["Osaka",  "Koriyama"],
                "cost": 8,
            },
            {
                "cities": ["Kyoto",  "Yamagata"],
                "cost": 9,
            },
            {
                "cities": ["Suzu",  "Tokyo"],
                "cost": 5,
            },
            {
                "cities": ["Tokyo",  "Yamagata"],
                "cost": 5,
            },
            {
                "cities": ["Fukuoka",  "Okayama"],
                "cost": 4,
            },
            {
                "cities": ["Fukuoka",  "Osaka"],
                "cost": 6,
            },
            {
                "cities": ["Kochi",  "Oyama"],
                "cost": 6,
            },
            {
                "cities": ["Osaka",  "Akita"],
                "cost": 13,
            },
            {
                "cities": ["Suzu",  "Seoul"],
                "cost": 7,
            },
            {
                "cities": ["Tokyo",  "Kaohsiung"],
                "cost": 8,
            },
            {
                "cities": ["Tokyo",  "Shanghai"],
                "cost": 13,
            },
            {
                "cities": ["Tokyo",  "Aomori"],
                "cost": 9,
            },
            {
                "cities": ["Niigata",  "Khabarovsk"],
                "cost": 7,
            },
            {
                "cities": ["Niigata",  "Morioka"],
                "cost": 5,
            },
            {
                "cities": ["Sendai",  "Akita"],
                "cost": 4,
            },
            {
                "cities": ["Sendai",  "Obihiro"],
                "cost": 8,
            },
            {
                "cities": ["Hachinone",  "Korsakov"],
                "cost": 10,
            },
            {
                "cities": ["Hachinone",  "Asahikawa"],
                "cost": 4,
            },
            {
                "cities": ["Sapporo",  "Korsakov"],
                "cost": 6,
            },
            {
                "cities": ["Hakodate",  "Obihiro"],
                "cost": 2,
            },
            {
                "cities": ["Sapporo",  "Abashiri"],
                "cost": 2,
            },
            {
                "cities": ["Sapporo",  "Oyama"],
                "cost": 10,
            },
            {
                "cities": ["Vladivostok",  "Seoul"],
                "cost": 8,
            },
            {
                "cities": ["Vladivostok",  "Wakkanai"],
                "cost": 8,
            },
            {
                "cities": ["Vladivostok",  "Koriyama"],
                "cost": 6,
            },
            {
                "cities": ["Pyongyang",  "Seoul"],
                "cost": 6,
            },
            {
                "cities": ["Busan",  "Nagano"],
                "cost": 7,
            },
            {
                "cities": ["Busan",  "Khabarovsk"],
                "cost": 6,
            },
            {
                "cities": ["Dalian",  "Kyoto"],
                "cost": 7,
            },
            {
                "cities": ["Dalian",  "Shanghai"],
                "cost": 5,
            },
            {
                "cities": ["Taipei",  "Matsue"],
                "cost": 9,
            },
            {
                "cities": ["Taipei",  "Seoul"],
                "cost": 7,
            },
        ]
    }
}

function shuffleDeck(deck) {
    for(let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let t = deck[i];
        deck[i] = deck[j];
        deck[j] = t;
    }
}

class Player {
    constructor(name) {
        this.playerName = name;
        this.playerTrainCards = [];
        this.playerTicketCards = [];
        this.trains = 45;
        this.playerPts = 0;
    }

    mulligan() {

    }
}

class Board {
    constructor() {
        this.players = [];
        this.railways = [
            {

            }
        ];
    }

    start(playerOneName, playerTwoName) {
        this.players.push(new Player(playerOneName));
        this.players.push(new Player(playerTwoName));

        let trains = new trainDeck();
        let tickets = new ticketDeck();
        trains.createDeck();
        shuffleDeck(trains.cards);
        shuffleDeck(tickets.cards);
        console.log(trains.cards);
        console.log(tickets.cards);
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].playerTrainCards = trains.cards.splice(0, 4);
            this.players[i].playerTicketCards = tickets.cards.splice(0, 5);
            console.log(this.players[i].playerName);
            console.log(this.players[i].playerTicketCards);
            console.log(this.players[i].playerTrainCards);
        }
    }
}

board = new Board()
board.start("Me", "Player 2")