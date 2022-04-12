let carrello = [];
let storage = localStorage.getItem('carrello');
const listaProdotti = document.getElementById('listaCarrello');

function aggiungiProdotti(){
    if(storage != null){
        carrello = JSON.parse(storage);
    }
}
aggiungiProdotti();
console.log(carrello);

document.addEventListener('DOMContentLoaded', () => {
    creaCarrello();
});

function creaCarrello(){
    if(carrello.length != 0){
        for(let i=0; i<carrello.length; i++){
            let elemento = document.createElement("tr");
            elemento.innerHTML = 
            '<td><img src="'+carrello[i].immagine+'"></td>'+
            '<td>'+carrello[i].nome+'</td>'+
            '<td>'+carrello[i].quantita * carrello[i].prezzo+'</td>'+
            '<td>'+carrello[i].quantita+'</td>';
            listaProdotti.appendChild(elemento);
        }
        
    }
}