class Prodotto{
    constructor(id, nome, quantita, prezzo, immagine){
        this.id = id;
        this.nome = nome;
        this.quantita = quantita;
        this.prezzo = prezzo;
        this.immagine = immagine;
    }
}

let products = [];
const listaProdotti = document.getElementById('listaProdotti');


products.push(
    new Prodotto(1, "Felpa", 1, 10,"https://m.media-amazon.com/images/I/81xrsp7jleL._AC_UY606_.jpg"),
    new Prodotto(2, "Pantalone", 5, 20, "https://www.tezenis.com/dw/image/v2/BCXQ_PRD/on/demandware.static/-/Sites-TEZ_EC_COM/default/dwff285164/images/1WP11289289-F.jpg?sw=600&sfrm=jpeg")
)

document.addEventListener('DOMContentLoaded', () => {
    let productsJSON = localStorage.getItem('prodotti');
    if(productsJSON != null){
        products = JSON.parse(productsJSON);
    }

    stampaProdotti();

    const button = document.getElementById("add");
    button.addEventListener('click', ()=>{
    let input = document.querySelectorAll("#productForm input");
    let cProdotto = input[0].value.trim();
    let nomeProdotto = input[1].value.trim();
    let quantita = input[2].value.trim();
    let prezzo = input[3].value.trim();
    let immagine = input[4].value.trim();
    if(checkIfExists(cProdotto) == false && cProdotto !== "" && nomeProdotto !== "" && quantita !== "" && prezzo !== "" && immagine !== ""){
        products.push(new Prodotto(cProdotto, nomeProdotto, quantita, prezzo, immagine));
        input[0].value = '';
        input[1].value = '';
        input[2].value = '';
        input[3].value = '';
        input[4].value = '';

        localStorage.setItem('prodotti', JSON.stringify(products));
        stampaProdotti();
    }
    else alert("esiste già un elemento con questo id");
    })
})

function checkIfExists(number){
    for(let i=0; i<products.length; i++){
        if(products[i].id == number){
            return true;
        }
    }
    return false;
}

function stampaProdotti(){
    listaProdotti.innerHTML = "";
    if(products.length == 0){
        let para = document.createElement('tr');
        para.innerHTML = 'Nessun prodotto';
        listaProdotti.appendChild(para);
    }
    for(let i=0; i<products.length; i++){
        let tr = document.createElement("tr");
        tr.innerHTML = "<td>"+products[i].id+"</td>"+
                        "<td>"+products[i].nome+"</td>"+
                        "<td>"+products[i].quantita+"</td>"+
                        "<td>"+products[i].prezzo+"€</td>"+
                        "<td><img src=\""+products[i].immagine+"\"></td>"+
                        "<td><button id=\"rimuovi\"class=\"btn btn-danger\" onclick=\"rimuoviProdotto("+i+")\">X</button></td>"
        listaProdotti.appendChild(tr);
    }
}

function rimuoviProdotto(index){
    products.splice(index,1);
    localStorage.setItem('prodotti', JSON.stringify(products));
    stampaProdotti();
}

function countQuantity(cart){
    let count = 0;
    for(let i=0; i<cart.length; i++){
        count += +(cart[i].quantita);
    }
    return count;
}


