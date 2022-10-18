class WordType {
    constructor( englishName, totalSpanishName, spanishName) {
        this.englishName = englishName
        this.totalSpanishName = totalSpanishName
        this.spanishName = spanishName
    }
}

let direction = "https://raw.githubusercontent.com/Spitzell2/Spitezll2.github.io/main/words.txt"
let pairOfWords
let count = 0
let screenModeBoolean = false
let randomNumber
let correctAnswer = 0
let incorrectAnswer = 0
let totalAnswer = 0
let lista = new Array()

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
        cont = pairOfWords[i].split(",")[1]
        spanishWords = pairOfWords[i].split(",")[2]
        spanishArray = new Array()
        for (j=0; j<cont; j++) {
            spanishArray[j] = spanishWords.split(":")[j]
        }
        lista[i] = new WordType (
            pairOfWords[i].split(",")[0],
            cont,
            spanishArray
        )
    }
}

function randomWord() {
    randomNumber = Math.floor(Math.random() * count)
    textEng = document.getElementById('englishText')
    textEng.value = lista[randomNumber].englishName
}

function revise() {
    textSpa = document.getElementById('spanishText')
    answerBox = document.getElementById('answer')
    answerBox2 = document.getElementById('answer2')
    if(textSpa.value.toLowerCase() == lista[randomNumber].spanishName[0] && lista[randomNumber].totalSpanishName > 0) {
        correctAnswer++
        totalAnswer++
        answerBox.textContent = "Correctas: " + correctAnswer + "/" + totalAnswer
        answerBox2.textContent = ""
    } else if(textSpa.value.toLowerCase() == lista[randomNumber].spanishName[1] && lista[randomNumber].totalSpanishName > 1){
        correctAnswer++
        totalAnswer++
        answerBox.textContent = "Correctas: " + correctAnswer + "/" + totalAnswer
        answerBox2.textContent = ""
    } else if (textSpa.value.toLowerCase() == lista[randomNumber].spanishName[2] && lista[randomNumber].totalSpanishName > 2){
        correctAnswer++
        totalAnswer++
        answerBox.textContent = "Correctas: " + correctAnswer + "/" + totalAnswer
        answerBox2.textContent = ""
    } else {
        incorrectAnswer++
        totalAnswer++
        answerBox.textContent = "Correctas: " + correctAnswer + "/" + totalAnswer
        randomNumber2 = Math.floor(Math.random() * lista[randomNumber].totalSpanishName)
        console.log(lista[randomNumber].totalSpanishName)
        console.log(randomNumber2)
        answerBox2.textContent = lista[randomNumber].englishName + " --> "+ lista[randomNumber].spanishName[randomNumber2]
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