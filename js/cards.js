let products = [];
let storage = localStorage.getItem('prodotti');
let cart = localStorage.getItem('carrello');
const listaProdotti = document.getElementById('griglia');
let carrello = [];

aggiungiProdotti();

document.addEventListener('DOMContentLoaded', () => {
    creaCard();
    document.getElementById("cart").innerHTML = countQuantity(carrello);
});
console.log(products.length);

function creaCard(){
    if(products.length != 0){
        for(let i=0; i<products.length; i++){
            let carta = document.createElement("div");
            carta.innerHTML =   
                '<div class="carta">'+
                '<div class="card text-center" style="width: 18rem;">'+
                    '<img src="'+products[i].immagine+'" class="card-img-top">'+
                    '<div class="card-body">'+
                     ' <h5 class="card-title">'+products[i].nome+'</h5>'+
                      '<p class="card-text">'+products[i].prezzo+'</p>'+
                      '<div class="d-flex">'+
                      '<input id="'+i+'"type="number" class="quant"></input>'+
                      '<a href="#" class="btn btn-primary" onclick="aggiungiAlCarrello('+i+')">Aggiungi al carrello</a>'+
                      '</div>'+
                    "</div>"+
                  "</div>"+
                "</div>";
           listaProdotti.appendChild(carta);
        }
    }
    else{
        alert("Non ci sono articoli in vendita");
    }
}

function aggiungiProdotti(){
    if(storage != null){
        products = JSON.parse(storage);
    }
    if(cart != null){
        carrello = JSON.parse(cart);
    }
}

function aggiungiAlCarrello(index){
    let quantity = document.getElementById(index).value;
    if(document.getElementById(index).value != ""){
        products[index].quantita = quantity;
        carrello.push(products[index]);
        localStorage.setItem('carrello', JSON.stringify(carrello));
        document.getElementById(index).value = "";
        document.getElementById("cart").innerHTML = countQuantity(carrello);
        console.log(countQuantity(carrello));
    }
    else alert("il campo quantità non può essere vuoto");
}

function countQuantity(cart){
    let count = 0;
    for(let i=0; i<cart.length; i++){
        count += +(cart[i].quantita);
    }
    return count;
}