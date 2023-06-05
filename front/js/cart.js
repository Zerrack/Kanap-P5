// funtion asynchrone qui fait appelle a quantitytotal + description prix total au chargement du script et away est une promesse
(async () => {
  quantitytotal();
  await prixtotal();
})();
//variable permetant des recuperer des element dans le panier
var panier = getPanier();

var myHeaders = new Headers();

var myInit = {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "default",
};

var section = document.getElementById("cart__items");

//ForEach permet d'exécuter des élément du tableau panier
panier.forEach((canaper) => {
  // affichage du detail du produit canaper
  fetch("http://localhost:3000/api/products/" + canaper.id, myInit).then(
    function (response) {
      response.json().then(function (data) {
        var article = document.createElement("article");
        article.setAttribute("class", "cart__item");
        article.setAttribute("data-id", canaper.id);
        article.setAttribute("data-color", canaper.color);

        var div1 = document.createElement("div");
        div1.setAttribute("class", "cart__item__img");

        var img = document.createElement("img");
        img.setAttribute("alt", "img");
        img.src = data.imageUrl;

        var div2 = document.createElement("div");
        div2.setAttribute("class", "cart__item__content");

        var div3 = document.createElement("div");
        div3.setAttribute("class", "cart__item__content__description");

        var h2 = document.createElement("h2");
        h2.textContent = data.name;

        var p1 = document.createElement("p");
        p1.textContent = canaper.color;

        var price = document.createElement("p");
        price.textContent = data.price + "€";

        var div4 = document.createElement("div");
        div4.setAttribute("class", "cart__item__content__settings");

        var div5 = document.createElement("div");
        div5.setAttribute("class", "cart__item__content__settings__quantity");

        var p3 = document.createElement("p");
        p3.textContent = "Qté:";
        
        var input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("class", "itemQuantity");
        input.setAttribute("name", "itemQuantity");
        input.setAttribute("min", "1");
        input.setAttribute("max", "100");
        input.setAttribute("value", canaper.quantity);
        input.addEventListener("change", function () {
          updateQuantity(canaper.id, input.value, canaper.color);
        })

        var div6 = document.createElement("div");
        div6.setAttribute("class", "cart__item__content__settings__delete");

        var p4 = document.createElement("p");
        p4.addEventListener("click", function (e) {
          deleteitem(e, canaper.id, canaper.color,)
        })
        p4.setAttribute("class", "deleteItem");
        p4.textContent = "Supprimer";

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
        div6.appendChild(p4);
      });
    }
  );
});

// Function deleteitem permet retire element de mon panier
function deleteitem(e, id, color) {
  var panier = getPanier();
  //forEach permet d'exécuter des élément du tableau panier
  panier.forEach((canaper, index) => {
    if (id == canaper.id) {
      panier.splice(index, 1)
    }
    //met a jour le panier
    setPanier(panier);
    //retire la parti HTML du panier
    e.target.parentNode.parentNode.parentNode.parentNode.remove()
    //met a jour quantitytotal
    quantitytotal()
    //met a jour le prixtotal 
    prixtotal()
  })
}
// Function updateQuantity permet mettre a jour la quantité de mon panier
function updateQuantity(id, value, color) {
  //forEach permet d'exécuter des élément du tableau panier
  panier.forEach((canaper) => {
    if (id == canaper.id && color == canaper.color) {
      // recuperation de la nouvelle quantité
      let newquantity = parseInt(value);
      canaper.quantity = newquantity;
      setPanier(panier);
      //met a jour quantitytotal
      quantitytotal()
      //met a jour le prixtotal 
      prixtotal()
    }
  });
}
// Function quantitytotal permet d'avoir la quantité total dans le panier
function quantitytotal() {
  var panier = getPanier();
  var quantitecanape = 0;
  //forEach permet recuperer la quantité des éléments de mon panier pour les additionner
  panier.forEach((canaper) => {
    quantitecanape = parseInt(canaper.quantity) + quantitecanape;
  });
  // Ajout de la nouvelle quantité à l'endroit prévu dans le HTML
  var nombretotal = document.querySelector("#totalQuantity");
  nombretotal.textContent = quantitecanape;
}

