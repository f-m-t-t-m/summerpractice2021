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
                "id": 1,
                "cities": ["Kagoshima", "Miayzaki"],
                "length": 1,
                "color": "pink",
                "cost": 1,
            },
            {
                "id": 2,
                "cities": ["Kagoshima", "Nagasaki"],
                "length": 1,
                "color": "grey",
                "locomotive": 1,
                "cost": 1,
            },
            {
                "id": 3,
                "cities": ["Kagoshima", "Oita"],
                "length": 2,
                "color": "white",
                "cost": 2,
            },
            {
                "id": 4,
                "cities": ["Nagasaki", "Fukuoka"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 5,
                "cities": ["Nagasaki", "Fukuoka"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 6,
                "cities": ["Miayzaki", "Kochi"],
                "length": 3,
                "color": "blue",
                "locomotive": 1,
                "cost": 7,
            },
            {
                "id": 7,
                "cities": ["Miayzaki", "Oita"],
                "length": 2,
                "color": "orange",
                "cost": 2,
            },
            {
                "id": 8,
                "cities": ["Fukuoka", "Oita"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 9,
                "cities": ["Fukuoka", "Yamaguchi"],
                "length": 0,
                "color": "grey",
                "locomotive": 1,
                "cost": 1,
            },
            {
                "id": 10,
                "cities": ["Fukuoka", "Matsue"],
                "length": 5,
                "color": "black",
                "locomotive": 1,
                "cost": 15,
            },
            {
                "id": 11,
                "cities": ["Oita", "Matsuyama"],
                "length": 0,
                "color": "grey",
                "locomotive": 1,
                "cost": 1,
            },
            {
                "id": 12,
                "cities": ["Fukuoka", "Taipei"],
                "length": 4,
                "color": "red",
                "locomotive": 1,
                "cost": 10,
            },
            {
                "id": 13,
                "cities": ["Taipei", "Shanghai"],
                "length": 3,
                "color": "green",
                "locomotive": 1,
                "cost": 7,
            },
            {
                "id": 14,
                "cities": ["Taipei", "Dalian"],
                "length": 5,
                "color": "white",
                "locomotive": 1,
                "cost": 15,
            },
            {
                "id": 15,
                "cities": ["Kochi", "Matsuyama"],
                "length": 3,
                "color": "white",
                "cost": 4,
            },
            {
                "id": 16,
                "cities": ["Kochi", "Wakayama"],
                "length": 2,
                "color": "grey",
                "locomotive": 1,
                "cost": 4,
            },
            {
                "id": 17,
                "cities": ["Kochi", "Takamatsu"],
                "length": 3,
                "color": "black",
                "cost": 4,
            },
            {
                "id": 18,
                "cities": ["Matsuyama", "Takamatsu"],
                "length": 2,
                "color": "red",
                "cost": 2,
            },
            {
                "id": 19,
                "cities": ["Matsuyama", "Hiroshima"],
                "length": 0,
                "color": "grey",
                "locomotive": 1,
                "cost": 1,
            },
            {
                "id": 20,
                "cities": ["Yamaguchi", "Matsue"],
                "length": 4,
                "color": "yellow",
                "cost": 7,
            },
            {
                "id": 21,
                "cities": ["Yamaguchi", "Hiroshima"],
                "length": 1,
                "color": "green",
                "cost": 1,
            },
            {
                "id": 22,
                "cities": ["Yamaguchi", "Hiroshima"],
                "length": 1,
                "color": "blue",
                "cost": 1,
            },
            {
                "id": 23,
                "cities": ["Shanghai", "Dalian"],
                "length": 4,
                "color": "orange",
                "locomotive": 1,
                "cost": 10,
            },
            {
                "id": 24,
                "cities": ["Shanghai", "Qingdao"],
                "length": 3,
                "color": "grey",
                "cost": 4,
            },
            {
                "id": 25,
                "cities": ["Shanghai", "Matsue"],
                "length": 4,
                "color": "pink",
                "locomotive": 1,
                "cost": 10,
            },
            {
                "id": 26,
                "cities": ["Wakayama", "Takamatsu"],
                "length": 1,
                "color": "yellow",
                "locomotive": 1,
                "cost": 2,
            },
            {
                "id": 27,
                "cities": ["Wakayama", "Osaka"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 28,
                "cities": ["Wakayama", "Shima"],
                "length": 3,
                "color": "green",
                "cost": 4,
            },
            {
                "id": 29,
                "cities": ["Takamatsu", "Okayama"],
                "length": 0,
                "color": "grey",
                "locomotive": 1,
                "cost": 1,
            },
            {
                "id": 30,
                "cities": ["Hiroshima", "Matsue"],
                "length": 2,
                "color": "orange",
                "cost": 2,
            },
            {
                "id": 31,
                "cities": ["Hiroshima", "Okayama"],
                "length": 2,
                "color": "red",
                "cost": 2,
            },
            {
                "id": 32,
                "cities": ["Hiroshima", "Okayama"],
                "length": 2,
                "color": "black",
                "cost": 2,
            },
            {
                "id": 33,
                "cities": ["Okayama", "Osaka"],
                "length": 2,
                "color": "pink",
                "cost": 2,
            },
            {
                "id": 34,
                "cities": ["Okayama", "Osaka"],
                "length": 2,
                "color": "green",
                "cost": 2,
            },
            {
                "id": 35,
                "cities": ["Okayama", "Matsue"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 36,
                "cities": ["Okayama", "Miyazu"],
                "length": 3,
                "color": "white",
                "cost": 4,
            },
            {
                "id": 37,
                "cities": ["Fukuoka", "Yamaguchi"],
                "length": 0,
                "color": "grey",
                "locomotive": 1,
                "cost": 1,
            },
            {
                "id": 38,
                "cities": ["Qingdao", "Seoul"],
                "length": 2,
                "color": "grey",
                "locomotive": 1,
                "cost": 4,
            },
            {
                "id": 39,
                "cities": ["Qingdao", "Dalian"],
                "length": 3,
                "color": "grey",
                "cost": 4,
            },
            {
                "id": 40,
                "cities": ["Qingdao", "Miyazu"],
                "length": 4,
                "color": "green",
                "locomotive": 1,
                "cost": 10,
            },
            {
                "id": 41,
                "cities": ["Dalian", "Seoul"],
                "length": 3,
                "color": "blue",
                "locomotive": 1,
                "cost": 7,
            },
            {
                "id": 42,
                "cities": ["Dalian", "Pyongyang"],
                "length": 5,
                "color": "grey",
                "cost": 10,
            },
            {
                "id": 43,
                "cities": ["Shima", "Tokyo"],
                "length": 5,
                "color": "yellow",
                "locomotive": 1,
                "cost": 15,
            },
            {
                "id": 44,
                "cities": ["Shima", "Nagoya"],
                "length": 1,
                "color": "white",
                "cost": 1,
            },
            {
                "id": 45,
                "cities": ["Shima", "Osaka"],
                "length": 2,
                "color": "blue",
                "cost": 2,
            },
            {
                "id": 46,
                "cities": ["Osaka", "Kyoto"],
                "length": 1,
                "color": "orange",
                "cost": 1,
            },
            {
                "id": 47,
                "cities": ["Osaka", "Kyoto"],
                "length": 1,
                "color": "yellow",
                "cost": 1,
            },
            {
                "id": 48,
                "cities": ["Miyazu", "Seoul"],
                "length": 4,
                "color": "red",
                "locomotive": 1,
                "cost": 10,
            },
            {
                "id": 49,
                "cities": ["Miyazu", "Fukui"],
                "length": 0,
                "color": "grey",
                "locomotive": 1,
                "cost": 1,
            },
            {
                "id": 50,
                "cities": ["Miyazu", "Kyoto"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 51,
                "cities": ["Seoul", "Pyongyang"],
                "length": 3,
                "color": "yellow",
                "locomotive": 1,
                "cost": 7,
            },
            {
                "id": 52,
                "cities": ["Seoul", "Busan"],
                "length": 3,
                "color": "grey",
                "cost": 4,
            },
            {
                "id": 53,
                "cities": ["Nagoya", "Kyoto"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 54,
                "cities": ["Nagoya", "Kyoto"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 55,
                "cities": ["Nagoya", "Fuji"],
                "length": 3,
                "color": "black",
                "cost": 4,
            },
            {
                "id": 56,
                "cities": ["Nagoya", "Fuji"],
                "length": 3,
                "color": "pink",
                "cost": 4,
            },
            {
                "id": 57,
                "cities": ["Nagoya", "Takasaki"],
                "length": 4,
                "color": "red",
                "cost": 7,
            },
            {
                "id": 58,
                "cities": ["Kyoto", "Fukui"],
                "length": 2,
                "color": "blue",
                "cost": 2,
            },
            {
                "id": 59,
                "cities": ["Fukui", "Nagano"],
                "length": 4,
                "color": "black",
                "cost": 7,
            },
            {
                "id": 60,
                "cities": ["Fukui", "Suzu"],
                "length": 3,
                "color": "white",
                "locomotive": 1,
                "cost": 7,
            },
            {
                "id": 61,
                "cities": ["Busan", "Suzu"],
                "length": 3,
                "color": "grey",
                "locomotive": 1,
                "cost": 7,
            },
            {
                "id": 62,
                "cities": ["Busan", "Pyongyang"],
                "length": 3,
                "color": "white",
                "cost": 4,
            },
            {
                "id": 63,
                "cities": ["Fuji", "Tokyo"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 64,
                "cities": ["Fuji", "Tokyo"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 65,
                "cities": ["Fuji", "Takasaki"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 66,
                "cities": ["Tokyo", "Mito"],
                "length": 3,
                "color": "orange",
                "cost": 4,
            },
            {
                "id": 67,
                "cities": ["Tokyo", "Oyama"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 68,
                "cities": ["Tokyo", "Oyama"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 69,
                "cities": ["Tokyo", "Takasaki"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 70,
                "cities": ["Takasaki", "Nagano"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 71,
                "cities": ["Takasaki", "Oyama"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 72,
                "cities": ["Takasaki", "Koriyama"],
                "length": 3,
                "color": "pink",
                "cost": 4,
            },
            {
                "id": 73,
                "cities": ["Nagano", "Koriyama"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 74,
                "cities": ["Nagano", "Koriyama"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 75,
                "cities": ["Nagano", "Niigata"],
                "length": 3,
                "color": "orange",
                "cost": 4,
            },
            {
                "id": 76,
                "cities": ["Nagano", "Suzu"],
                "length": 3,
                "color": "blue",
                "cost": 4,
            },
            {
                "id": 77,
                "cities": ["Suzu", "Pyongyang"],
                "length": 5,
                "color": "green",
                "locomotive": 1,
                "cost": 15,
            },
            {
                "id": 78,
                "cities": ["Suzu", "Niigata"],
                "length": 2,
                "color": "grey",
                "locomotive": 1,
                "cost": 4,
            },
            {
                "id": 79,
                "cities": ["Pyongyang", "Khabarovsk"],
                "length": 3,
                "color": "grey",
                "cost": 4,
            },
            {
                "id": 80,
                "cities": ["Pyongyang", "Vladivostok"],
                "length": 3,
                "color": "red",
                "locomotive": 1,
                "cost": 7,
            },
            {
                "id": 81,
                "cities": ["Pyongyang", "Chongjin"],
                "length": 2,
                "color": "pink",
                "cost": 2,
            },
            {
                "id": 82,
                "cities": ["Mito", "Kaohsiung"],
                "length": 5,
                "color": "blue",
                "locomotive": 1,
                "cost": 15,
            },
            {
                "id": 83,
                "cities": ["Mito", "Sendai"],
                "length": 4,
                "color": "pink",
                "locomotive": 1,
                "cost": 10,
            },
            {
                "id": 84,
                "cities": ["Mito", "Fukushima"],
                "length": 3,
                "color": "red",
                "cost": 4,
            },
            {
                "id": 85,
                "cities": ["Mito", "Oyama"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 86,
                "cities": ["Oyama", "Fukushima"],
                "length": 2,
                "color": "green",
                "cost": 2,
            },
            {
                "id": 87,
                "cities": ["Oyama", "Fukushima"],
                "length": 2,
                "color": "white",
            },
            {
                "id": 88,
                "cities": ["Koriyama", "Fukushima"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 89,
                "cities": ["Koriyama", "Fukushima"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 90,
                "cities": ["Koriyama", "Niigata"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 91,
                "cities": ["Koriyama", "Niigata"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 92,
                "cities": ["Fukushima", "Sendai"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 93,
                "cities": ["Fukushima", "Sendai"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 94,
                "cities": ["Yamagata", "Sendai"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 95,
                "cities": ["Yamagata", "Niigata"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 96,
                "cities": ["Yamagata", "Akita"],
                "length": 3,
                "color": "orange",
                "cost": 4,
            },
            {
                "id": 97,
                "cities": ["Yamagata", "Morioka"],
                "length": 4,
                "color": "green",
                "cost": 7,
            },
            {
                "id": 98,
                "cities": ["Niigata", "Chongjin"],
                "length": 4,
                "color": "yellow",
                "locomotive": 1,
                "cost": 10,
            },
            {
                "id": 99,
                "cities": ["Niigata", "Vladivostok"],
                "length": 4,
                "color": "white",
                "locomotive": 1,
                "cost": 10,
            },
            {
                "id": 100,
                "cities": ["Chongjin", "Vladivostok"],
                "length": 3,
                "color": "grey",
                "cost": 4,
            },
            {
                "id": 101,
                "cities": ["Khabarovsk", "Vladivostok"],
                "length": 2,
                "color": "yellow",
                "cost": 2,
            },
            {
                "id": 102,
                "cities": ["Khabarovsk", "Korsakov"],
                "length": 3,
                "color": "black",
                "cost": 4,
            },
            {
                "id": 103,
                "cities": ["Vladivostok", "Korsakov"],
                "length": 3,
                "color": "pink",
                "locomotive": 1,
                "cost": 7,
            },
            {
                "id": 104,
                "cities": ["Korsakov", "Wakkanai"],
                "length": 3,
                "color": "grey",
                "locomotive": 1,
                "cost": 7,
            },
            {
                "id": 105,
                "cities": ["Wakkanai", "Asahikawa"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 106,
                "cities": ["Wakkanai", "Asahikawa"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 107,
                "cities": ["Wakkanai", "Abashiri"],
                "length": 3,
                "color": "green",
                "locomotive": 1,
                "cost": 4,
            },
            {
                "id": 108,
                "cities": ["Asahikawa", "Sapporo"],
                "length": 1,
                "color": "red",
                "cost": 1,
            },
            {
                "id": 109,
                "cities": ["Asahikawa", "Abashiri"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 110,
                "cities": ["Asahikawa", "Obihiro"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 111,
                "cities": ["Sapporo", "Hakodate"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 112,
                "cities": ["Sapporo", "Hakodate"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 113,
                "cities": ["Sapporo", "Obihiro"],
                "length": 1,
                "color": "black",
                "cost": 1,
            },
            {
                "id": 114,
                "cities": ["Abashiri", "Obihiro"],
                "length": 3,
                "color": "yellow",
                "cost": 4,
            },
            {
                "id": 115,
                "cities": ["Obihiro", "Hakodate"],
                "length": 1,
                "color": "grey",
                "locomotive": 1,
                "cost": 2,
            },
            {
                "id": 116,
                "cities": ["Obihiro", "Hachinohe"],
                "length": 3,
                "color": "pink",
                "locomotive": 1,
                "cost": 7,
            },
            {
                "id": 117,
                "cities": ["Hakodate", "Akita"],
                "length": 4,
                "color": "blue",
                "locomotive": 1,
                "cost": 10,
            },
            {
                "id": 118,
                "cities": ["Hakodate", "Aomori"],
                "length": 0,
                "color": "grey",
                "locomotive": 1,
                "cost": 1,
            },
            {
                "id": 119,
                "cities": ["Hakodate", "Aomori"],
                "length": 0,
                "color": "grey",
                "locomotive": 1,
                "cost": 1,
            },
            {
                "id": 120,
                "cities": ["Aomori", "Akita"],
                "length": 3,
                "color": "red",
                "cost": 4,
            },
            {
                "id": 121,
                "cities": ["Aomori", "Hachinohe"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 122,
                "cities": ["Aomori", "Hachinohe"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 123,
                "cities": ["Akita", "Morioka"],
                "length": 2,
                "color": "black",
                "cost": 2,
            },
            {
                "id": 124,
                "cities": ["Hachinohe", "Morioka"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 125,
                "cities": ["Hachinohe", "Morioka"],
                "length": 1,
                "color": "grey",
                "cost": 1,
            },
            {
                "id": 126,
                "cities": ["Hachinohe", "Sendai"],
                "length": 5,
                "color": "orange",
                "locomotive": 1,
                "cost": 15,
            },
            {
                "id": 127,
                "cities": ["Morioka", "Sendai"],
                "length": 3,
                "color": "blue",
                "cost": 4,
            },
            {
                "id": 128,
                "cities": ["Morioka", "Sendai"],
                "length": 3,
                "color": "yellow",
                "cost": 4,
            },
            {
                "id": 129,
                "cities": ["Kaohsiung", "Taipei"],
                "length": 3,
                "color": "grey",
                "cost": 4,
            },
            {
                "id": 130,
                "cities": ["Kaohsiung", "Shanghai"],
                "length": 4,
                "color": "black",
                "cost": 7,
            },
            {
                "id": 131,
                "cities": ["Taipei", "Busan"],
                "length": 3,
                "color": "orange",
                "locomotive": 1,
                "cost": 7,
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