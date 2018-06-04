var nameElement = document.getElementById("name");
var emailElement = document.getElementById("email");
var messageElement = document.getElementById("message");

var database = firebase.database();

function submitAndRedirect() {
    var name = nameElement.value;
    var email = emailElement.value;
    var message = messageElement.value;

    if(name && email && message) {
        var success = postMessage(name, email, message);
        if(success) {
            alert("Meldingen har blitt sendt inn. Takk!");
            window.location = "index.html";
        }
        else
            alert("En feil oppstod.");
    }
    else {
        alert("Vennligst fyll inn alle feltene.");
        console.log(email);
    }
}

function postMessage(name, email, message) {
    database.ref('messages').push({
        name: name,
        email: email,
        message: message
    }).catch(() => {
        return false;
    });

    return true;
}