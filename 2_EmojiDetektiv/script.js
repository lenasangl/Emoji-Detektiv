"use strict";

// Punktestand zu Beginn auf 0 setzen:
let punkte = 0;

// für den Modus alle Fragen
let alleFragenListe = [];
let aktuellerAlleFragenIndex = 0;
let aktuelleAlleFrage;

// Variable für den Timer setzen
let TimerExpertenmodus;


// MÖGLICHE RÄTSEL DIE DER SPIELER BEKOMMEN KANN WENN ER EASY WÄHLT:
const easyFragen = [
    ["🍕📦🛵", "pizzalieferung"],
    ["🎬🍿👀", "kinofilm"],
    ["💤🌙", "nacht"],
    ["🎉🎂🎁", "geburtstag"],
    ["👟🎵🕺", "tanzen"],
    ["📱💬❤️", "liebesnachricht"],
    ["🐱🧶", "katzenspielzeug"],
    ["🎮🕹️👾", "videospiel"],
    ["🚗🛣️", "autofahrt"],
    ["🧠⚡", "geistesblitz"],
    ["🍎📱", "apple"],
    ["🐶🐾", "hundepfoten"],
    ["🛏️💤", "schlafen"],
    ["🎓🏫", "Hochschule"],
    ["🎉🎂", "geburtstag"],
    ["🍟🍔🥤", "fast food"],
    ["📚🧠", "lernen"],
    ["🎮🕹️", "videospiel"],
    ["☀️🏖️🍦", "sommerurlaub"],
    ["🦁👑", "könig der löwen"],
    ["🚿🧼🧽", "duschen"],
    ["📱💬", "nachricht"],
    ["🐱🐾", "katzenpfoten"],
    ["🌧️☔", "regen"],
    ["📷😄", "selfie"],
    ["🍫🍪", "naschen"],
    ["💡🤔", "idee"],
    ["🕶️☀️", "sonnenbrille"],
    ["🍿🎬", "kino"]
];

// MÖGLICHE RÄTSEL DIE DER SPIELER BEKOMMEN KANN WENN ER EXPERTE WÄHLT:
const expertenFragen = [
    ["🌧️☂️📖", "regenwetterlektüre"],
    ["📦🛒💳", "onlinebestellung"],
    ["🧠⚡", "geistesblitz"],
    ["💡🔋⚙️", "technische Erfindung"],
    ["🎓📚✏️", "abschlussprüfung"],
    ["🖼️🎨🧑‍🎨", "kunstausstellung"],
    ["🧬🔬🧪", "genforschung"],
    ["🧊🐧❄️", "antarktis"],
    ["🛫🌆🛬", "städtereise"],
    ["🌍📷✈️", "weltreise"],
    ["🚀🪐👽", "weltraumabenteuer"],
    ["🚗💨🍔🛣️", "roadtrip"],
    ["🐍📦", "python package"],
    ["🎭🕰️🔁", "zeitreise"],
    ["🚴‍♀️🏞️☀️", "fahrradtour"],
    ["🧳🗺️🌍", "weltreise"],
    ["🚦🏎️⏱️", "autorennen"],
    ["💻⚠️📉", "systemabsturz"],
    ["📚👻🌙", "gruselgeschichte"]
];

//------------------------------------Buttons zur Wahl des Schwierigkeitsgrads----------------------------------------------------------------

// EVENTLISTENER FÜR DEN BUTTON EASY
document.getElementById("ButtonEasy").addEventListener("click", ModeEasy);

// EVENTLISTENER FÜR DEN BUTTON EXPERTE
document.getElementById("ButtonExperte").addEventListener("click", ModeExperte);

//EVENTLISTENER FÜR DEN BUTTON ALLE FRAGEN
document.getElementById("ButtonAlleFragen").addEventListener("click", ModeAlleFragen);



//------------------------------------Mode Easy----------------------------------------------------------------

// FUNKTION WENN DER SPIELER DEN MODE EASY AUSWÄHLT
function ModeEasy () {
Spielstarten(NeuesEasyRaetselAnzeigen);
document.getElementById("pruefen").onclick = function () {
    Antwortpruefen(() => aktuelleFrageEasy, NeuesEasyRaetselAnzeigen);
};
}

let aktuelleFrageEasy;


//------------------------------------Mode Experte----------------------------------------------------------------

