// recuper l'id dans l'Url
let params = new URLSearchParams(document.location.search);
let id = params.get("id");

var myHeaders = new Headers();

var myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};
// affichage du detail du produit canaper
fetch('http://localhost:3000/api/products/' + id, myInit)
    //.then permet d'obtenir une reponse (une promesse) en.JSON puis apres avoir une reponse data 
    .then(function(response) {
        response.json().then(function(data){
            var section = document.querySelector(".item__img");
            
            var logopng = document.createElement("img");
            logopng.src = data.imageUrl;
            logopng.alt = data.altTxt;

            var h1 = document.querySelector("#title");
            h1.textContent = data.name;

            var price = document.querySelector("#price");
            price.textContent = data.price;

            var description = document.querySelector("#description");
            description.textContent = data.description;

            var select = document.querySelector("#colors");

            // Avec la boucle "for" permet afficher les couleurs du tableau color
            for (var i = 0; i < data.colors.length; i++) {
                var color = document.createElement("option");
                color.value = data.colors[i];
                color.textContent = data.colors[i];
                select.appendChild(color);
            }

            section.appendChild(logopng);

            var boutonpanier = document.getElementById("addToCart");
            boutonpanier.addEventListener("click", function (event) {
                var quantity = document.getElementById("quantity").value
                if( quantity < 1 ){
                alert("La quantité doit être supperieur à 1")
                return false
                }
                alert("Produit ajouter au panier")
                var panier = getPanier();
                var produit = {
                    id: data._id,
                    color: document.getElementById("colors").value,
                    quantity: document.getElementById("quantity").value,
                }
                var canaperbis = false
                panier.forEach(canaper => {
                    if (produit.id == canaper.id && produit.color == canaper.color){

                        canaperbis = true;
                        //parseInt converti en chiffre les elements
                        let newquantity = parseInt(produit.quantity) + parseInt(canaper.quantity);
                        canaper.quantity = newquantity;
                    }
                });

                //si c'est faux on ajoute le produit à la fin du tableau
                if(canaperbis == false){
                    panier.push(produit);
                }
                //met a jour le panier 
                setPanier(panier);

            })
        })
    }) 

    //fetch 
    //comment cree des element html en js ou pk ne pas avoir utiliser innerHTML
    //le locale storage
    //expliquer le code
    //qu'est q'une promesse + asyncrone await/async
    //boucle for/if /else
    //difference entre un var/lets/const
    