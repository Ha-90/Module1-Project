// let listProduct = [
//   {
//     image: "/img/minna 1 ban cu.png",
//     name: "Minna 1 bản cũ",
//     price: "537000",
//     detail: "",
//     id: 1,
//   },
//   {
//     image: "/img/Minna 1 ban moi.png",
//     name: "Minna 1 bản mới",
//     price: "535000",
//     id: 2,
//   },
//   {
//     image: "/img/minna 2 ban cu.png",
//     name: "Minna 2 bản cũ",
//     price: "521000",
//     id: 3,
//   },
//   {
//     image: "/img/Minna 2 ban moi.png",
//     name: "Minna 2 bản mới",
//     price: "557000",
//     id: 4,
//   },
//   {
//     image: "/img/minna trung cap 1.png",
//     name: "Minna trung cấp 1",
//     price: "247000",
//     id: 5,
//   },
//   {
//     image: "/img/minna trung cap 2.png",
//     name: "Minna trung cấp 2",
//     price: "247000",
//     id: 6,
//   },
//   {
//     image: "/img/minna trung cap n3 n2.png",
//     name: "Minna trung cấp n3",
//     price: "494000",
//     id: 7,
//   },
//   {
//     image: "/img/hyojun mondaishu 1.png",
//     name: "Hyojun mondai 1",
//     price: "46000",
//     id: 8,
//   },
//   {
//     image: "/img/minna 1 ngu phap tv.png",
//     name: "Minna 1 ngữ pháp",
//     price: "81000",
//     id: 9,
//   },
//   {
//     image: "/img/minna so cap 1.png",
//     name: "Minna 1 honsatsu",
//     price: "94000",
//     id: 10,
//   },
// ];
// localStorage.setItem("listProduct", JSON.stringify(listProduct));


// Vẽ giao diện list sp
let listProduct = JSON.parse(localStorage.getItem("listProduct"));
function drawListProduct(listProduct) {
  let data = "";
  for (let i = 0; i < listProduct.length; i++) {
    data += `
                <div class="product">
                    <img id="product_image" src="${listProduct[i].image}" alt="hình ảnh sp">
                    <h4 id="product_name">${listProduct[i].name}</h4>
                    <p id="product_price">${listProduct[i].price}<span> đ</span></p>
                    <i onclick="addToCart(${listProduct[i].id})" class="fa-solid fa-cart-arrow-down"></i>
                    <i onclick="addToFavorite(${listProduct[i].id})" class="fa-solid fa-heart-circle-plus"></i>
                </div>
            `;
    document.getElementById("showProduct").innerHTML = data;
  }
}
drawListProduct(listProduct);

// tạo hàm check trạng thái của User(đang login hay logout) sd flag
function checkStatus() {
  let flag = false;
  let listUser = localStorage.getItem("listUser");
  listUser = JSON.parse(listUser);

  for (let i = 0; i < listUser.length; i++) {
    if (listUser[i].status) {
      flag = true;
      break;
    }
  }
  if (!flag) {
    if (confirm("Vui lòng đăng nhập để sử dụng tính năng")) {
      window.location = "/page/login.html";
    }
  }
  return flag;
}

// thêm sp vào Cart
function addToCart(id) {
  let logged = checkStatus(); // Check trạng thái đang logged mới cho add to Cart
  if (logged) {
    alert("Đã thêm sản phẩm vào giỏ hàng");
    // let listProduct = JSON.parse(localStorage.getItem("listProduct"));

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
}

// thêm sp vào Favorite
function addToFavorite(id) {
  let logged = checkStatus();
  if (logged) {
    alert("Đã thêm vào yêu thích");
    let listProduct = JSON.parse(localStorage.getItem("listProduct"));
    let listFavorite = localStorage.getItem("listFavorite");
    console.log(listFavorite);
    if (listFavorite == null) {
      listFavorite = [];
      for (i = 0; i < listProduct.length; i++) {
        if (listProduct[i].id == id) {
          listFavorite.push(listProduct[i]);
          localStorage.setItem("listFavorite", JSON.stringify(listFavorite));
          break;
        }
      }
    } else {
      let listFavoriteAdd = JSON.parse(listFavorite);
      for (i = 0; i < listProduct.length; i++) {
        if (listProduct[i].id == id) {
          flag = false;
          for (j = 0; j < listFavoriteAdd.length; j++) {
            if (listFavoriteAdd[j].id == id) {
              flag = true;
              break;
            } else {
              flag = false;
            }
          }
          if (flag) {
            alert("SP đã có trong yêu thích");
          } else {
            listFavoriteAdd.push(listProduct[i]);
          }
        }
        localStorage.setItem("listFavorite", JSON.stringify(listFavoriteAdd));
      }
    }
  }
}
// function Tìm kiếm sp trên ô input
function searchProduct() {
  let search = document.getElementById("search");
  let listRender = [];
  for (let i = 0; i < listProduct.length; i++) {
    if (
      listProduct[i].name.toUpperCase().indexOf(search.value.toUpperCase()) !=
      -1
    ) {
      console.log(listProduct[i].name);
      listRender.push(listProduct[i]);
      console.log(listRender);
    }
  }
  drawListProduct(listRender);
}

// Logout đăng xuất khỏi tk (lock lại Cart và Favorite)
function logOut() {
  let listUser = JSON.parse(localStorage.getItem("listUser"));
  for (i = 0; i < listUser.length; i++) {
    if (listUser[i].status) {
      listUser[i].status = false;     
      alert("Goodbye!");
      localStorage.setItem("listUser", JSON.stringify(listUser));
      hideShowUser();
    }
  }
}

// Ẩn hiện Đăng nhập/Đăng ký & icon user
function hideShowUser() {

  let loginLogout = document.getElementById("loginLogout");
  let dropbtn = document.getElementById("dropbtn");
  let listUser = JSON.parse(localStorage.getItem("listUser"));
  let flag=false;
  for (i = 0; i < listUser.length; i++) {
    if (listUser[i].status) {
      flag=true;
      break;
    } 
  }
  if(flag){
    loginLogout.style.display = "none";
    dropbtn.style.display = "inline-block";
  }else{
    loginLogout.style.display = "inline-block";
    dropbtn.style.display = "none";
  }
}
hideShowUser();

// Show menu_sort thu nhỏ khi reponsive < 768px
function showMenuSort() {
  console.log("1111111111111");
}