// FUNKTION WENN DER SPIELER DEN MODE EXPERTE AUSWÄHLT
function ModeExperte () {
    Spielstarten(NeuesExpertenRaetselAnzeigenMitTimer);
    document.getElementById("pruefen").onclick = function () {
        clearTimeout(TimerExpertenmodus); //stoppt den Timer wenn Antwort kommt
        Antwortpruefen(() => aktuelleFrageExperte, NeuesExpertenRaetselAnzeigenMitTimer);
    };
}

let aktuelleFrageExperte;


//------------------------------------FUNKTION SPIELSTARTEN----------------------------------------------------------------
function Spielstarten(callback) {
    //Buttons zur Wahl des Schwierigkeitsgrades ausblenden
    document.getElementById("Mode").style.display = "none";
    //den eigentlichen Spielbereich einblenden
    document.getElementById("gameDiv").style.display = "block";
    callback();
}



//------------------------------------FUNKTION NEUESRAETSELANZEIGEN----------------------------------------------------------------
function NeuesRaetselAnzeigen(fragenArray, setAktuelleFrage) {

    if (fragenArray === expertenFragen) {
        // Zufälliges Rätsel auswählen
        const zufallIndex = Math.floor(Math.random() * fragenArray.length); //Math.floor rundet Zahl ab, die Zufallszahl
        // von Math.random wird mal der Länge des Arrays gerechnet damit auch wirklich ein Element aus dem Array ausgewählt werden kann
        const zufallsFrage = fragenArray[zufallIndex];
        setAktuelleFrage(zufallsFrage);

            document.getElementById("Frage").innerText = zufallsFrage[0];
            // Eingabe und Feedback zurücksetzen
            document.getElementById("antwort").value = "";
            document.getElementById("feedback").innerText = "";
    } else{
        // Zufälliges Rätsel auswählen
        const zufallIndex = Math.floor(Math.random() * fragenArray.length); //Math.floor rundet Zahl ab, die Zufallszahl
        // von Math.random wird mal der Länge des Arrays gerechnet damit auch wirklich ein Element aus dem Array ausgewählt werden kann
        const zufallsFrage = fragenArray[zufallIndex];
        setAktuelleFrage(zufallsFrage);

        document.getElementById("Frage").innerText = zufallsFrage[0];
        // Eingabe und Feedback zurücksetzen
        document.getElementById("antwort").value = "";
        document.getElementById("feedback").innerText = "";
    }
}


//------------------------------------FUNKTION ANTWORTPRUEFEN----------------------------------------------------------------

// "Antwort prüfen"-Button
function Antwortpruefen(getAktuelleFrage, neueFrageCallback){
    const userInput = document.getElementById("antwort").value;
    const feedbackEL = document.getElementById("feedback");
    const aktuelleFrage = getAktuelleFrage();

    if (userInput.toLowerCase() === aktuelleFrage[1].toLowerCase()) {
        feedbackEL.innerText = "✅ Richtig!";
        punkte++; //damit man Punkt bekommt wenn richtig
        PunkteAktualisieren(); //damit Punktestand aktualisiert wird
    } else {
        feedbackEL.innerText = "❌ Leider falsch!";
    }

    // Timer für die Anzeige vom Feedback
    setTimeout(() => {
        //neues Rätsel wird wieder angezeigt
        neueFrageCallback();
    }, 1500); // 1,5 Sekunden
}


//------------------------------------NEUES RÄTSEL----------------------------------------------------------------
function NeuesEasyRaetselAnzeigen() {
    NeuesRaetselAnzeigen(easyFragen, frage => aktuelleFrageEasy = frage);
}

function NeuesExpertenRaetselAnzeigenMitTimer() {
    NeuesRaetselAnzeigen(expertenFragen, frage => {
        aktuelleFrageExperte = frage;

        //Timer starten
        TimerExpertenmodus = setTimeout(() => {
        document.getElementById("feedback").innerText = "Die Zeit ist abgelaufen!";

        //macht dann wie bei dem Feedback auf die Antwort kurze Pause bis nächste Frage kommt
        setTimeout(() => {
            NeuesExpertenRaetselAnzeigenMitTimer();
        }, 1500);
        }, 10000); //10 Sekunden
    });}

