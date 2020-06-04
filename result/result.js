const container = document.getElementById("container")
const INPUTS = document.querySelectorAll(".container > div > p > span");
const confirmPayment = document.getElementById("successful-payment");
document.body.removeChild(confirmPayment);


// ids of spans in result.html have the same name as keys in local storage
for (let i = 0; i < INPUTS.length; i++) {
    let ID = INPUTS[i].id;

    for (let j = 0; j < localStorage.length; j++) {
        if (ID == localStorage.key(j)) {
            INPUTS[i].innerHTML = localStorage.getItem(localStorage.key(j));
        }
    }
}

function showConfirmation() {
    document.body.removeChild(container);
    document.body.appendChild(confirmPayment);

    setTimeout(() => window.document.location = "../index.html", 3000)
}