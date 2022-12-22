// Đổi mật khẩu tk User: onclick="changePasswordUser()"
function changePasswordUser(e) {
  e.preventDefault();
  // let listUser = JSON.parse(localStorage.getItem("listUser"));
  // let password0 = document.getElementById("password0");
  // let password = document.getElementById("password");
  // let password2 = document.getElementById("password2");
  // let email = document.getElementById("email");

  let email = document.fR.email.value;
  let password = document.fR.password.value;
  let password2 = document.fR.password2.value;

  let flag = false;

  let listUser = JSON.parse(localStorage.getItem("listUser"));

  // check password có đủ tối thiểu 8 ký tự hay k
  if (password2.length < 8) {
    document.getElementById("message_password2").innerHTML = "Password tối thiểu 8 ký tự";
    return false;
  }

  // xet email và password trong storage có trùng với ô nhập hay k
  for (let i = 0; i < listUser.length; i++) {
    if (listUser[i].email == email && listUser[i].password == password) {
      if (listUser[i].password != password2 && password2.length >= 8) {
        listUser[i].password = password2;
        localStorage.setItem("listUser", JSON.stringify(listUser));
        alert("Đổi mật khẩu thành công!");
        location.href = "/index.html";
        flag = true;
        break;
      }
    } else {
      flag = false;
    }
  }
  if (flag == false) {
    alert("Email hoặc Password không hợp lệ.");
    return false;
  }
}


// Con mắt soi password
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", function () {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  this.classList.toggle("bi-eye");
});

// Con mắt soi password2
const togglePassword2 = document.querySelector("#togglePassword2");
const password2 = document.querySelector("#password2");

togglePassword2.addEventListener("click", function () {
  const type2 =
    password2.getAttribute("type") === "password" ? "text" : "password";
  password2.setAttribute("type", type2);
  this.classList.toggle("bi-eye");
});
