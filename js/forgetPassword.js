// Đổi mật khẩu tk User: onclick="changePasswordUser()"
function changePasswordUser(e) {
  e.preventDefault();

  let email = document.fR.email.value;
  let answer = document.getElementById("answerSQ").value;
  let password2 = document.fR.password2.value;

  let flag = false;

  let listUser = JSON.parse(localStorage.getItem("listUser"));

  // check password có đủ tối thiểu 8 ký tự hay k
  if (password2.length < 8) {
    document.getElementById("message_password2").innerHTML =
      "Password tối thiểu 8 ký tự";
    return false;
  }

  // xet email và câu trả lời trong storage có trùng với ô nhập hay k
  for (let i = 0; i < listUser.length; i++) {
    if (listUser[i].email == email && listUser[i].answer == answer) {
      if (listUser[i].password != password2 && password2.length >= 8) {
        listUser[i].password = password2;
        localStorage.setItem("listUser", JSON.stringify(listUser));
        alert("Đổi mật khẩu thành công!");
        location.href = "/page/login.html";
        flag = true;
        break;
      }
    } else {
      flag = false;
    }
  }
  if (flag == false) {
    alert("Email/password hoặc câu trả lời không hợp lệ.");
    return false;
  }
}

// Mắt answer của security question
    const toggleAnswer = document.querySelector("#toggleAnswer");
    const answerSQ = document.querySelector("#answerSQ");

    toggleAnswer.addEventListener("click", function () {
        const type = answerSQ.getAttribute("type") === "password" ? "text" : "password";
        answerSQ.setAttribute("type", type);
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
