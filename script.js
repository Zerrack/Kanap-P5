const tableau = [
    { nom : "canaper1", quantity : 3, img : "Logo.png" },
    { nom : "canaper2", quantity : 4, img : "Logo2.png" },
    { nom : "canaper3", quantity : 1, img : "Logo.png" }
]
 
function panier(tableau){
   tableau.forEach(canaper => {console.log(canaper)

    var body = document.getElementById('body');

    var div = document.createElement("div");
     
    var nom = document.createElement("h1");
    nom.textContent = canaper.nom

    var quantity = document.createElement("p")
    quantity.textContent = canaper.quantity

    var img = document.createElement("img")
    img.setAttribute("alt", "Logo")
    img.src = "Logo.png"

    body.appendChild(div);
    div.appendChild(nom);
    div.appendChild(quantity);
    div.appendChild(img);
    
   });
}

panier(tableau)


// Crée une fonction qui prend en parametre un tableau d'objet, pour chaque element du tableau on affichera dans le index.html son nom sa quantité et son image.

//revoir foreach , les condition et les boucle 