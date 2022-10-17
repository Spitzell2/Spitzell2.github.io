let direction = "https://raw.githubusercontent.com/Spitzell2/Spitezll2.github.io/main/words.txt"
let pairOfWords
let count = 0
let englishWords = new Array()
let spanishWords = new Array()
let screenModeBoolean = true
let randomNumber
let correctAnswer = 0
let incorrectAnswer = 0
let totalAnswer = 0

//funcion leer fichero
function read(direction) {

    fetch(direction)
        .then(function (response) {
            switch (response.status) {
                // status "OK"
                case 200:
                    return response.text();
                // status "Not Found"
                case 404:
                    throw response;
            }
        })
        .then(function (template) {
            count = countLines(template, '\n')
            pairOfWords = template.split("\r\n")
            saveList(pairOfWords)

        })
        .catch(function (response) {
            // "Not Found"
            //console.log(response.statusText);
            
        });
}

function saveList(pairOfWords) {
    for (i=0; i<count; i++) {
        englishWords[i] = pairOfWords[i].split(",")[0]
        spanishWords[i] = pairOfWords[i].split(",")[1]
    }
}

function randomWord() {
    randomNumber = Math.floor(Math.random() * count)
    textEng = document.getElementById('englishText')
    textEng.value = englishWords[randomNumber]
}

function revise() {
    textSpa = document.getElementById('spanishText')
    answerBox = document.getElementById('answer')
    console.log(answerBox)
    if(textSpa.value == spanishWords[randomNumber]) {
        correctAnswer++
        totalAnswer++
        answerBox.textContent = "Correctas: " + correctAnswer + "/" + totalAnswer
    } else {
        incorrectAnswer++
        totalAnswer++
        answerBox.textContent = "Correctas: " + correctAnswer + "/" + totalAnswer
    }
    textSpa.value = ""
    randomWord()
}

function countLines(str, sep) {
    const arr = str.split(sep);
    return arr.filter(word => word !== '').length;
}

function darkMode() {
    if (!screenModeBoolean) {
        var element = document.body;
        element.className = "light-mode"
        screenMode.value = "Darkmode"
        screenModeBoolean = true
    } else {
        var element = document.body;
        element.className = "dark-mode"
        screenMode.value = "Lightmode"
        screenModeBoolean = false
    }
}


//window.addEventListener('load', read, false)