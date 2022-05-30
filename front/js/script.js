var myHeaders = new Headers();

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

fetch('http://localhost:3000/api/products',myInit)
.then(function(response){
   response.json().then(function(data){
    console.log(data);
    var section = document.getElementById("items");
  for(var i = 0; i < data.length; i++){
    var a = document.createElement("a");
    a.href = "product.html?id=" + data[i]._id;
    var article = document.createElement("article");
    var imageCanape = document.createElement("img");
    imageCanape.src = data[i].imageUrl;
    imageCanape.alt = data[i].altTxt;
    var titreCanape = document.createElement("h3");
    titreCanape.textContent = data[i].name;
    var produit = document.createElement("p");
    produit.class = "productDescription"
    produit.textContent = data[i].description;
    
    article.appendChild(titreCanape);
    article.appendChild(imageCanape);
    article.appendChild(produit);
    a.appendChild(article);
    section.appendChild(a);
   } 
  })
})