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

        for (let i = 0; i < colors.length; i++) {
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
                "cities": ["Fukushima",  "Okayama"],
                "cost": 4,
            },
            {
                "cities": ["Fukushima",  "Osaka"],
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
                "cities": ["Hachinohe",  "Korsakov"],
                "cost": 10,
            },
            {
                "cities": ["Hachinohe",  "Asahikawa"],
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
        this.color = "";
    }

    mulligan() {

    }
}

class Board {
    constructor() {
        this.players = [];
        this.visibleCards = [];
        this.tickets = [];
        this.railways = [
            {
                "cities": ["Kagoshima", "Miayzaki"],
                "length": 1,
                "color": "pink",
            },
            {
                "cities": ["Kagoshima", "Nagasaki"],
                "length": 1,
                "color": "grey",
                "locomotive": 1,
            },
            {
                "cities": ["Kagoshima", "Oita"],
                "length": 2,
                "color": "white",
            },
            {
                "cities": ["Nagasaki", "Fukuoka"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Nagasaki", "Fukuoka"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Miayzaki", "Kochi"],
                "length": 4,
                "color": "blue",
                "locomotive": 1,
            },
            {
                "cities": ["Miayzaki", "Oita"],
                "length": 2,
                "color": "orange",
            },
            {
                "cities": ["Fukuoka", "Oita"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Fukuoka", "Yamaguchi"],
                "length": 1,
                "color": "grey",
                "locomotive": 1,
            },
            {
                "cities": ["Fukuoka", "Matsue"],
                "length": 6,
                "color": "black",
                "locomotive": 1,
            },
            {
                "cities": ["Oita", "Matsuyama"],
                "length": 1,
                "color": "grey",
                "locomotive": 1,
            },
            {
                "cities": ["Fukuoka", "Taipei"],
                "length": 5,
                "color": "red",
                "locomotive": 1,
            },
            {
                "cities": ["Taipei", "Shanghai"],
                "length": 4,
                "color": "green",
                "locomotive": 1,
            },
            {
                "cities": ["Taipei", "Dalian"],
                "length": 6,
                "color": "white",
                "locomotive": 1,
            },
            {
                "cities": ["Kochi", "Matsuyama"],
                "length": 3,
                "color": "white",
            },
            {
                "cities": ["Kochi", "Wakayama"],
                "length": 3,
                "color": "grey",
                "locomotive": 1,
            },
            {
                "cities": ["Kochi", "Takamatsu"],
                "length": 3,
                "color": "black",
            },
            {
                "cities": ["Matsuyama", "Takamatsu"],
                "length": 2,
                "color": "red",
            },
            {
                "cities": ["Matsuyama", "Hiroshima"],
                "length": 1,
                "color": "grey",
                "locomotive": 1,
            },
            {
                "cities": ["Yamaguchi", "Matsue"],
                "length": 4,
                "color": "yellow",
            },
            {
                "cities": ["Yamaguchi", "Hiroshima"],
                "length": 1,
                "color": "green",
            },
            {
                "cities": ["Yamaguchi", "Hiroshima"],
                "length": 1,
                "color": "blue",
            },
            {
                "cities": ["Shanghai", "Dalian"],
                "length": 5,
                "color": "orange",
                "locomotive": 1,
            },
            {
                "cities": ["Shanghai", "Qingdao"],
                "length": 3,
                "color": "grey",
            },
            {
                "cities": ["Shanghai", "Matsue"],
                "length": 5,
                "color": "pink",
                "locomotive": 1,
            },
            {
                "cities": ["Wakayama", "Takamatsu"],
                "length": 2,
                "color": "yellow",
                "locomotive": 1,
            },
            {
                "cities": ["Wakayama", "Osaka"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Wakayama", "Shima"],
                "length": 3,
                "color": "green",
            },
            {
                "cities": ["Wakayama", "Shima"],
                "length": 3,
                "color": "green",
            },
            {
                "cities": ["Takamatsu", "Okayama"],
                "length": 1,
                "color": "grey",
                "locomotive": 1,
            },
            {
                "cities": ["Hiroshima", "Matsue"],
                "length": 2,
                "color": "orange",
            },
            {
                "cities": ["Hiroshima", "Okayama"],
                "length": 2,
                "color": "red",
            },
            {
                "cities": ["Hiroshima", "Okayama"],
                "length": 2,
                "color": "black",
            },
            {
                "cities": ["Okayama", "Osaka"],
                "length": 2,
                "color": "pink",
            },
            {
                "cities": ["Okayama", "Osaka"],
                "length": 2,
                "color": "green",
            },
            {
                "cities": ["Okayama", "Matsue"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Okayama", "Miyazu"],
                "length": 3,
                "color": "white",
            },
            {
                "cities": ["Qingdao", "Seoul"],
                "length": 3,
                "color": "grey",
                "locomotive": 1,
            },
            {
                "cities": ["Qingdao", "Dalian"],
                "length": 3,
                "color": "grey",
            },
            {
                "cities": ["Qingdao", "Miyazu"],
                "length": 5,
                "color": "green",
                "locomotive": 1,
            },
            {
                "cities": ["Dalian", "Seoul"],
                "length": 4,
                "color": "blue",
                "locomotive": 1,
            },
            {
                "cities": ["Dalian", "Pyongyang"],
                "length": 5,
                "color": "grey",
            },
            {
                "cities": ["Shima", "Tokyo"],
                "length": 6,
                "color": "yellow",
                "locomotive": 1,
            },
            {
                "cities": ["Shima", "Nagoya"],
                "length": 1,
                "color": "white",
            },
            {
                "cities": ["Shima", "Osaka"],
                "length": 2,
                "color": "blue",
            },
            {
                "cities": ["Osaka", "Kyoto"],
                "length": 1,
                "color": "orange",
            },
            {
                "cities": ["Osaka", "Kyoto"],
                "length": 1,
                "color": "yellow",
            },
            {
                "cities": ["Miyazu", "Seoul"],
                "length": 5,
                "color": "red",
                "locomotive": 1,
            },
            {
                "cities": ["Miyazu", "Fukui"],
                "length": 1,
                "color": "grey",
                "locomotive": 1,
            },
            {
                "cities": ["Miyazu", "Kyoto"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Seoul", "Pyongyang"],
                "length": 4,
                "color": "yellow",
                "locomotive": 1,
            },
            {
                "cities": ["Seoul", "Busan"],
                "length": 3,
                "color": "grey",
            },
            {
                "cities": ["Nagoya", "Kyoto"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Nagoya", "Kyoto"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Nagoya", "Fuji"],
                "length": 3,
                "color": "black",
            },
            {
                "cities": ["Nagoya", "Fuji"],
                "length": 3,
                "color": "pink",
            },
            {
                "cities": ["Nagoya", "Takasaki"],
                "length": 4,
                "color": "red",
            },
            {
                "cities": ["Kyoto", "Fukui"],
                "length": 2,
                "color": "blue",
            },
            {
                "cities": ["Fukui", "Nagano"],
                "length": 4,
                "color": "black",
            },
            {
                "cities": ["Fukui", "Suzu"],
                "length": 4,
                "color": "white",
                "locomotive": 1,
            },
            {
                "cities": ["Busan", "Suzu"],
                "length": 4,
                "color": "grey",
                "locomotive": 1,
            },
            {
                "cities": ["Busan", "Pyongyang"],
                "length": 3,
                "color": "white",
            },
            {
                "cities": ["Fuji", "Tokyo"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Fuji", "Tokyo"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Fuji", "Takasaki"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Tokyo", "Mito"],
                "length": 3,
                "color": "orange",
            },
            {
                "cities": ["Tokyo", "Oyama"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Tokyo", "Oyama"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Tokyo", "Takasaki"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Takasaki", "Nagano"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Takasaki", "Oyama"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Takasaki", "Koriyama"],
                "length": 3,
                "color": "pink",
            },
            {
                "cities": ["Nagano", "Koriyama"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Nagano", "Koriyama"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Nagano", "Niigata"],
                "length": 3,
                "color": "grey",
            },
            {
                "cities": ["Nagano", "Suzu"],
                "length": 3,
                "color": "blue",
            },
            {
                "cities": ["Suzu", "Pyongyang"],
                "length": 6,
                "color": "green",
                "locomotive": 1,
            },
            {
                "cities": ["Suzu", "Niigata"],
                "length": 3,
                "color": "grey",
                "locomotive": 1,
            },
            {
                "cities": ["Pyongyang", "Khabarovsk"],
                "length": 3,
                "color": "grey",
            },
            {
                "cities": ["Pyongyang", "Vladivostok"],
                "length": 4,
                "color": "red",
                "locomotive": 1,
            },
            {
                "cities": ["Pyongyang", "Chongjin"],
                "length": 2,
                "color": "pink",
            },
            {
                "cities": ["Mito", "Kaohsiung"],
                "length": 6,
                "color": "blue",
                "locomotive": 1,
            },
            {
                "cities": ["Mito", "Sendai"],
                "length": 5,
                "color": "pink",
                "locomotive": 1,
            },
            {
                "cities": ["Mito", "Fukushima"],
                "length": 3,
                "color": "red",
            },
            {
                "cities": ["Mito", "Oyama"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Oyama", "Fukushima"],
                "length": 2,
                "color": "green",
            },
            {
                "cities": ["Oyama", "Fukushima"],
                "length": 2,
                "color": "white",
            },
            {
                "cities": ["Koriyama", "Fukushima"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Koriyama", "Fukushima"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Koriyama", "Niigata"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Koriyama", "Niigata"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Fukushima", "Sendai"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Fukushima", "Sendai"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Yamagata", "Sendai"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Yamagata", "Niigata"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Yamagata", "Akita"],
                "length": 3,
                "color": "orange",
            },
            {
                "cities": ["Yamagata", "Morioka"],
                "length": 4,
                "color": "green",
            },
            {
                "cities": ["Niigata", "Chongjin"],
                "length": 5,
                "color": "yellow",
                "locomotive": 1,
            },
            {
                "cities": ["Niigata", "Vladivostok"],
                "length": 5,
                "color": "white",
                "locomotive": 1,
            },
            {
                "cities": ["Chongjin", "Vladivostok"],
                "length": 3,
                "color": "grey",
            },
            {
                "cities": ["Khabarovsk", "Vladivostok"],
                "length": 2,
                "color": "yellow",
            },
            {
                "cities": ["Khabarovsk", "Korsakov"],
                "length": 3,
                "color": "black",
            },
            {
                "cities": ["Vladivostok", "Korsakov"],
                "length": 4,
                "color": "pink",
                "lacomotive": 1,
            },
            {
                "cities": ["Korsakov", "Wakkanai"],
                "length": 4,
                "color": "grey",
                "lacomotive": 1,
            },
            {
                "cities": ["Wakkanai", "Asahikawa"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Wakkanai", "Asahikawa"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Wakkanai", "Abashiri"],
                "length": 3,
                "color": "green",
                "locomotive": 1,
            },
            {
                "cities": ["Asahikawa", "Sapporo"],
                "length": 1,
                "color": "red",
            },
            {
                "cities": ["Asahikawa", "Abashiri"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Asahikawa", "Obihiro"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Sapporo", "Hakodate"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Sapporo", "Hakodate"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Sapporo", "Obihiro"],
                "length": 1,
                "color": "black",
            },
            {
                "cities": ["Abashiri", "Obihiro"],
                "length": 3,
                "color": "yellow",
            },
            {
                "cities": ["Obihiro", "Hakodate"],
                "length": 2,
                "color": "grey",
                "lacomotive": 1,
            },
            {
                "cities": ["Obihiro", "Hachinohe"],
                "length": 4,
                "color": "pink",
                "lacomotive": 1,
            },
            {
                "cities": ["Hakodate", "Akita"],
                "length": 5,
                "color": "blue",
                "lacomotive": 1,
            },
            {
                "cities": ["Hakodate", "Aomori"],
                "length": 1,
                "color": "grey",
                "lacomotive": 1,
            },
            {
                "cities": ["Hakodate", "Aomori"],
                "length": 1,
                "color": "grey",
                "lacomotive": 1,
            },
            {
                "cities": ["Aomori", "Akita"],
                "length": 3,
                "color": "red",
            },
            {
                "cities": ["Aomori", "Hachinohe"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Aomori", "Hachinohe"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Akita", "Morioka"],
                "length": 2,
                "color": "black",
            },
            {
                "cities": ["Hachinohe", "Morioka"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Hachinohe", "Morioka"],
                "length": 1,
                "color": "grey",
            },
            {
                "cities": ["Hachinohe", "Sendai"],
                "length": 6,
                "color": "orange",
                "locomotive": 1,
            },
            {
                "cities": ["Morioka", "Sendai"],
                "length": 3,
                "color": "yellow",
            },
            {
                "cities": ["Morioka", "Sendai"],
                "length": 3,
                "color": "blue",
            },
            {
                "cities": ["Kaohsiung", "Taipei"],
                "length": 3,
                "color": "grey",
            },
            {
                "cities": ["Kaohsiung", "Shanghai"],
                "length": 4,
                "color": "black",
            },
            {
                "cities": ["Taipei", "Busan"],
                "length": 4,
                "color": "orange",
                "locomotive": 1,
            },
        ];
        this.trains = [];
        this.currentPlayer = 0;
    }

    start(playerOneName, playerTwoName) {
        this.players.push(new Player(playerOneName));
        this.players.push(new Player(playerTwoName));
        this.trains = new trainDeck();
        this.tickets = new ticketDeck();
        this.trains.createDeck();
        shuffleDeck(this.trains.cards);
        shuffleDeck(this.tickets.cards);
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].playerTrainCards = this.trains.cards.splice(0, 4);
            this.players[i].playerTicketCards = this.tickets.cards.splice(0, 3);
        }
        this.visibleCards = this.trains.cards.splice(0, 5);
    }
}

class Move {
    takeCards(deck) {
        this.type = "takeCards";
    }
}

board = new Board()
board.start("Me", "Player 2")