// Function prixtotal permet afficher le prix total du panier 
function prixtotal() {
  var panier = getPanier();
  // fecth permet de recuperer les produit de l'API
  fetch("http://localhost:3000/api/products", myInit).then(
    function (response) {
      response.json().then(function (data) {
        var prixtotal = 0;
        //On recupere le prix de total de chaque élements de mon panier
        panier.forEach((canaper) => {
          var canaperApi = data.find((elem) => {
            return elem._id == canaper.id;
          });
          //On multiplie "canaper.quantity" avec "canaperApi.price" et on addition "prixtotal" pour avoir le prix total 
          prixtotal = parseInt(canaper.quantity) * parseInt(canaperApi.price) + prixtotal;
        });
        //On ajoute le prix total a l'endroit prevu dans le HTML 
        var prixtotalhtml = document.querySelector("#totalPrice");
        prixtotalhtml.textContent = prixtotal;
      });
    })
}

// Ajout d'une valeur de l'utilisateur 
let form = document.querySelector(".cart__order__form");
form.addEventListener('submit', function (e) {
  e.preventDefault();
  var firstName = document.getElementById("firstName").value
  var lastName = document.getElementById("lastName").value
  var address = document.getElementById("address").value
  var city = document.getElementById("city").value
  var email = document.getElementById("email").value

// Regex permet de tester les combinaison de caractères 
  if (nameReg.test(firstName) && nameReg.test(lastName) && adressReg.test(address) && cityreg.test(city) && emailReg.test(email)) {
    var contact = new (Object);
    contact.firstName = prenom;
    contact.lastName = nom;
    contact.address = adresse;
    contact.city = ville;
    contact.email = email;

    var products = [];
    panier.forEach(canaper => {
      products.push(canaper.id)

      var requete = {
        method: "POST",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
      };

      //J'envoi ma commande avec mon API
      fetch('http://localhost:3000/api/products/order/', {
        method: 'POST',
        body:JSON.stringify({contact,products }),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      })
        //.then renvoie orderId dans l'URL
        .then(orderId =>{
          orderId.json().then(function(data){
            window.location.href='confirmation.html?order='+ data.orderId
          })
        })
    });
  }
})

//Regex critère de validation
var cityreg = new RegExp(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/);
var adressReg = new RegExp(/^.*?\s[N]{0,1}([-a-zA-Z0-9]+)\s*\w*$/);
var nameReg = new RegExp(/^[0-9a-zA-Z_.+-]*(?:[a-zA-Z][a-zA-Z_.+-]*){2,}$/);
var emailReg = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

// Permet de tester les regex si cest true et si c'est False indique une erreur
var prenom = document.querySelector('#firstNameErrorMsg');
form.firstName.addEventListener('change', function (e) {
  var value = e.target.value;
  if (nameReg.test(value)) {
    prenom.innerHTML = '';
  } 
  else {
    prenom.innerHTML = 'Champ invalide, veuillez vérifier votre prénom.';
  }
});

// Permet de tester les regex si cest true et si c'est False indique une erreur
var nom = form.lastName.nextElementSibling;
form.lastName.addEventListener('change', function (e) {
  var value = e.target.value;
  if (nameReg.test(value)) {
    nom.innerHTML = '';
  } 
  else {
    nom.innerHTML = 'Champ invalide, veuillez vérifier votre nom.';
  }
});

// Permet de tester les regex si cest true et si c'est False indique une erreur
var adresse = document.querySelector('#addressErrorMsg');
form.address.addEventListener('change', function (e) {
  var value = e.target.value;
  if (adressReg.test(value)) {
    adresse.innerHTML = '';
  } 
  else {
    adresse.innerHTML = 'Champ invalide, veuillez vérifier votre adresse postale.';
  }
});

// Permet de tester les regex si cest true et si c'est False indique une erreur
var ville = document.querySelector('#cityErrorMsg');
form.city.addEventListener('change', function (e) {
  var value = e.target.value;
  if (cityreg.test(value)) {
    ville.innerHTML = '';
  } 
  else {
    ville.innerHTML = 'Champ invalide, veuillez vérifier votre ville.';
  }
});

// Permet de tester les regex si cest true et si c'est False indique une erreur
var email = document.querySelector('#emailErrorMsg');
form.email.addEventListener('change', function (e) {
  var value = e.target.value;
  if (emailReg.test(value)) {
    email.innerHTML = '';
  } 
  else {
    email.innerHTML = 'Champ invalide, veuillez vérifier votre adresse email.';
  }
});

//fetch 
//funtion asyncrone
//les conditions
//for foreach
//localestorage
//regex
//methode post / get 
//revoir tout code
//.then
//metode post
