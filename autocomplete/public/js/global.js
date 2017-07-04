function loadWords() {
    //Ruft die Funktion sendRequest mit einer Callback Funktion auf
    //die data.txt ist zusätzlich noch im Hauptordner enthalten
    sendRequest("http://lecture.michaelsattel.de/dhbw/wp/data.txt", checkWord);
}

function sendRequest(url, successCallback) {
    //Erstellt ein neues Request Objekt für eine Verbindung zum Server
    var request = new XMLHttpRequest();
    //Nun wird der aktuelle Zustand abgeprüft
    request.onreadystatechange = function () {
        //Der Server wurde erreicht und der Request abgeschlossen
        if (this.readyState == 4) {
            //Der Http-Statuscode wird überprüft und bestätigt den Erfolg des Request
            if (this.status == 200) {
                //Bekommt den Inhalt des Servers zurück
                var result = this.responseText;
                //SuccessCallback Funktion wird mit dem result aufgerufen
                successCallback(result);
            }
        }
    };
    //Verbindung wird hergestellt
    request.open('GET', url, true);
    //Anfrage wird abgeschickt
    request.send();
}

function checkWord(begriffeJSON) {
    //Trennt das zurückgegebene Text anhand des Komma-Zeichens und wandelt ihn in ein Json Objekt/Array um
    var begriffe = begriffeJSON.split(',');
    console.log(begriffe);
    var searchItem = document.getElementById("word").value;
    searchItem = searchItem.toLowerCase();
    var ergebnisse = document.getElementById("ergebnisse");
    var stripped = "";
    var searcher = document.getElementById("searcher");
    //Funktionsaufruf clearList
    clearList();
    if (searchItem != "") {
        //Fügt beim Searcher ein neues Attribut hinzu: onclick="findWord();"
        searcher.setAttribute("onclick", "findWord();");
        //Setzt den Style cursor des Glyphicons auf pointer
        searcher.style.cursor = "pointer";
        //Schleife iteratiert über Array begriffe
        for (var i = 0; i <= begriffe.length - 1; i++) {
            //Gibt die Position des ersten Treffers zurück
            //Vergleicht die Anfangsbuchstaben von den einzelnen Array Feldern mit dem eingegeben Suchbegriff
            //Wenn es einen Treffer an der nullten Stelle (dem Anfangsbuchstaben) gibt, geht er in die if-Abfrage
            if (begriffe[i].indexOf(searchItem) == 0) {
                //Gibt dem div einen neuen Klassennamen: class="ergebnisse"
                ergebnisse.className = "ergebnisse";
                //Abfrage prüft ob i modulo 2 einen Rest von 0 hat
                if (i % 2 == 0) {
                    stripped = "stripped";
                }
                else{
                    stripped = "";
                }
                /*Füllt den div-Container mit ps mit den Attributen id, class, onclick
                * Der Inhalt wird mit der Funktion setFirstLetterUpper formatiert*/
                ergebnisse.innerHTML += '<p id="' + begriffe[i] + '" class="' + stripped + ' hitItem" onclick="setSearchItem(this.id);">' + setFirstLetterUpper(begriffe[i]) + '</p>';
            }
        }
    }
}

function clearList() {
    var ergebnisse = document.getElementById("ergebnisse");
    //Löscht die Einträge aus dem Container
    ergebnisse.innerHTML = "";
    //Entfernt das Attribute class
    ergebnisse.removeAttribute("class");
}

function setFirstLetterUpper(string) {
    var returnString = "";
    //Schleife iteratiert über die Begriffe
    for (var i = 0; i <= string.length - 1; i++) {
        if (i == 0) {
            //An der ersten Stelle wird der Kleinbuchstabe in einen Großbuchstaben umgewandelt
            returnString += string[i].toUpperCase();
        }
        else {
            //Ansonsten bleiben die Buchstaben klein
            returnString += string[i];
        }
    }
    //Gibt den umgewandelten Begriff zurück zur weiteren Verwendung
    return returnString;
}

function setSearchItem(id) {
    document.getElementById("word").value = setFirstLetterUpper(id);
    clearList();
}

function findWord() {
    var selectedWord = document.getElementById("word").value;
    //Öffnet einen neuen Tab zu einer Suchmaschine (DuckDuckGo) mit dem übergebenen Suchbegriff
    window.open("https://duckduckgo.com/?q=" + selectedWord);
}