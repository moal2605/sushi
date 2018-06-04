var checkboxes = [];
var priceTotalElement = document.getElementById("priceTotal");
var addressElement = document.getElementById("address");

for (i = 1; i < 10; i++) {
    checkboxes.push(document.getElementById("checkbox" + i));
    console.log(document.getElementById("checkbox" + i));
}

var database = firebase.database();

var itemMap = {
    0: ["Nigiri", 30],
    1: ["Maki", 40],
    2: ["Sashimi", 30],
    3: ["Temaki", 50],
    4: ["Umaki", 25],
    5: ["Vårruller", 15],
    6: ["Stekte nudler", 120],
    7: ["Kylling spyd", 45],
    8: ["Fritert scampi", 80]
}

var selectedItems;

for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', bindEvent(i), false);
}

function toggleItem(index) {
    if(selectedItems) {
        if(selectedItems.includes(index))
            remove(selectedItems, index);
        else
            selectedItems.push(index);
    }
    else {
        selectedItems = [index]
    }

    priceTotalElement.innerText = "Pris total: " + getTotal() + "kr";
}

function getTotal() {
    var total = 0;
    for (var i = 0; i < selectedItems.length; i++) {
        total += itemMap[selectedItems[i]][1];
    }
    
    return total;
}

function submitOrder() {
    var address = addressElement.value;
    if(selectedItems) {
        if(address) {
            var itemsString = "";
            for (var i = 0; i < selectedItems.length; i++) {
                itemsString += itemMap[selectedItems[i]][0] + ", ";
            }

            itemsString = itemsString.slice(0, -2);
            var totalPrice = getTotal();

            if(confirm("Er du sikker? Pris total: " + totalPrice + "kr")) {
                // Legger inn bestillingen i databasen
                database.ref('orders').push({
                    address: address,
                    items: itemsString,
                    priceTotal: totalPrice
                }).catch(() => {    
                    alert("En feil oppstod i bestillingen.")
                }).then(() => {
                    alert("Takk for din bestilling!");
                    location.reload();
                });       
            }
        }
        else {
            alert("Vennligst skriv inn leveringsadresse.");
        }
    }
    else
        alert("Velg en eller flere retter, før du kjøper.");
}

function remove(array, element) {
    const index = array.indexOf(element);
    
    if (index !== -1) {
        array.splice(index, 1);
    }
}

function bindEvent(i) {
    return function(){
        toggleItem(i)
    };
 }