function getPanier(){
    var panier = localStorage.getItem("panier");
    if( panier != null) {
        panier = JSON.parse(panier);
    }
    else{
        panier = Array();
    }
    return panier;
}
function setPanier(tableauproduit){
    localStorage.setItem("panier", JSON.stringify(tableauproduit));
}