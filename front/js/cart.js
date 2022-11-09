(async () => {
  quantitytotal();
  await prixtotal();
})();

var panier = getPanier();

var myHeaders = new Headers();

var myInit = {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "default",
};

async function getcanaper(id) { }

var section = document.getElementById("cart__items");

panier.forEach((canaper) => {
  fetch("http://localhost:3000/api/products/" + canaper.id, myInit).then(
    function (response) {
      response.json().then(function (data) {
        var infocanaper = getcanaper(canaper.id);
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

function deleteitem(e, id, color) {
  var panier = getPanier();
  panier.forEach((canaper, index) => {
    if (id == canaper.id) {
      panier.splice(index, 1)
    }
    setPanier(panier);
    e.target.parentNode.parentNode.parentNode.parentNode.remove()
    quantitytotal()
    prixtotal()
  })
}

function updateQuantity(id, value, color) {
  panier.forEach((canaper) => {
    if (id == canaper.id && color == canaper.color) {
      let newquantity = parseInt(value);
      canaper.quantity = newquantity;
      setPanier(panier);
      quantitytotal()
      prixtotal()
    }
  });
}
function quantitytotal() {
  var panier = getPanier();
  var quantitecanape = 0;
  panier.forEach((canaper) => {
    quantitecanape = parseInt(canaper.quantity) + quantitecanape;
  });
  var nombretotal = document.querySelector("#totalQuantity");
  nombretotal.textContent = quantitecanape;
}

function prixtotal() {
  var panier = getPanier();
  fetch("http://localhost:3000/api/products", myInit).then(
    function (response) {
      response.json().then(function (data) {
        var prixtotal = 0;
        panier.forEach((canaper) => {
          var canaperApi = data.find((elem) => {
            return elem._id == canaper.id;
          });
          prixtotal = parseInt(canaper.quantity) * parseInt(canaperApi.price) + prixtotal;
        });
        var prixtotalhtml = document.querySelector("#totalPrice");
        prixtotalhtml.textContent = prixtotal;
      });
    })
}

let form = document.querySelector(".cart__order__form");
form.addEventListener('submit', function (e) {
  e.preventDefault();
  var firstName = document.getElementById("firstName").value
  var lastName = document.getElementById("lastName").value
  var address = document.getElementById("address").value
  var city = document.getElementById("city").value
  var email = document.getElementById("email").value

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

      fetch('http://localhost:3000/api/order', {
        method: 'POST',
        mode: 'cors',
        body:JSON.stringify({ "contact": contact, "products": products }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        
      })
        .then(data => {
          console.log(data)
        })

    });

  }
  // avec mon object et mon array l'envoyer dans la requete post 
})

var cityreg = new RegExp(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/);
var adressReg = new RegExp(/^.*?\s[N]{0,1}([-a-zA-Z0-9]+)\s*\w*$/);
var nameReg = new RegExp(/^[0-9a-zA-Z_.+-]*(?:[a-zA-Z][a-zA-Z_.+-]*){2,}$/);
var emailReg = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

var prenom = document.querySelector('#firstNameErrorMsg');
form.firstName.addEventListener('change', function (e) {
  var value = e.target.value;
  if (nameReg.test(value)) {
    prenom.innerHTML = '';
  } else {
    prenom.innerHTML = 'Champ invalide, veuillez vérifier votre prénom.';
  }
});

let nom = form.lastName.nextElementSibling;
form.lastName.addEventListener('change', function (e) {
  var value = e.target.value;
  if (nameReg.test(value)) {
    nom.innerHTML = '';
  } else {
    nom.innerHTML = 'Champ invalide, veuillez vérifier votre nom.';
  }
});

var adresse = document.querySelector('#addressErrorMsg');
form.address.addEventListener('change', function (e) {
  var value = e.target.value;
  if (adressReg.test(value)) {
    adresse.innerHTML = '';
  } else {
    adresse.innerHTML = 'Champ invalide, veuillez vérifier votre adresse postale.';
  }
});

var ville = document.querySelector('#cityErrorMsg');
form.city.addEventListener('change', function (e) {
  var value = e.target.value;
  if (cityreg.test(value)) {
    ville.innerHTML = '';
  } else {
    ville.innerHTML = 'Champ invalide, veuillez vérifier votre ville.';
  }
});

var email = document.querySelector('#emailErrorMsg');
form.email.addEventListener('change', function (e) {
  var value = e.target.value;
  if (emailReg.test(value)) {
    email.innerHTML = '';
  } else {
    email.innerHTML = 'Champ invalide, veuillez vérifier votre adresse email.';
  }
});


// Regex Test
// https://regex101.com/

// Regex Cours
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/RegExp