//------------------------------------PUNKTESTAND AKTUALISIEREN----------------------------------------------------------------
function PunkteAktualisieren() {
    document.getElementById("punkteAnzeige").innerText = "Punkte: " +punkte; // gibt uns die aktuellen Punkte
}




//------------------------------------Mode Alle Fragen----------------------------------------------------------------
function ModeAlleFragen() {
    // das .concat sollte die beiden Arrays "zusammeführen"
    alleFragenListe = easyFragen.concat(expertenFragen);

    // Index zurücksetzen
    aktuellerAlleFragenIndex = 0;

    // Spielbereich zeigen
    Spielstarten(() => zeigeNaechsteFrageAusAlle());

    document.getElementById("pruefen").onclick = function () {
        Antwortpruefen(() => aktuelleAlleFrage, zeigeNaechsteFrageAusAlle);
    };
}

function zeigeNaechsteFrageAusAlle() {
    if (aktuellerAlleFragenIndex < alleFragenListe.length) {
        aktuelleAlleFrage = alleFragenListe[aktuellerAlleFragenIndex];
        aktuellerAlleFragenIndex++;
        document.getElementById("Frage").innerText = aktuelleAlleFrage[0];
        document.getElementById("antwort").value = "";
        document.getElementById("feedback").innerText = "";
    } else {
        // Spiel vorbei
        document.getElementById("Frage").innerText = "🎉 Du hast alle Fragen beantwortet! 🎉";
        document.getElementById("antwort").style.display = "none";
        document.getElementById("pruefen").style.display = "none";
        document.getElementById("feedback").style.display = "none";
    }
}




//------------------------------------Button - zurück zur Wahl des Schwierigkeitsgrades----------------------------------------------------------------
document.getElementById("ZurueckZuMode").addEventListener("click", () => {
    // damit Timer vom andern Spiel davor nicht genommen wird
    clearTimeout(TimerExpertenmodus);

    // nicht gebrauchtes ausblenden
    document.getElementById("gameDiv").style.display = "none";
    document.getElementById("Mode").style.display = "block";

    // alles zurücksetzen damit Spiel neu begonnen werden kann
    document.getElementById("antwort").style.display = "inline";
    document.getElementById("pruefen").style.display = "inline";
    document.getElementById("feedback").style.display = "block";
    document.getElementById("antwort").value = "";
    document.getElementById("feedback").innerText = "";

    // Punktestand wieder 0
    punkte = 0;
    PunkteAktualisieren();

    // damit von den Fragen nichts übernommen wird
    aktuelleFrageEasy = null;
    aktuelleFrageExperte = null;
    aktuelleAlleFrage = null;
    aktuellerAlleFragenIndex = 0;

    // Prüfen-Button - null
    document.getElementById("pruefen").onclick = null;
});









//URSPRÜNGLICHER CODE:
/*
// Fragenformat: [Emoji-Frage, Lösung]
const fragen = [
    ["🚗💨🍔🛣️", "roadtrip"],
    ["🐍📦", "python package"],
    ["🧠⚡", "geistesblitz"]
];

let aktuelleFrage = fragen[2];

const frageEl = document.getElementById("frage");
frageEl.innerText = aktuelleFrage[0]; // Zeigt Emojis an

document.querySelector("#pruefen").onclick = function() {
    const userInput = document.querySelector("#antwort").value;

    if (userInput == aktuelleFrage[1]) {
        document.getElementById("feedback").innerText = "✅ Richtig!";
    } else {
        document.getElementById("feedback").innerText = "❌ Leider falsch!";
    }
};*/



// KOMMENTIERUNG DER GEFUNDENEN FEHLER - AUFGABE 1:

//Fehler 1:
// const frageEl = document.getElementByID("frage"); --> const frageEl = document.getElementById("frage");
// weil bei getElementById die Groß- und Kleinschreibung wichtig ist

//Fehler 2:
//let aktuelleFrage = fragen[3]; --> let aktuelleFrage = fragen[2];
// weil mehrdimensionales Array immer bei 0 zum Zählen beginnt. In diesem Fall haben wir 3 "Zeilen" (0, 1, 2) und somit gibt es 3 nicht

//Fehler 3:
// document.querySelector("#pruefen").onClick = function() { --> document.querySelector("#pruefen").onclick = function() {
// Groß- und Kleinschreibung ist wichtig damit js weis was passieren soll
