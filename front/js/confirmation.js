//Récuperation de orderId dans url pour l'affiche dans la zone prévu dans le HTML
var url = new URL(window.location);
var Id = url.searchParams.get("order");

var orderId = document.querySelector("#orderId");
orderId.innerHTML = Id

localStorage.clear();