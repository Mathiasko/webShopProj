var cutomerType = document.getElementById('ctype');
var customerCvr = document.getElementById('ccvr');
var customerName = document.getElementById('cname');
var customerAddress = document.getElementById('caddress');
var customerZip = document.getElementById('czip');
var customerCity = document.getElementById('ccity');
var customerCountry = document.getElementById('ccountry');
var customerEmail = document.getElementById('cemail');
var productName = document.getElementById('pname');
var productPrice = document.getElementById('pprice');
var productComment = document.getElementById('pcomment');
var productCategory = document.getElementById('pcategory');
var productImage = document.getElementById('pimage');
var productActive = document.getElementById('pactive');
var cart = document.getElementById('cart');
var testButton = document.getElementById('testButton');
var cartCount = document.getElementById('cartCount');
var WebShop = /** @class */ (function () {
    function WebShop() {
        var _this = this;
        this.cart = [];
        this.products = [];
        this.handleCartProductAmount = function (e) {
            var ammountTest;
            if (parseInt(e.target.value) >= 10) {
                ammountTest = 10;
            }
            else if (parseInt(e.target.value) < 1) {
                ammountTest = 1;
            }
            else {
                ammountTest = parseInt(e.target.value);
            }
            _this.cart.filter(function (cartItem) { return cartItem.id === parseInt(e.target.dataset.id); })[0].amount = ammountTest;
            _this.showCart();
        };
    }
    WebShop.prototype.getCustomers = function () {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Found " + JSON.parse(xhttp.responseText).length + " customers");
            }
        };
        xhttp.open('GET', 'http://localhost:3000/customer');
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();
    };
    WebShop.prototype.getCustomer = function (id) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Found " + JSON.parse(xhttp.responseText)[0].Name);
                console.log(JSON.parse(xhttp.responseText)[0]);
            }
        };
        xhttp.open('GET', "http://localhost:3000/customer/" + id);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();
    };
    WebShop.prototype.postNewCustomer = function (payload) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("New customer added");
            }
        };
        xhttp.open('POST', "http://localhost:3000/customer");
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(payload));
    };
    WebShop.prototype.deleteCustomer = function (id) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(xhttp.responseText));
            }
        };
        xhttp.open('DELETE', "http://localhost:3000/customer/" + id);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();
    };
    WebShop.prototype.reviveCustomer = function (id) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(xhttp.responseText));
            }
        };
        xhttp.open('PUT', "http://localhost:3000/customer/" + id);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();
    };
    WebShop.prototype.getProducts = function () {
        var xhttp = new XMLHttpRequest();
        var self = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(xhttp.responseText).data);
                var allProducts = JSON.parse(xhttp.responseText).data;
                self.products = allProducts;
                var productsContainer_1 = document.getElementById('products');
                allProducts.forEach(function (product) {
                    var productDiv = document.createElement('div');
                    productDiv.classList.add('card');
                    productDiv.dataset.id = product.ProductId.toString();
                    productsContainer_1.appendChild(productDiv);
                    var productImg = document.createElement('img');
                    productImg.src = "./design/" + product.ImageFile + ".jpg";
                    productDiv.appendChild(productImg);
                    var productName = document.createElement('h1');
                    productName.innerHTML = product.Name;
                    productDiv.appendChild(productName);
                    var productPrice = document.createElement('p');
                    productPrice.classList.add('price');
                    productPrice.innerHTML = product.Price + ' $';
                    productDiv.appendChild(productPrice);
                    var addToCart = document.createElement('button');
                    addToCart.innerHTML = 'Add To Cart';
                    addToCart.dataset.id = product.ProductId.toString();
                    addToCart.addEventListener('click', function (e) {
                        shop.addToCart(parseInt(e.target.dataset.id));
                        // shop.showCart();
                    });
                    productDiv.appendChild(addToCart);
                });
            }
        };
        xhttp.open('GET', "http://localhost:3000/product/?page=1");
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();
        return xhttp.responseText;
    };
    WebShop.prototype.postNewProduct = function (payload) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(xhttp.responseText));
            }
        };
        xhttp.open('POST', "http://localhost:3000/product/");
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(payload));
    };
    WebShop.prototype.deleteProduct = function (id) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(xhttp.responseText));
            }
        };
        xhttp.open('DELETE', "http://localhost:3000/product/" + id);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();
    };
    WebShop.prototype.updateProduct = function (id, product) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(xhttp.responseText));
            }
        };
        xhttp.open('PUT', "http://localhost:3000/product/" + id);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(product));
    };
    WebShop.prototype.getProductCategories = function () {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Found " + JSON.parse(xhttp.responseText).length + " product categories");
            }
        };
        xhttp.open('GET', 'http://localhost:3000/productCategory');
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();
    };
    WebShop.prototype.postNewProductCategory = function (payload) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(" " + JSON.parse(xhttp.responseText));
            }
        };
        xhttp.open('POST', 'http://localhost:3000/productCategory');
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(payload));
    };
    WebShop.prototype.deleteProductCategory = function (id) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("" + JSON.parse(xhttp.responseText));
            }
        };
        xhttp.open('DELETE', "http://localhost:3000/productCategory/" + id);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();
    };
    WebShop.prototype.updateCart = function () {
        cartCount.innerHTML = "(" + this.cart.length + ")";
    };
    WebShop.prototype.showCart = function () {
        var _this = this;
        cart.innerHTML = '';
        var tableTitle = document.createElement('tr');
        var rowNumber = document.createElement('th');
        rowNumber.innerHTML = '#';
        tableTitle.appendChild(rowNumber);
        var rowImage = document.createElement('th');
        rowImage.innerHTML = 'Image';
        tableTitle.appendChild(rowImage);
        var rowName = document.createElement('th');
        rowName.innerHTML = 'Name';
        tableTitle.appendChild(rowName);
        var rowPrice = document.createElement('th');
        rowPrice.innerHTML = 'Price';
        tableTitle.appendChild(rowPrice);
        var rowAmount = document.createElement('th');
        rowAmount.innerHTML = 'Amount';
        tableTitle.appendChild(rowAmount);
        var rowSum = document.createElement('th');
        rowSum.innerHTML = 'Sum';
        tableTitle.appendChild(rowSum);
        cart.appendChild(tableTitle);
        if (this.cart.length === 0) {
            var cartEmpty = document.createElement('p');
            cartEmpty.innerHTML = 'cart is empty';
            cart.appendChild(cartEmpty);
        }
        else {
            this.cart.forEach(function (product, index) {
                var cartRow = document.createElement('tr');
                cart.appendChild(cartRow);
                var rowNumber = document.createElement('td');
                index++;
                rowNumber.innerHTML = index.toString();
                cartRow.appendChild(rowNumber);
                var rowImage = document.createElement('td');
                cartRow.appendChild(rowImage);
                var image = document.createElement('img');
                image.src = "./design/" + product.image + ".jpg";
                rowImage.appendChild(image);
                var rowName = document.createElement('td');
                cartRow.appendChild(rowName);
                var name = document.createElement('h2');
                name.innerHTML = product.name;
                rowName.appendChild(name);
                var rowPrice = document.createElement('td');
                rowPrice.innerHTML = product.price + "$";
                cartRow.appendChild(rowPrice);
                var rowAmount = document.createElement('td');
                cartRow.appendChild(rowAmount);
                var amountInput = document.createElement('input');
                amountInput.classList.add('cartProductAmount');
                amountInput.type = 'number';
                amountInput.dataset.id = "" + product.id;
                amountInput.value = "" + product.amount;
                amountInput.min = '1';
                amountInput.max = '10';
                amountInput.onchange = _this.handleCartProductAmount;
                rowAmount.appendChild(amountInput);
                var rowSum = document.createElement('td');
                cartRow.appendChild(rowSum);
                var sum = document.createElement('h2');
                sum.innerHTML = parseInt(product.price) * product.amount + "$";
                rowSum.appendChild(sum);
            });
        }
    };
    WebShop.prototype.addToCart = function (id) {
        var productToAdd = this.products.filter(function (product) { return product.ProductId === id; });
        var cartProduct = {
            amount: 1,
            id: productToAdd[0].ProductId,
            image: productToAdd[0].ImageFile,
            name: productToAdd[0].Name,
            price: productToAdd[0].Price
        };
        var productIndex = this.cart.findIndex(function (cartProduct) { return cartProduct.id === id; });
        if (productIndex === -1) {
            this.cart.push(cartProduct);
        }
        else if (this.cart[productIndex].amount >= 10) {
            this.cart[productIndex].amount = 10;
        }
        else {
            this.cart[productIndex].amount++;
        }
        this.updateCart();
    };
    return WebShop;
}());
testButton.addEventListener('click', function (e) {
    e.preventDefault();
    shop.showCart();
});
var shop = new WebShop();
shop.getProductCategories();
shop.getProducts();
// shop.postNewProductCategory({productCategoryName: "maros"})
// shop.deleteProductCategory(29);
shop.getCustomers();
shop.getCustomer(8);
var newCustomer = {
    Active: 1,
    Address: '2 Hanover Road',
    CVR: '35291343',
    City: 'Wotsogo',
    Comment: null,
    CompanyName: 'Topiclounge',
    CompanyTypeId: 1,
    CountryId: 3,
    CreateDate: '2017-11-09T16:10:54.000Z',
    Email: 'ckelsey6@feedburner.com',
    ModifiedDate: '2021-06-08T21:45:23.000Z',
    Name: 'Fero Jozo',
    Phone: '3774867117',
    Zipcode: '6294'
};
// shop.postNewCustomer(newCustomer)
// shop.deleteCustomer(22);
// shop.reviveCustomer(22);
var newProduct = {
    Active: 1,
    Comment: 'hmmmm dobra!',
    CreateDate: '2021-09-08T11:19:15.000Z',
    ImageFile: 'M215.jpg',
    ModifiedDate: '2021-10-13T11:19:15.000Z',
    Name: 'Ferkovica updated',
    PartNumber: 'V487XXA',
    Price: '139.01',
    ProductCategoryId: 9
};
// shop.postNewProduct(newProduct);
// shop.deleteProduct(12);
// shop.updateProduct(11, newProduct)
shop.updateCart();
