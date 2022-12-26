
//Hiển thị Favorite
function viewFavorite() {

  let listFavorite = JSON.parse(localStorage.getItem("listFavorite"));
  if (listFavorite.length == "") {
    document.getElementById("showProduct").innerHTML = "";
    return;
  }
  let data = "";
  for (i = 0; i < listFavorite.length; i++) {
    console.log(listFavorite.length);
    data += `
                <div class="product" >
                    <img src="${listFavorite[i].image}" alt="">
                    <p>${listFavorite[i].name}</p>
                    <label for="price">${listFavorite[i].price}</label><br>
                    <div>
                        <i onclick="addToCart(${listFavorite[i].id})" class="fa-solid fa-cart-shopping"></i>
                        <i onclick="removeFavorite(${listFavorite[i].id})" class="fa-solid fa-trash"></i>
                    </div>
                </div>
                `;
    document.getElementById("showProduct").innerHTML = data;
  }
}
viewFavorite();


// Remove sp khỏi Favorite
function removeFavorite(id) {
  let listFavorite = JSON.parse(localStorage.getItem("listFavorite"));
  for (i = 0; i < listFavorite.length; i++) {
    if (listFavorite[i].id == id) listFavorite.splice(i, 1);
  }
  localStorage.setItem("listFavorite", JSON.stringify(listFavorite));
  viewFavorite();
  // window.location.reload();
}

// thêm sp vào Cart
function addToCart(id) {
  alert("Đã thêm sản phẩm vào giỏ hàng");
  let listProduct = JSON.parse(localStorage.getItem("listProduct"));
  let listProductCart = localStorage.getItem("listProductCart");
  if (listProductCart == null) {
    listProductCart = [];
    for (let i = 0; i < listProduct.length; i++) {
      if (listProduct[i].id == id) {
        listProductCart.push(listProduct[i]);
        listProductCart[listProductCart.length - 1].quantity = 1;
        localStorage.setItem(
          "listProductCart",
          JSON.stringify(listProductCart)
        );
        break;
      }
    }
  } else {
    let listProductAddCart = JSON.parse(listProductCart);

    for (let i = 0; i < listProduct.length; i++) {
      flag = false;
      position = 0;
      if (listProduct[i].id == id) {
        for (let j = 0; j < listProductAddCart.length; j++) {
          if (listProductAddCart[j].id == id) {
            flag = true;
            position = j;
            break;
          } else {
            flag = false;
          }
        }
        console.log(flag);
        if (flag == true) {
          console.log("SP đã có trong giỏ hàng");
          console.log(position);
          listProductAddCart[position].quantity += 1;
        } else {
          listProductAddCart.push(listProduct[i]);
          listProductAddCart[listProductAddCart.length - 1].quantity = 1;
        }
      }
      localStorage.setItem(
        "listProductCart",
        JSON.stringify(listProductAddCart)
      );
    }
  }
}
