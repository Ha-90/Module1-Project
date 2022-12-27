// let listProduct = [
//   {
//     image: "/img/minna 1 ban cu.png",
//     name: "Minna 1 bản cũ",
//     price: "537000",
//     detail: "Bộ sách bao gồm 8 cuốn sau: Honsatsu; Bản dịch và giải thích ngữ pháp; Sách bài tập; Luyện mẫu câu; Hán tự học; Hán tự bài tập; 25 bài luyện đọc; 25 bài luyện nghe",
//     code: "MN1C",
//     id: 0
//   },
//   {
//     image: "/img/Minna 1 ban moi.png",
//     name: "Minna 1 bản mới",
//     price: "535000",
//     detail: "Sách giáo khoa; Bản dịch và giải thích ngữ pháp; Bài tập ngữ pháp; Bunkei renshuuchou; 25 Topiku; 25 Tasuku; Kanji học; Kanji renshuuchou;",
//     code: "MN1M",
//     id: 1
//   },
//   {
//     image: "/img/minna 2 ban cu.png",
//     name: "Minna 2 bản cũ",
//     price: "521000",
//     detail: "Bộ sách bao gồm 8 cuốn sau: Honsatsu; Bản dịch và giải thích ngữ pháp; Sách bài tập; Luyện mẫu câu; Hán tự học; Hán tự bài tập; 25 bài luyện đọc; 25 bài luyện nghe	",
//     code: "MN2C",
//     id: 2
//   },
//   {
//     image: "/img/Minna 2 ban moi.png",
//     name: "Minna 2 bản mới",
//     price: "557000",
//     detail: "Bộ sách bao gồm 8 cuốn sau: Honsatsu; Bản dịch và giải thích ngữ pháp; Sách bài tập; Luyện mẫu câu; Hán tự học; Hán tự bài tập; 25 bài luyện đọc; 25 bài luyện nghe",
//     code: "MN2M",
//     id: 3
//   },
//   {
//     image: "/img/minna trung cap 1.png",
//     name: "Minna trung cấp 1",
//     price: "247000",
//     detail: "Bộ sách gồm 4 quyển: Honsatsu; Bản dịch và giải thích ngữ pháp; Bài tập ngữ pháp; Bài tập từ vựng",
//     code: "MTC1",
//     id: 4
//   },
//   {
//     image: "/img/minna trung cap 2.png",
//     name: "Minna trung cấp 2",
//     price: "247000",
//     detail: "Bộ sách gồm 4 quyển: Honsatsu; Bản dịch và giải thích ngữ pháp; Bài tập ngữ pháp; Bài tập từ vựng",
//     code: "MTC2",
//     id: 5
//   },
//   {
//     image: "/img/minna trung cap n3 n2.png",
//     name: "Minna trung cấp n3 n2",
//     price: "494000",
//     detail: "Honsatsu; Bản dịch và giải thích ngữ pháp; Sách bài tập; Luyện mẫu câu; Hán tự học; Hán tự bài tập; luyện đọc; luyện nghe",
//     code: "MTCN3",
//     id: 6
//   },
//   {
//     image: "/img/hyojun mondaishu 1.png",
//     name: "Hyojun mondai 1",
//     price: "46000",
//     detail: "みんなの日本語 初級I 第2版 標準問題集 là cuốn sách bài tập nhằm hỗ trợ cho việc học đạt hiệu quả tốt nhất.	",
//     code: "HJM1",
//     id: 7
//   },
//   {
//     image: "/img/minna 1 ngu phap tv.png",
//     name: "Minna 1 ngữ pháp",
//     price: "81000",
//     detail: "みんなの日本語初級I 第2版 翻訳・文法解説ベトナム語版 là bản dịch sang tiếng Việt của quyển sách chính",
//     code: "M1NP",
//     id: 8
//   },
//   {
//     image: "/img/minna so cap 1.png",
//     name: "Minna 1 honsatsu",
//     price: "94000",
//     detail: "みんなの日本語 初級I 第2版 本冊 là quyển sách chính, quan trọng nhất – được xem như là sách giáo khoa trong bộ sách Minnano nihongo",
//     code: "M1HS",
//     id: 9
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
                    <img id="product_image" onclick="viewDetailProduct(${i})" src="${listProduct[i].image}" alt="hình ảnh sp">
                    
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
            // console.log(listProductCart);
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

          if (flag) {
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
let search = document.getElementById("search");
search.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    searchProduct();
  }
});
function searchProduct() {
  let search = document.getElementById("search");
  let slide_container = document.getElementById("slide_container");
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
  slide_container.style.display = "none";
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
  let flag = false;
  for (i = 0; i < listUser.length; i++) {
    if (listUser[i].status) {
      flag = true;
      break;
    }
  }
  if (flag) {
    loginLogout.style.display = "none";
    dropbtn.style.display = "inline-block";
  } else {
    loginLogout.style.display = "inline-block";
    dropbtn.style.display = "none";
  }
}
hideShowUser();

// Click Show menu_sort thu nhỏ khi reponsive < 768px
function showMenuSort() {
  document.getElementById("rwd_dropbtn").classList.toggle("show");
}

function payCart(e) {
  let logged = checkStatus(); // Check trạng thái đang logged mới cho xem Cart
  if (logged) {
    window.location.href = "/page/cart.html";
  } else {
    e.preventDefault();
  }
}

function viewFavorite(e) {
  let logged = checkStatus(); // Check trạng thái đang logged mới cho xem Favorite
  if (logged) {
    window.location.href = "/page/favorite.html";
  } else {
    e.preventDefault();
  }
}

// View chi tiết sp khi click
function viewDetailProduct(id) {
  localStorage.setItem("keyDetail",id);
  window.location.href="/page/detailProduct.html";
}
