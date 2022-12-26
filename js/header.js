document.getElementById('myHeader').innerHTML = `
<nav class="navbar container">
            <a href="/index.html" class="navbar_logo">
                <i class="fa-solid fa-book-open-reader"></i>
                <span class="navbar_logo_text">hoanghabook</span>
            </a>
            <ul class="navbar_menu">
                <li><a href="/index.html">SÁCH TIẾNG NHẬT</a></li>
                <li><a href="/page/introduce.html">GIỚI THIỆU</a></li>
                <li><a href="/page/shoppingGuide.html">HƯỚNG DẪN MUA HÀNG</a></li>
                <li><a href="/page/contact.html">LIÊN HỆ</a></li>
            </ul>
            <ul class="navbar_features">
                <li><a href="/page/cart.html" onclick="payCart(event)" id="cart"><i
                            class="fa-solid fa-cart-shopping"></i></a></li>
                <li><a href="/page/favorite.html" onclick="viewFavorite(event)" id="favorite"><i
                            class="fa-solid fa-heart"></i></a></li>
                <li><a href="/page/login.html" id="loginLogout">Đăng nhập・Đăng ký</a></li>
                <div class="dropdown">
                    <i class="fa-solid fa-user" id="dropbtn"></i>
                    <div class="dropdown_content">

                        <a href="#" onclick="logOut()">Đăng xuất</a>
                        <a href="/page/changePassUser.html">Đổi mật khẩu</a>
                    </div>
                </div>
            </ul>
            <div class="rwd_dropdown">
                <i id="menu_sort" class="fa-solid fa-bars" onclick="showMenuSort()"></i>
                <div class="rwd_dropdown_content" id="rwd_dropbtn">
                    <a href="/page/cart.html">Giỏ hàng</a>
                    <a href="/page/favorite.html">Yêu thích</a>
                    <a href="/index.html">Sách tiếng Nhật</a>
                    <a href="/page/introduce.html">Giới thiệu</a>
                    <a href="/page/shoppingGuide.html">Hướng dẫn mua hàng</a>
                    <a href="/page/contact.html">Liên hệ</a>
                    <a href="#" onclick="logOut()">Đăng xuất</a>
                    <a href="/page/changePassUser.html">Đổi mật khẩu</a>
                </div>
            </div>
</nav>
`;