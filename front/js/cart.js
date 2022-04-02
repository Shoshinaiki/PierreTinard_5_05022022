async function fetchApi(id){
  return fetch(`http://localhost:3000/api/products/${id}`)
  .then(function(res){
      if(res.ok){
      return res.json();
      }
  })
  .catch(function(error){
      console.log(error);
  })
}

async function displayProduct(panier){
  for (product of panier) {
    product.info = await fetchApi(product.id); 
    const parentNode = document.getElementById("cart__items"); // création du noeud parent

    const articleNode  = document.createElement("article"); // création article  
    articleNode.classList.add("cart__item");
    articleNode.setAttribute("data-id", product.id); // attribut id
    articleNode.setAttribute("data-color", product.color); // attribut  
    

    const divImg = document.createElement("div"); // création div
    divImg.classList.add("cart__item__img"); // attribut img
    articleNode.appendChild(divImg)

    const img = document.createElement("img"); // création img
    img.setAttribute("src", product.info.imageUrl); // attribut src
    img.setAttribute("alt", product.info.altTxt); // attribut alt
    divImg.appendChild(img)

    const divContent = document.createElement("div");
    divContent.classList.add("cart__item__content");
    articleNode.appendChild(divContent)
    
    const divDescription = document.createElement("div");
    divDescription.classList.add("cart__item__content__description");
    const h2 = document.createElement("h2");
    h2.innerText = product.info.name;
    divDescription.appendChild(h2)
    const descriptionp = document.createElement("p");
    descriptionp.innerText = product.color;
    divDescription.appendChild(descriptionp)
    divContent.appendChild(divDescription);
   

    const divSettings = document.createElement("div");
    divSettings.classList.add("cart__item__content__settings");
    const divQuantity = document.createElement("div");
    divQuantity.classList.add("cart__item__content__settings__quantity");
    divSettings.appendChild(divQuantity)
    const quantityp = document.createElement("p");
    quantityp.innerText = `Qté :`;
    divQuantity.appendChild(quantityp)
    const inputQuantity = document.createElement("input");
    inputQuantity.classList.add("itemQuantity");
    inputQuantity.setAttribute("min", 1);
    inputQuantity.setAttribute("max", 100);
    inputQuantity.setAttribute("value", product.quantity);
    inputQuantity.setAttribute("type", "number");
    inputQuantity.setAttribute("name", "itemQuantity");
    divQuantity.appendChild(inputQuantity)
    divContent.appendChild(divSettings)

    const divDelete = document.createElement("div");
    divDelete.classList.add("cart__item__content__settings__delete");
    divSettings.appendChild(divDelete)
    const deletep = document.createElement("p");
    deletep.classList.add("deleteItem")
    deletep.innerText = `Supprimer`;
    divDelete.appendChild(deletep)

     
    parentNode.appendChild(articleNode)

    
  }
}

async function displayQuantityAndPrice(panier) {
  let prix = 0;
  let quantity = 0;
  for (produit of panier) {
    produit.info = await fetchApi(produit.id);
    prix += parseInt(produit.info.price);
    quantity += parseInt(produit.quantity);
  }
  document.getElementById("totalQuantity").innerText = quantity;
  document.getElementById("totalPrice").innerText = prix;
}

function listenDelete() {
  let deleteArray = document.querySelectorAll("button.deleteItem");
  deleteArray.forEach( (e) => {
    e.addEventListener("click", () => {
      
    })
  })
}



async function main(){
  let panier = JSON.parse(localStorage.getItem("cart"));
  displayProduct(panier);
  displayQuantityAndPrice(panier);
  listenDelete();
}

main();