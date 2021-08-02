let carteAttualiP = document.getElementById("card-Player")
let totalePlayer = document.getElementById("totalePlayer")
let carteAttualiB = document.getElementById("card-Bank")
let totaleBanco = document.getElementById("totaleBank")
let buttonYes = document.querySelector("#yes");
let buttonNo = document.querySelector("#no");
buttonYes.style.display = "none";
buttonNo.style.display = "none";
let daiCarte = document.querySelector("#daiCarte");
let message = document.getElementById("messaggio");
let punteggio = document.getElementById("punteggio");
let giocatore = {
    partiteVinte: 0,
    totaleCash: 100,
}
let cartePlayer = []
let carteBanco = [newCard(), newCard()];
let totaleA = cartePlayer[0] + cartePlayer[1];
let totaleB = carteBanco[0] + carteBanco[1];
let totale = 100;
let isAlive = true;
let isBlackJack = false;
let vinto = false;

function newCard() {
    let carta = Math.floor(Math.random() * (13 - 1) + 1)
    if (carta > 10) {
        return 10
    } else if (carta === 1) {
        return 11
    } else { return carta };

};

function punti() {
    if (vinto == true) {
        totale += 10;
        giocatore.totaleCash = totale;
        punteggio.innerText = giocatore.totaleCash;
    } else {
        totale -= 10;
        giocatore.totaleCash = totale;
        if (giocatore.totaleCash <= 0) {
            punteggio.innerText = ("HAI FINITO IL DENARO! PER ")
            buttonYes.style.display = "none";
            buttonNo.style.display = "none";
            totaleA = 0;
            totaleB = 0;
        } else { punteggio.innerText = giocatore.totaleCash; }
    }
}

function btn() {
    buttonYes.style.display = "none";
    buttonNo.style.display = "none";

}

function gameIsAlive() {
    if (isAlive === true) {
        btn();
        message.innerText = (" ")
        daiCarte.style.display = "block";
        cartePlayer = [];
        carteBanco = [];
        totaleA = 0;
        totaleB = 0;

        punteggio.innerText = giocatore.totaleCash;
        carteAttualiB.innerText = ("");
        carteAttualiP.innerText = ("Non hai carte \n " +
            cartePlayer);
        totalePlayer.innerText = (" ");
        totaleBanco.innerText = (" ");


    } else {
        message.innerText("gioco finito")
        buttonYes.style.display = "none";
        buttonNo.style.display = "none";
        totaleA = 0;
        totaleB = 0;


    }
}
//Avvia nuova partita
function nuovaPartita() {
    isAlive = true;
    gameIsAlive();
}


function analisi() {
    if (totaleA > 21) {
        buttonYes.style.display = "none";
        buttonNo.style.display = "none";
        message.innerText = ("Partita terminata! Il banco vince");
        totalePlayer.innerText = ("Il tuo totale è " + totaleA + " ed è maggiore di 21");
        isAlive = false;
        gameIsAlive();
    } else if (totaleA === 21) {
        buttonYes.style.display = "none";
        buttonNo.style.display = "none";
        message.innerText = ("BLACK JACK! Tocca al Banco");
        totalePlayer.innerText = ("Il tuo totale è " + totaleA);
        isBlackJack = true;
        carteAlBanco();
    } else {
        totalePlayer.innerText = ("Il tuo totale è " + totaleA + " \nVuoi un'altra carta?")
        buttonYes.style.display = 'block';
        buttonNo.style.display = 'block';

    }
}
//distribuisce le carte al giocatore
function carteGiocatore1() {
    cartePlayer = [newCard(), newCard()];
    carteAttualiP.innerText = ("Ecco le tue carte \n " +
        cartePlayer[0] + "   " + cartePlayer[1])
    totaleA = cartePlayer[0] + cartePlayer[1];
    carteBanco = [];
    totaleB = 0;
    totaleBanco.innerText = totaleB;
    carteAttualiB.innerText = carteBanco;

    analisi();

}

// distribuisce le nuuove carte al giocatore
function nuovaCarta() {
    let terzaCarta = newCard();
    cartePlayer.push(terzaCarta);
    carteAttualiP.innerText = ("Ecco le tue carte \n " + cartePlayer);
    totaleA += terzaCarta;
    totalePlayer.innerText = totaleA;
    analisi();

}

//distribuisce le carte al banco
function carteAlBanco() {

    console.log(carteBanco);
    carteAttualiB.innerText = ("Ecco le carte del banco \n " +
        carteBanco[0] + "   " + carteBanco[1])
    totaleBanco.innerText = totaleB;
    while (totaleB < totaleA) {
        let terzaCarta = newCard();
        carteBanco.push(terzaCarta);
        carteAttualiB.innerText = ("Ecco le carte del banco\n " + carteBanco);
        totaleB += terzaCarta;
        totaleBanco.innerText = ("IL BANCO HA TOTALIZZATO " + totaleB);

    }
    if (totaleB > 21) {
        message.innerText = ("COMPLIMENTI HAI VINTO! IL BANCO HA SBALLATO ")
        vinto = true;
        punti();
        isAlive = false;
        btn();
    } else if (totaleB >= totaleA) {
        message.innerText = ("MI DISPIACE, QUESTA VOLTA HAI PERSO! ")
        vinto = false;
        punti();
        isAlive = false;
        btn();
    }
}