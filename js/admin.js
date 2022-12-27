// Vẽ giao diện table sp

function drawListProduct() {
  let listProduct = JSON.parse(localStorage.getItem("listProduct"));
  if (listProduct == null) {
    listProduct = [];
  }
  let data = "";
  for (i = 0; i < listProduct.length; i++) {
    data += `
            <tr>
            <td>${i + 1}</td>
            <td><img src="${listProduct[i].image}"></td>
            <td>${listProduct[i].name}</td>
            <td>${listProduct[i].price}</td>
            <td>${listProduct[i].detail}</td>
            <td>${listProduct[i].code}</td>
            <td><button id="edit" onclick="edit(${
              listProduct[i].id
            })">EDIT</button></td>
            <td><button id="del" onclick="del(${
              listProduct[i].id
            })">DELETE</button></td>
            </tr>
            `;
  }
  document.getElementById("showProduct").innerHTML = data;
}
drawListProduct();

// Tạo mảng chứa thông tin sp và lưu storage

let input_image = document.getElementById("input_image");
let input_name = document.getElementById("input_name");
let input_price = document.getElementById("input_price");
let input_detail = document.getElementById("input_detail");
let input_code = document.getElementById("input_code");

function saveList(e) {
  e.preventDefault();
  let listDataProduct = JSON.parse(localStorage.getItem("listProduct"));
  let keyId = JSON.parse(localStorage.getItem("keyId")); // Sd cho tính năng edit
  if (keyId != null) {
    listDataProduct[keyId].image = input_image.value;
    listDataProduct[keyId].name = input_name.value;
    listDataProduct[keyId].price = input_price.value;
    listDataProduct[keyId].detail = input_detail.value;
    listDataProduct[keyId].code = input_code.value;

    listDataProduct.splice(keyId, 1, listDataProduct[keyId]);
    console.log("1111", listDataProduct);
    localStorage.setItem("listProduct", JSON.stringify(listDataProduct));
    document.getElementById("saveBtn").innerHTML = "Save";

    input_image.value = "";
    input_name.value = "";
    input_price.value = "";
    input_detail.value = "";
    input_code.value = "";

    localStorage.removeItem("keyId");
    drawListProduct();

    return;
  }

  // Lưu sản phẩm (Admin)
  if (
    input_image.value == "" ||
    input_name.value == "" ||
    input_price.value == "" ||
    input_detail.value == "" ||
    input_code.value == ""
  ) {
    alert("Vui lòng nhập đủ thông tin!");
    return false;
  }
  let listProduct = JSON.parse(localStorage.getItem("listProduct"));
  if (listProduct == null) {
    let listProductArr = [
      {
        image: input_image,
        name: input_name.value,
        price: input_price.value,
        detail: input_detail.value,
        code: input_code.value,
        id: 0,
      },
    ];
    localStorage.setItem("listProduct", JSON.stringify(listProductArr));
  } else {
    let product = {
      image: input_image.value,
      name: input_name.value,
      price: input_price.value,
      detail: input_detail.value,
      code: input_code.value,
      id: listProduct.length,
    };
    listProduct.push(product);
    localStorage.setItem("listProduct", JSON.stringify(listProduct));
  }
  input_image.value = "";
  input_name.value = "";
  input_price.value = "";
  input_detail.value = "";
  input_code.value = "";

  listProduct = JSON.parse(localStorage.getItem("listProduct"));

  drawListProduct();
}

// Xóa sản phẩm trong listProduct
function del(id) {
  let listProduct = JSON.parse(localStorage.getItem("listProduct"));
  if (listProduct.length == "") {
    document.getElementById("showProduct").innerHTML = "";
    return;
  }
  for (i = 0; i < listProduct.length; i++) {
    if (listProduct[i].id == id) {
      listProduct.splice(i, 1);
      localStorage.setItem("listProduct", JSON.stringify(listProduct));
    }
  }
  drawListProduct();
}

// Sửa thông tin sản phẩm trong listProduct
function edit(id) {
  let listProduct = JSON.parse(localStorage.getItem("listProduct"));
  for (i = 0; i < listProduct.length; i++) {
    if (listProduct[i].id == id) {
      input_image.value = listProduct[i].image;
      input_name.value = listProduct[i].name;
      input_price.value = listProduct[i].price;
      input_detail.value = listProduct[i].detail;
      input_code.value = listProduct[i].code;
      document.getElementById("saveBtn").innerHTML = "EDIT";
      localStorage.setItem("keyId", JSON.stringify(i));
    }
  }
}

// Logout đăng xuất khỏi tk Admin (lock lại Cart và Favorite)
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

// Ẩn hiện Đăng nhập/Đăng ký & icon user/admin
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

// Show thông tin sản phẩm
function showProductInfo() {
  let container_viewProduct = document.getElementById("container_viewProduct");
  container_viewProduct.style.display = "block";
}

// Show các tài khoản đã đăng ký
function showUserInfo() {
  let container_viewUser = document.getElementById("container_viewUser");
  let listUser = JSON.parse(localStorage.getItem("listUser"));
  let data = "";
  for (i = 0; i < listUser.length; i++) {
    data += `
            <tr>
            <td>${i + 1}</td>
            <td>${listUser[i].email}</td>
            <td>${listUser[i].password}</td>
            </tr>
          `;
  }
  container_viewUser.style.display = "block";
  document.getElementById("showUser").innerHTML = data;
}
showProductInfo();

