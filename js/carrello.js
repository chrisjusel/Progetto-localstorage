let carrello = [];
let storage = localStorage.getItem('carrello');
const listaProdotti = document.getElementById('listaCarrello');


aggiungiProdotti();

document.addEventListener('DOMContentLoaded', () => {
    creaCarrello();
});

function creaCarrello(){
    listaProdotti.innerHTML = "";
    let tot = 0;
    if(carrello.length == 0){
        let para = document.createElement('tr');
        para.innerHTML = 'Nessun prodotto';
        listaProdotti.appendChild(para);
    }
    if(carrello.length != 0){
        for(let i=0; i<carrello.length; i++){
            let elemento = document.createElement("tr");
            elemento.innerHTML = 
            '<td><img src="'+carrello[i].immagine+'"></td>'+
            '<td>'+carrello[i].nome+'</td>'+
            '<td>'+carrello[i].quantita * carrello[i].prezzo+'</td>'+
            '<td>'+carrello[i].quantita+'</td>'+
            '<td><button class="btn btn-danger"onclick="rimuoviSingolo('+i+')">Rimuovi uno</td>'+
            '<td><button class="btn btn-danger"onclick="rimuovi('+i+')">Rimuovi</td>';
            listaProdotti.appendChild(elemento);
            tot += carrello[i].quantita * carrello[i].prezzo;
            
        }
        document.getElementById('tot').innerHTML = "TOTALE: "+tot+"€";
    }
}

function aggiungiProdotti(){
    if(storage != null){
        carrello = JSON.parse(storage);
    }
}

function rimuoviSingolo(index){
    if(carrello[index].quantita-1 != 0){
        carrello[index].quantita -= 1;
        localStorage.setItem('carrello', JSON.stringify(carrello));
        creaCarrello()
    }
    else{
        carrello.splice(index, 1)
        localStorage.setItem('carrello', JSON.stringify(carrello));
        creaCarrello()
    }
}

function rimuovi(index){
    carrello.splice(index, 1)
    localStorage.setItem('carrello', JSON.stringify(carrello));
    creaCarrello()
}