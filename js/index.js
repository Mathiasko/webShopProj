var myStorage = window.localStorage;
var productsContainer = document.getElementById('products');
var productCategories = document.querySelectorAll('a.productCategory');
var customerType = document.getElementById('ctype');
var customerCvr = document.getElementById('ccvr');
var customerName = document.getElementById('cname');
var customerAddress = document.getElementById('caddress');
var customerZip = document.getElementById('czip');
var customerCity = document.getElementById('ccity');
var customerCountry = document.getElementById('ccountry');
var customerEmail = document.getElementById('cemail');
var submitCustomer = document.getElementById('submitCustomer');
var productName = document.getElementById('pname');
var productPrice = document.getElementById('pprice');
var productComment = document.getElementById('pcomment');
var productCategory = document.getElementById('pcategory');
var productImage = document.getElementById('pimage');
var productActive = document.getElementById('pactive');
var submitProduct = document.getElementById('submitProduct');
var categorySelect = document.getElementById('categorySelect');
var cart = document.getElementById('cart');
var testButton = document.getElementById('testButton');
var cartCount = document.getElementById('cartCount');
var login = document.getElementById('login');
var signup = document.getElementById('signup');
var password = document.getElementById('inp-pass');
var email = document.getElementById('inp-user');
var allProducts = document.getElementById('allProducts');
var customerForm = document.getElementById('customerForm');
var productForm = document.getElementById('productForm');
var manageStore = document.getElementById('manageStore');
var productId = document.getElementById('productId');
var goButton = document.getElementById('goButton');
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
        this.handleRemoveFromCart = function (e) {
            console.log(e);
            _this.cart = _this.cart.filter(function (item) { return item.id !== parseInt(e.target.dataset.id); });
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
                console.log("Found " + JSON.parse(xhttp.responseText).Name);
                console.log(JSON.parse(xhttp.responseText));
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
            else {
                console.log(this.status);
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
    WebShop.prototype.showProducts = function (products) {
        this.hideProducts();
        products.forEach(function (product) {
            var productDiv = document.createElement('div');
            productDiv.classList.add('card');
            productDiv.dataset.id = product.ProductId.toString();
            productsContainer.appendChild(productDiv);
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
                var productId = parseInt(e.target.dataset.id);
                shop.addToCart(productId);
            });
            productDiv.appendChild(addToCart);
        });
    };
    WebShop.prototype.getProducts = function () {
        var xhttp = new XMLHttpRequest();
        var self = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(xhttp.responseText).data);
                var allProducts_1 = JSON.parse(xhttp.responseText).data;
                self.products = allProducts_1;
                self.showProducts(allProducts_1);
            }
        };
        xhttp.open('GET', "http://localhost:3000/product/?page=1");
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();
        return xhttp.responseText;
    };
    WebShop.prototype.getProductById = function (id) {
        var xhttp = new XMLHttpRequest();
        var self = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var product = JSON.parse(xhttp.responseText).res[0];
                self.fillProductEdit(product);
            }
        };
        xhttp.open('GET', "http://localhost:3000/product/" + id);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();
        return xhttp.responseText;
    };
    WebShop.prototype.fillProductEdit = function (product) {
        productName.value = product.Name;
        productPrice.value = product.Price;
        productComment.value = product.Comment;
        productImage.value = product.ImageFile;
        productCategory.value = "" + product.ProductCategoryId;
        productActive.value = "" + product.Active;
    };
    WebShop.prototype.hideProducts = function () {
        productsContainer.innerHTML = '';
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
        var rowDelete = document.createElement('th');
        rowDelete.innerHTML = 'Remove';
        tableTitle.appendChild(rowDelete);
        cart.appendChild(tableTitle);
        if (this.cart.length === 0) {
            var rowCartEmpty = document.createElement('tr');
            cart.appendChild(rowCartEmpty);
            var cartEmpty = document.createElement('td');
            cartEmpty.setAttribute('colspan', '7');
            var cartEmptyP = document.createElement('h2');
            cartEmptyP.classList.add('cartEmpty');
            cartEmptyP.innerHTML = 'Cart is empty';
            cartEmpty.appendChild(cartEmptyP);
            rowCartEmpty.appendChild(cartEmpty);
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
                var rowRemove = document.createElement('td');
                cartRow.appendChild(rowRemove);
                var remove = document.createElement('button');
                remove.innerHTML = 'Remove';
                remove.dataset.id = "" + product.id;
                remove.onclick = _this.handleRemoveFromCart;
                rowRemove.appendChild(remove);
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
    // <-----ACCOUNT----->
    WebShop.prototype.login = function (email) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // const data = JSON.parse(xhttp.responseText);
                // myStorage.setItem('currentUser', xhttp.responseText);
                shop.loginSuccess(JSON.parse(xhttp.responseText));
            }
            if (this.readyState == 4 && this.status > 400) {
                alert("Login unsuccessful, error: " + this.status);
            }
        };
        var payload = { email: email };
        xhttp.open('POST', 'http://localhost:3000/login');
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(payload));
    };
    WebShop.prototype.loginSuccess = function (customer) {
        console.log('customer: ', customer);
    };
    WebShop.prototype.showSignUp = function () {
        customerForm.classList.remove('hidden');
    };
    WebShop.prototype.showManageStore = function () {
        productForm.classList.remove('hidden');
    };
    return WebShop;
}());
var shop = new WebShop();
goButton.addEventListener('click', function (e) {
    shop.getProductById(productId.value);
});
manageStore.addEventListener('click', function (e) {
    shop.showManageStore();
});
login.addEventListener('click', function (e) {
    e.preventDefault();
    if (!(email.value && password.value)) {
        alert('Provide both, Email and Password!');
    }
    else {
        shop.login(email.value);
    }
});
signup.addEventListener('click', function (e) {
    shop.hideProducts();
    shop.showSignUp();
});
allProducts.addEventListener('click', function (e) {
    shop.showProducts(shop.products);
});
productCategories.forEach(function (category) {
    category.addEventListener('click', function (e) {
        var filteredProducts = shop.products.filter(function (product) {
            return product.ProductCategoryId === parseInt(e.target.dataset.id);
        });
        shop.showProducts(filteredProducts);
    });
});
submitCustomer.addEventListener('click', function (e) {
    e.preventDefault();
    var newCustomer = {
        CompanyTypeId: null,
        CVR: null,
        Name: null,
        Address: null,
        Zipcode: null,
        City: null,
        CountryId: null,
        Email: null
    };
    newCustomer.CompanyTypeId = parseInt(customerType.value);
    newCustomer.CVR = customerCvr.value;
    newCustomer.Name = customerName.value;
    newCustomer.Address = customerAddress.value;
    newCustomer.Zipcode = customerZip.value;
    newCustomer.City = customerCity.value;
    newCustomer.CountryId = parseInt(customerCountry.value);
    newCustomer.Email = customerEmail.value;
    console.log(newCustomer);
    shop.postNewCustomer(newCustomer);
});
productCategory.addEventListener('mousedown', function (e) {
    categorySelect.remove();
});
submitProduct.addEventListener('click', function (e) {
    e.preventDefault();
    console.log(productComment.value);
    var newProduct = {
        Name: null,
        Price: null,
        Comment: null,
        ProductCategoryId: null,
        ImageFile: null,
        Active: null
    };
    newProduct.Name = productName.value;
    newProduct.Price = productPrice.value;
    newProduct.Comment = productComment.value;
    newProduct.ProductCategoryId = parseInt(productCategory.value);
    newProduct.ImageFile = productImage.value;
    newProduct.Active = productActive.checked ? 1 : 0;
    console.log(newProduct);
    shop.postNewProduct(newProduct);
});
testButton.addEventListener('click', function (e) {
    e.preventDefault();
    shop.showCart();
    shop.hideProducts();
});
shop.getProductCategories();
// shop.getProducts();
// shop.postNewProductCategory({productCategoryName: "maros"})
// shop.deleteProductCategory(29);
shop.getCustomers();
shop.getCustomer(8);
// const newCustomer = {
//   Active: 1,
//   Address: '2 Hanover Road',
//   CVR: '35291343',
//   City: 'Wotsogo',
//   Comment: null,
//   CompanyName: 'Topiclounge',
//   CompanyTypeId: 1,
//   CountryId: 3,
//   CreateDate: '2017-11-09T16:10:54.000Z',
//   Email: 'ckelsey6@feedburner.com',
//   ModifiedDate: '2021-06-08T21:45:23.000Z',
//   Name: 'Fero Jozo',
//   Phone: '3774867117',
//   Zipcode: '6294',
// };
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
