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
// Hiển thị thông tin sp và số tiền trong giỏ hàng Cart
function payCart() {
  let userid = userId();
  let listUser = JSON.parse(localStorage.getItem("listUser"));
  let listProductCart = listUser[userid].cart;
  let data = "";
  for (i = 0; i < listProductCart.length; i++) {
    data += `<tr>
              <td><img src="${listProductCart[i].image}"></td>
              <td>${listProductCart[i].name}</td>
              <td>${listProductCart[i].price}</td>
              <td><input id="changeValue" onchange="changeQuantity(${i})" type="number" value="${
      listProductCart[i].quantity
    }"></td>
              <td><button onclick="removeProduct(${i})">Remove</button></td>
              <td>${listProductCart[i].price * listProductCart[i].quantity}</td>
            </tr>`;
  }
  document.getElementById("money").innerHTML = data;
}
payCart();

// Tính tổng số tiền trong Cart
function totalMoney() {
 let userid = userId();
 let listUser = JSON.parse(localStorage.getItem("listUser"));
 let listProductCart = listUser[userid].cart;
  let money = 0;
  for (i = 0; i < listProductCart.length; i++) {
    money += listProductCart[i].price * listProductCart[i].quantity;
  }
  document.getElementById("total-money").innerHTML = money;
}
totalMoney();

// Remove sản phẩm khỏi cart
function removeProduct(i) {
  let userid = userId();
  let listUser = JSON.parse(localStorage.getItem("listUser"));
  let listProductCart = listUser[userid].cart;
  listProductCart.splice(i, 1);
  listUser[userid].cart = listProductCart;
  console.log(listUser);
  localStorage.setItem("listUser", JSON.stringify(listUser));
    payCart();
  totalMoney();
}

// thay đổi số lượng sp trong cart
function changeQuantity(i) {
  // let value = document.getElementById("changeValue").value;
  let value = document.querySelectorAll("#changeValue")[i].value;
  console.log(value);

   let userid = userId();
   let listUser = JSON.parse(localStorage.getItem("listUser"));
   let listProductCart = listUser[userid].cart;
  if (value < 0) {
    alert("Không thể thực hiện hành động");
    value = 1;
    return false;
  } else if (value == 0) {
    let confirm1 = confirm("Bạn thực sự muốn xóa sp?");
    if (confirm1) {
      listProductCart.splice(i, 1);
    }
  } else {
    listProductCart[i].quantity = parseInt(value);
  }
  listUser[userid].cart = listProductCart;
  console.log(listUser);
  localStorage.setItem("listUser", JSON.stringify(listUser));
  payCart();
  totalMoney();
}

// Xác nhận đặt hàng
function orderConfirm(e) {
  e.preventDefault();
  let phonenumber = document.getElementById("phonenumber");
  let address = document.getElementById("address");
  let userid = userId();
  let listUser = JSON.parse(localStorage.getItem("listUser"));
  let listProductCart = listUser[userid].cart;

  if (phonenumber.value != "" && address.value != "") {
    let customerInfo = [
      {
        phonenumber: phonenumber.value,
        address: address.value,
      },
    ];
    customerInfo.push(listProductCart);
    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));

    alert("Chúng tôi đã tiếp nhận đơn hàng. Xin cảm ơn!");
    phonenumber.value = "";
    address.value = "";
  } else {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }
}
