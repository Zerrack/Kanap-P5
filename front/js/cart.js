var panier = getPanier();

var myHeaders = new Headers();

var myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};

async function getcanaper(id) {
}

var section = document.getElementById("cart__items");

panier.forEach(canaper => {
    fetch('http://localhost:3000/api/products/' + canaper.id, myInit)
        .then(function (response) {
            response.json().then(function (data) {

                var infocanaper = getcanaper(canaper.id);
                var article = document.createElement("article");
                article.setAttribute("class", "cart__item");
                article.setAttribute("data-id", canaper.id);
                article.setAttribute("data-color", canaper.colors);

                var div1 = document.createElement("div");
                div1.setAttribute("class", "cart__item__img");

                var img = document.createElement("img")
                img.setAttribute("alt", "img")
                img.src = data.imageUrl

                var div2 = document.createElement("div");
                div2.setAttribute("class", "cart__item__content")

                var div3 = document.createElement("div");
                div3.setAttribute("class", "cart__item__content__description")

                var h2 = document.createElement("h2");
                h2.textContent = data.name

                var p1 = document.createElement("p");
                p1.textContent = canaper.color
                

                var price = document.createElement("p")
                price.textContent = data.price + "€";

                var div4 = document.createElement("div");
                div4.setAttribute("class", "cart__item__content__settings")

                var div5 = document.createElement("div");
                div5.setAttribute("class", "cart__item__content__settings__quantity")

                var p3 = document.createElement("p");
                p3.textContent = "Qté:";

                var input = document.createElement("input");
                input.setAttribute("type", "number");
                input.setAttribute("class", "itemQuantity");
                input.setAttribute("name", "itemQuantity");
                input.setAttribute("min", "1");
                input.setAttribute("max", "100");
                input.setAttribute("value" , canaper.quantity);
                
                var div6 = document.createElement("div");
                div6.setAttribute("class", "cart__item__content__settings__delete")

                var p4 = document.createElement("p");
                p4.setAttribute("class", "deleteItem");
                p4.textContent = "Supprimer"
                

                section.appendChild(article);
                article.appendChild(div1);
                div1.appendChild(img);
                article.appendChild(div2);
                div2.appendChild(div3);
                div3.appendChild(h2);
                div3.appendChild(p1);
                div3.appendChild(price);
                div2.appendChild(div4);
                div4.appendChild(div5);
                div5.appendChild(p3);
                div5.appendChild(input);
                div4.appendChild(div6);
                div6.appendChild(p4)
                
                
                
            })
        })

})

var toto = document.getElementsByClassName("itemQuantity")

for (const input2 of toto) {
    input2.addEventListener("click", function (){
        console.log("bonjours");
    })
    
}
    



