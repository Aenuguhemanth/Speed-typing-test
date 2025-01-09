let speedTypingTestEl = document.getElementById("speedTypingTest");
let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let resultEl = document.getElementById("result");
let quoteInputEl = document.getElementById("quoteInput");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let spinnerEl = document.getElementById("spinner");

function randomReq() {
    quoteInputEl.value = "";
    resultEl.textContent = "";
    let options = {
        method: "GET"
    };
    let url = "https://apis.ccbp.in/random-quote";

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.add("d-none");
            speedTypingTestEl.classList.remove("d-none");
            quoteDisplayEl.textContent = jsonData.content;
        });
}

let count = 0;
let setTimer = setInterval(function() {
    timerEl.textContent = count;
    count = count + 1;
}, 1000);
randomReq();

resetBtnEl.onclick = function() {
    speedTypingTestEl.classList.add("d-none");
    spinnerEl.classList.remove("d-none");
    randomReq();
    clearInterval(setTimer);
    let count = 0;
    setTimer = setInterval(function() {
        timerEl.textContent = count;
        count = count + 1;
    }, 1000);
};

submitBtnEl.onclick = function() {
    let quoteInputElVal = quoteInputEl.value;
    let quoteDisplayElVal = quoteDisplayEl.textContent;
    if (quoteInputElVal === quoteDisplayElVal) {
        clearInterval(setTimer);
        let timerElVal = timerEl.textContent;
        resultEl.textContent = "You types in " + timerElVal + " seconds";
    } else {
        resultEl.textContent = "You typed incorrect sentence";
    }
};
