// check realtime pass nhập lại có khớp pass trước hay không
let pass1 = document.getElementById("password");
let pass2 = document.getElementById("password2");

pass2.addEventListener("keyup", function () {
  if (pass1.value == pass2.value) {
    document.getElementById("notification").innerHTML =
      "Mật khẩu đã trùng khớp";
  } else {
    document.getElementById("notification").innerHTML =
      "Mật khẩu chưa trùng khớp";
  }
});

// Check realtime pass có đủ 8 ký tự hay k
pass1.addEventListener("keyup", () => {
  if (pass1.value.length < 8) {
    document.getElementById("guide").innerHTML = "Password tối thiểu 8 ký tự";
  } else {
    document.getElementById("guide").innerHTML = "";
  }
});

// Hàm onclick nút Register
function checkPass(e) {
  e.preventDefault();
  let firstPass = document.fR.password.value;
  let secondPass = document.fR.password2.value;
  let email = document.fR.email.value;
  let answer = document.getElementById("answerSQ").value;

  let obj = {
    email: email,
    password: firstPass,
    answer: answer,
    status: false,
  };
  let flag = false;

  // check trường email có bị bỏ trống hay k
  if (email == null || email == "") {
    document.getElementById("message_email").innerHTML =
      "Email không được bỏ trống";
    return false;
  }

  // check định dạng email
  let pattern =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  let result = pattern.test(email);
  if (result == false) {
    document.getElementById("message_email").innerHTML =
      "Định dạng Email chưa đúng.";
    return false;
  } else {
    document.getElementById("message_email").innerHTML = "";
  }

  // check password có bị bỏ trống hay k
  if (
    (firstPass == null || firstPass == "") &&
    (secondPass == null || secondPass == "")
  ) {
    document.getElementById("notification").innerHTML =
      "Password không được bỏ trống";
    return false;
  }
  // check password có đủ tối thiểu 8 ký tự hay k
  if (firstPass.length < 8 || secondPass.length < 8) {
    document.getElementById("guide").innerHTML = "Password tối thiểu 8 ký tự";
    return false;
  }

  // check password co hop le hay k
  if (firstPass != secondPass || secondPass == null || firstPass.length < 8) {
    document.getElementById("notification").innerHTML =
      "Password chưa đạt điều kiện";
    return false;
  } else {
    document.getElementById("notification").innerHTML = "";
    // check câu hỏi bảo mật có bị bỏ trống hay k
    if (answer == null || answer == "") {
      document.getElementById("message_answer").innerHTML =
        "Không được bỏ trống câu trả lời";
      return false;
    }

    // check storage có data bên trong hay k
    let listUser = localStorage.getItem("listUser");
    if (listUser == null) {
      listUser = [];
      listUser.push(obj);
      localStorage.setItem("listUser", JSON.stringify(listUser));
      location.href = "/page/login.html";
    } else {
      listUser = JSON.parse(listUser);

      // check email trùng lặp
      for (let i = 0; i < listUser.length; i++) {
        if (listUser[i].email == email) {
          alert("Email đã tồn tại, xin mời đăng nhập");
          flag = false;
          location.href = "/page/login.html";
          break;
        } else {
          flag = true;
        }
      }
      if (flag) {
        listUser.push(obj);
        localStorage.setItem("listUser", JSON.stringify(listUser));
        location.href = "/page/login.html";
      }
      localStorage.setItem("listUser", JSON.stringify(listUser));
    }
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

// Mắt confirm
const togglePassword2 = document.querySelector("#togglePassword2");
const password2 = document.querySelector("#password2");

togglePassword2.addEventListener("click", function () {
  const type2 =
    password2.getAttribute("type") === "password" ? "text" : "password";
  password2.setAttribute("type", type2);
  this.classList.toggle("bi-eye");
});

// Mắt answer của security question
const toggleAnswer = document.querySelector("#toggleAnswer");
const answerSQ = document.querySelector("#answerSQ");

toggleAnswer.addEventListener("click", function () {
  const type =
    answerSQ.getAttribute("type") === "password" ? "text" : "password";
  answerSQ.setAttribute("type", type);
  this.classList.toggle("bi-eye");
});
