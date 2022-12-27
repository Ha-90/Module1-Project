let listProduct = JSON.parse(localStorage.getItem("listProduct"));
let keyDetail = JSON.parse(localStorage.getItem("keyDetail"));
function viewDetail() {
  let data = "";
 
    data = `
                <div class="product">
                    <img id="product_image" src="${listProduct[keyDetail].image}" alt="hình ảnh sp">
                    <h4 id="product_name">${listProduct[keyDetail].name}</h4>
                    <p id="product_price">${listProduct[keyDetail].price}<span> đ</span></p>
                    <p id="product_detail">${listProduct[keyDetail].detail}>
                    <p id="product_code">${listProduct[keyDetail].code}>                   
                </div>
            `;
    document.getElementById("showProduct").innerHTML = data;
  localStorage.removeItem("keyDetail");
}
viewDetail();

