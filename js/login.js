// Check xem có tk đang đăng nhập hay k
function checkAccLogged(){
    let listUser = JSON.parse(localStorage.getItem('listUser'));
    for(i = 0; i < listUser.length; i++){
        if(listUser[i].status){
            alert("Đang có tài khoản đăng nhập. Vui lòng đăng xuất để tiếp tục.");
            return false;
        }
    }
}

 function checkPass(e) {
        e.preventDefault();
        var email = document.fR.email.value;
        var password = document.fR.password.value;
        let flag = false;

        // lấy data từ storage ra để đối chiếu
        let listUser = localStorage.getItem('listUser');
        listUser = JSON.parse(listUser);


        for(i = 0; i < listUser.length; i++){
            if(listUser[i].status){
                alert("Đang có tài khoản đăng nhập. Vui lòng đăng xuất để tiếp tục.");
                return false;
            }
        }
        // xet email và password trong storage có trùng với ô nhập hay k
        for (let i = 0; i < listUser.length; i++) {
            if ((listUser[i].email == "admin@book.com") && (listUser[i].password == password)) {
                location.href = "/page/admin.html";
                listUser[i].status = true;
                localStorage.setItem("listUser", JSON.stringify(listUser));           
                flag = true;
                break;
            }
            if ((listUser[i].email != "admin@book.com")&&(listUser[i].email == email) && (listUser[i].password == password)) {
                // alert("Đăng nhập thành công!");
                location.href = "/index.html"; 
                listUser[i].status = true;
                localStorage.setItem("listUser", JSON.stringify(listUser));           
                flag = true;
                break;
            } else {
                flag = false;
            }
        }
        if (flag == false) {
            alert("Email hoặc Password không hợp lệ.");
            return false;
        }
    }
// Con mắt soi pass
    const togglePassword = document.querySelector("#togglePassword");
    const password = document.querySelector("#password");

    togglePassword.addEventListener("click", function () {
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        this.classList.toggle("bi-eye");
    });