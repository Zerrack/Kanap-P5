let params = new URLSearchParams(document.location.search);
let id = params.get("id");

var myHeaders = new Headers();

var myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};

fetch('http://localhost:3000/api/products/' + id, myInit)
    .then(function (response) {
        response.json().then(function (data) {
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

            for (var i = 0; i < data.colors.length; i++) {
                var color = document.createElement("option");
                color.value = data.colors[i];
                color.textContent = data.colors[i];
                select.appendChild(color);
            }

            section.appendChild(logopng);

            var boutonpanier = document.getElementById("addToCart");
            boutonpanier.addEventListener("click", function (event) {
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

                        let newquantity = parseInt(produit.quantity) + parseInt(canaper.quantity);
                        canaper.quantity = newquantity;
                    }
                });

                if(canaperbis == false){
                    panier.push(produit);
                }

                setPanier(panier);

            })
        })
    }) 