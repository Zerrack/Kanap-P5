//La function getpanier permet de recuper le panier dans le localstorage
function getPanier(){
    var panier = localStorage.getItem("panier");
    //si le panier et inégal à null 
    if( panier != null) {
        //on fait une transformation en JSON sur le panier 
        panier = JSON.parse(panier);
    }
    //si il est vide c'est un tableau vide
    else{
        panier = Array();
    }
    return panier;
}
//La function setpanier converti le tableau de produit en string
function setPanier(tableauproduit){
    //met a jour l'item du panier dans le localstorage
    localStorage.setItem("panier", JSON.stringify(tableauproduit));
}