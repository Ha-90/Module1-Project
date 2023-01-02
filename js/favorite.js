// Xác định người dùng nào đang online
function userId() {
  let flag = false;
  let listUser = localStorage.getItem("listUser");
  listUser = JSON.parse(listUser);
  for (i = 0; i < listUser.length; i++) {
    if (listUser[i].status) {
      flag = i;
      break;
    }
  }
  return flag;
}

//Hiển thị Favorite
function viewFavorite() {
  let userid = userId();
  let listUser = JSON.parse(localStorage.getItem("listUser"));
  let listFavorite = listUser[userid].favorite;
  if (listFavorite.length == 0) {
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
  let userid = userId();
  let listUser = JSON.parse(localStorage.getItem("listUser"));
  let listFavorite = listUser[userid].favorite;
  for (i = 0; i < listFavorite.length; i++) {
    if (listFavorite[i].id == id) listFavorite.splice(i, 1);
  }
 listUser[userid].favorite = listFavorite;
 localStorage.setItem("listUser", JSON.stringify(listUser));
  viewFavorite();
  // window.location.reload();
}

// thêm sp vào Cart
function addToCart(id) {
  alert("Đã thêm sản phẩm vào giỏ hàng");
  let listProduct = JSON.parse(localStorage.getItem("listProduct"));
 let userid = userId();
    let listUser = JSON.parse(localStorage.getItem("listUser"));
    let listUserCart = listUser[userid].cart;

    if (listUserCart.length == 0) {
      for (let i = 0; i < listProduct.length; i++) {
        if (listProduct[i].id == id) {
          listUserCart.push(listProduct[i]);
          listUserCart[0].quantity = 1;
          listUser[userid].cart = listUserCart;
          console.log(listUser);
          localStorage.setItem("listUser", JSON.stringify(listUser));
          break;
        }
      }
    } else {
      // let listUserCart = JSON.parse(listProductCart);
      for (let i = 0; i < listProduct.length; i++) {
        flag = false;
        position = 0;
        if (listProduct[i].id == id) {
          for (let j = 0; j < listUserCart.length; j++) {
            if (listUserCart[j].id == id) {
              flag = true;
              position = j;
              break;
            } else {
              flag = false;
            }
          }
          if (flag) {
            console.log("SP đã có trong giỏ hàng");
            console.log(position);
            listUserCart[position].quantity += 1;
                          console.log(listUserCart);
          } else {
            listUserCart.push(listProduct[i]);
            // console.log(listUserCart.length);
            listUserCart[listUserCart.length-1].quantity = 1;
          }
        }
        listUser[userid].cart = listUserCart;
        localStorage.setItem("listUser", JSON.stringify(listUser));
      }
    }
}

