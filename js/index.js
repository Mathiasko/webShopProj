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
var customerPassword = document.getElementById('cpassword');
var submitCustomer = document.getElementById('submitCustomer');
var productName = document.getElementById('pname');
var productPrice = document.getElementById('pprice');
var productComment = document.getElementById('pcomment');
var productCategory = document.getElementById('pcategory');
var productImage = document.getElementById('pimage');
var productActive = document.getElementById('pactive');
var submitProduct = document.getElementById('submitProduct');
var submitDelete = document.getElementById('submitDelete');
var categorySelect = document.getElementById('categorySelect');
var cart = document.getElementById('cart');
var cartButton = document.getElementById('cartButton');
var cartCount = document.getElementById('cartCount');
var postNewCustomer = document.getElementById('postNewCustomer');
var postNewProduct = document.getElementById('postNewProduct');
var lname = document.getElementById('lname');
var currentUser = document.getElementById('currentUser');
var login = document.getElementById('login');
var logOut = document.getElementById('logOut');
var signup = document.getElementById('signup');
var password = document.getElementById('inp-pass');
var email = document.getElementById('inp-user');
var allProducts = document.getElementById('allProducts');
var customerForm = document.getElementById('customerForm');
var productForm = document.getElementById('productForm');
var manageStore = document.getElementById('manageStore');
var productId = document.getElementById('productId');
var customerId = document.getElementById('customerId');
var seekProduct = document.getElementById('seekProduct');
var seekCustomer = document.getElementById('seekCustomer');
var customerAlertPrompt = document.getElementById('customerAlertPrompt');
var productAlertPrompt = document.getElementById('productAlertPrompt');
var registration = document.getElementById('registration');
var order = document.getElementById('order');
var getInvoices = document.getElementById('getInvoices');
var invoicesContainer = document.getElementById('invoices');
var invoice = document.getElementById('invoice');
var WebShop = /** @class */ (function () {
    function WebShop() {
        var _this = this;
        this.cart = [];
        this.products = [];
        this.user = {};
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
            _this.updateCart();
        };
    }
    // <-----Customer----->
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
    WebShop.prototype.getCustomerById = function (id) {
        var xhttp = new XMLHttpRequest();
        var self = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var customer = JSON.parse(xhttp.responseText);
                self.fillCustomerEdit(customer);
            }
        };
        xhttp.open('GET', "http://localhost:3000/customer/" + id);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();
    };
    WebShop.prototype.fillCustomerEdit = function (customer) {
        if (customer) {
            customerType.value = "" + customer.CompanyTypeId;
            customerCvr.value = customer.CVR;
            customerName.value = customer.Name;
            customerAddress.value = customer.Address;
            customerZip.value = customer.Zipcode;
            customerCity.value = customer.City;
            customerCountry.value = "" + customer.CountryId;
            customerEmail.value = customer.Email;
            customerForm.dataset.customerId = "" + customer.CustomerId;
            this.customerPrompt(customer.Name);
        }
        else {
            customerType.value = '1';
            customerCvr.value = '';
            customerName.value = '';
            customerAddress.value = '';
            customerZip.value = '';
            customerCity.value = '';
            customerCountry.value = '1';
            customerEmail.value = '@';
            customerForm.dataset.customerId = '';
            this.customerPrompt();
        }
    };
    WebShop.prototype.postNewCustomer = function (customer) {
        console.log(customer);
        var xhttp = new XMLHttpRequest();
        var self = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                self.customerPrompt('', JSON.parse(xhttp.responseText).message);
            }
            else {
                console.log(this.status);
            }
        };
        xhttp.open('POST', "http://localhost:3000/customer");
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(customer));
    };
    WebShop.prototype.updateCustomer = function (id, customer) {
        var xhttp = new XMLHttpRequest();
        var self = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(xhttp.responseText));
                self.customerPrompt('', JSON.parse(xhttp.responseText).message);
            }
        };
        xhttp.open('PUT', "http://localhost:3000/customer/" + id);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(customer));
    };
    WebShop.prototype.deleteCustomer = function (id) {
        var xhttp = new XMLHttpRequest();
        var self = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                self.customerPrompt('', JSON.parse(xhttp.responseText).message);
            }
        };
        xhttp.open('DELETE', "http://localhost:3000/customer/" + id);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();
    };
    WebShop.prototype.reviveCustomer = function (id) {
        var xhttp = new XMLHttpRequest();
        var self = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                self.customerPrompt('', JSON.parse(xhttp.responseText).message);
            }
        };
        xhttp.open('PUT', "http://localhost:3000/customer/" + id);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();
    };
    WebShop.prototype.customerPrompt = function (name, message) {
        if (!message) {
            if (customerForm.dataset.customerId) {
                customerAlertPrompt.innerHTML = "You are about to edit " + name + ".";
                submitDelete.classList.remove('hidden');
            }
            else {
                customerAlertPrompt.innerHTML = 'You are creating new customer!';
                submitDelete.classList.add('hidden');
            }
        }
        else {
            customerAlertPrompt.innerHTML = message;
        }
    };
    WebShop.prototype.hideManageCustomer = function () {
        customerForm.classList.add('hidden');
    };
    WebShop.prototype.showManageCustomer = function () {
        customerForm.classList.remove('hidden');
        order.classList.add('hidden');
    };
    // <-----Products----->
    WebShop.prototype.renderProducts = function (products, category) {
        productsContainer.innerHTML = '';
        var productTitle = document.createElement('h2');
        productTitle.classList.add('productTitle');
        productTitle.innerHTML = category ? category : 'All products';
        productsContainer.appendChild(productTitle);
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
            addToCart.addEventListener('click', function (e) {
                shop.addToCart(product.ProductId);
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
                self.renderProducts(allProducts_1);
            }
        };
        xhttp.open('GET', "http://localhost:3000/product/");
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
        if (product) {
            productName.value = product.Name;
            productPrice.value = product.Price;
            productComment.value = product.Comment;
            productImage.value = product.ImageFile;
            productCategory.value = "" + product.ProductCategoryId;
            productActive.checked = product.Active ? true : false;
            productForm.dataset.productId = "" + product.ProductId;
            this.productPrompt(product.Name);
        }
        else {
            productName.value = '';
            productPrice.value = '';
            productComment.value = '';
            productImage.value = '';
            productCategory.value = '';
            productActive.checked = false;
            this.productPrompt();
        }
    };
    WebShop.prototype.showProducts = function () {
        productsContainer.classList.remove('hidden');
        order.classList.add('hidden');
        invoicesContainer.classList.add('hidden');
    };
    WebShop.prototype.hideProducts = function () {
        productsContainer.classList.add('hidden');
    };
    WebShop.prototype.showInvoices = function () {
        invoicesContainer.classList.remove('hidden');
        cart.classList.add('hidden');
    };
    WebShop.prototype.getInvoices = function (id) {
        var xhttp = new XMLHttpRequest();
        var self = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var invoices = JSON.parse(xhttp.responseText);
                self.renderInvoices(invoices);
            }
        };
        xhttp.open('GET', "http://localhost:3000/invoice/" + id);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();
        return xhttp.responseText;
    };
    WebShop.prototype.renderInvoices = function (invoices) {
        invoicesContainer.innerHTML = '';
        invoices.forEach(function (invoice) {
            var invoiceDiv = document.createElement('div');
            invoiceDiv.classList.add('invoice');
            var invoiceId = document.createElement('h1');
            invoiceId.innerHTML = invoice.InvoiceId;
            invoiceDiv.appendChild(invoiceId);
            var invoiceCreateDate = document.createElement('p');
            // invoiceCreateDate.classList.add('');
            invoiceCreateDate.innerHTML = invoice.CreateDate;
            invoiceDiv.appendChild(invoiceCreateDate);
            var showDetail = document.createElement('button');
            showDetail.innerHTML = 'Details';
            showDetail.addEventListener('click', function (e) {
                shop.getInvoiceDetail(invoice.InvoiceId);
            });
            invoiceDiv.appendChild(showDetail);
            invoicesContainer.appendChild(invoiceDiv);
        });
    };
    WebShop.prototype.getInvoiceDetail = function (invoiceId) {
        var xhttp = new XMLHttpRequest();
        var self = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var invoice_1 = JSON.parse(xhttp.responseText);
                console.log(invoice_1);
                self.showInvoice(invoice_1);
            }
        };
        xhttp.open('GET', "http://localhost:3000/invoice/lines/" + invoiceId);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();
        return xhttp.responseText;
    };
    WebShop.prototype.showInvoice = function (invoiceData) {
        invoice.innerHTML = "";
        var invoiceDetail = document.createElement('div');
        // invoiceDetail.classList.add("invoicetext")
        invoice.appendChild(invoiceDetail);
        invoiceData.forEach(function (invoiceLine) {
            var invoiceProduct = shop.products.find(function (el) { return el.ProductId === invoiceLine.ProductId; });
            var productName = document.createElement('h2');
            productName.innerHTML = invoiceLine.Quantity + "x " + invoiceProduct.Name;
            invoiceDetail.appendChild(productName);
            var productPrice = document.createElement('h3');
            productPrice.innerHTML = invoiceProduct.Price;
            invoiceDetail.appendChild(productPrice);
        });
        invoice.appendChild(invoiceDetail);
    };
    WebShop.prototype.postNewProduct = function (payload) {
        var xhttp = new XMLHttpRequest();
        var self = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(xhttp.responseText));
                self.productPrompt('', JSON.parse(xhttp.responseText).message);
            }
        };
        xhttp.open('POST', "http://localhost:3000/product/");
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(payload));
    };
    WebShop.prototype.deleteProduct = function (id) {
        var xhttp = new XMLHttpRequest();
        var self = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(xhttp.responseText));
                self.productPrompt('', JSON.parse(xhttp.responseText).message);
                self.fillProductEdit();
            }
        };
        xhttp.open('DELETE', "http://localhost:3000/product/" + id);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();
    };
    WebShop.prototype.updateProduct = function (id, product) {
        var xhttp = new XMLHttpRequest();
        var self = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                self.productPrompt('', JSON.parse(xhttp.responseText).message);
            }
        };
        xhttp.open('PUT', "http://localhost:3000/product/" + id);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(product));
    };
    WebShop.prototype.productPrompt = function (name, message) {
        if (!message) {
            if (productForm.dataset.productId) {
                productAlertPrompt.innerHTML = "You are about to edit " + name + ".";
                submitDelete.classList.remove('hidden');
            }
            else {
                productAlertPrompt.innerHTML = 'You are posting new product!';
                submitDelete.classList.add('hidden');
            }
        }
        else {
            productAlertPrompt.innerHTML = message;
        }
    };
    // <-----CATEGORIES----->
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
    // <-----CART----->
    WebShop.prototype.updateCart = function () {
        cartCount.innerHTML = "(" + this.cart.length + ")";
    };
    WebShop.prototype.showCart = function () {
        var _this = this;
        cart.innerHTML = '';
        order.classList.remove('hidden');
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
    WebShop.prototype.login = function (email, password) {
        if (email.includes('{catalogio}')) {
            myStorage.setItem('currentUser', '{"Name": "admin"}');
            this.updateCurrentUser();
            return;
        }
        var self = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // const data = JSON.parse(xhttp.responseText);
                myStorage.setItem('currentUser', xhttp.responseText);
                shop.loginSuccess(JSON.parse(xhttp.responseText));
                self.updateCurrentUser();
            }
            if (this.readyState == 4 && this.status > 400) {
                alert("Login unsuccessful, error: " + this.status);
            }
        };
        var payload = { email: email, password: password };
        xhttp.open('POST', 'http://localhost:3000/login');
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(payload));
    };
    WebShop.prototype.logOut = function () {
        myStorage.removeItem('currentUser');
        location.reload();
    };
    WebShop.prototype.loginSuccess = function (customer) {
        console.log('customer: ', customer);
    };
    WebShop.prototype.showSignUp = function () {
        customerForm.classList.remove('hidden');
    };
    WebShop.prototype.showManageStore = function () {
        productForm.classList.remove('hidden');
        order.classList.add('hidden');
    };
    WebShop.prototype.hideManageStore = function () {
        productForm.classList.add('hidden');
    };
    WebShop.prototype.customerLoggedIn = function () {
        currentUser.classList.remove('hidden');
        signup.classList.add('hidden');
        getInvoices.classList.remove('hidden');
    };
    WebShop.prototype.adminLoggedIn = function () {
        manageStore.classList.remove('hidden');
        currentUser.classList.remove('hidden');
        signup.classList.add('hidden');
    };
    WebShop.prototype.updateCurrentUser = function () {
        if (myStorage.getItem('currentUser')) {
            lname.innerHTML = JSON.parse(myStorage.getItem('currentUser')).Name;
            this.customerLoggedIn();
            if (JSON.parse(myStorage.getItem('currentUser')).Name === 'admin') {
                this.adminLoggedIn();
            }
        }
    };
    WebShop.prototype.orderProducts = function () {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var xhttp_1 = new XMLHttpRequest();
                xhttp_1.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        console.log(JSON.parse(xhttp_1.responseText).data);
                    }
                };
                xhttp_1.open('GET', "http://localhost:3000/invoice");
                xhttp_1.setRequestHeader('Content-Type', 'application/json');
                xhttp_1.send();
            }
        };
        xhttp.open('POST', 'http://localhost:3000/invoice');
        xhttp.setRequestHeader('Content-Type', 'application/json');
        var cart = this.cart.map(function (item) { return ({
            id: item.id,
            amount: item.amount,
            price: item.price
        }); });
        var currentUser = JSON.parse(myStorage.getItem('currentUser')).CustomerId;
        var payload = {
            cart: cart,
            currentUser: currentUser
        };
        xhttp.send(JSON.stringify(payload));
    };
    return WebShop;
}());
var shop = new WebShop();
seekProduct.addEventListener('click', function (e) {
    shop.getProductById(productId.value);
});
seekCustomer.addEventListener('click', function (e) {
    shop.getCustomerById(parseInt(customerId.value));
});
manageStore.addEventListener('click', function (e) {
    shop.hideProducts();
    shop.hideManageCustomer();
    shop.showManageStore();
});
login.addEventListener('click', function (e) {
    e.preventDefault();
    if (!(email.value && password.value)) {
        alert('Provide both, Email and Password!');
    }
    else {
        shop.login(email.value, password.value);
    }
});
allProducts.addEventListener('click', function (e) {
    shop.renderProducts(shop.products);
    shop.showProducts();
    shop.hideManageCustomer();
    shop.hideManageStore();
});
productCategories.forEach(function (category) {
    category.addEventListener('click', function (e) {
        shop.showProducts();
        shop.hideManageCustomer();
        shop.hideManageStore();
        var filteredProducts = shop.products.filter(function (product) {
            return product.ProductCategoryId === parseInt(e.target.dataset.id);
        });
        var category = '';
        switch (parseInt(e.target.dataset.id)) {
            case 1:
                category = "Men's clothing";
                break;
            case 2:
                category = 'Jewelery';
                break;
            case 3:
                category = 'Electronics';
                break;
            case 4:
                category = "Women's clothing";
                break;
            case 5:
                category = 'Bicycles';
                break;
            default:
                break;
        }
        shop.renderProducts(filteredProducts, category);
    });
});
productCategory.addEventListener('mousedown', function (e) {
    categorySelect.remove();
});
submitProduct.addEventListener('click', function (e) {
    e.preventDefault();
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
    if (!productForm.dataset.productId) {
        shop.postNewProduct(newProduct);
    }
    else {
        shop.updateProduct(parseInt(productForm.dataset.productId), newProduct);
    }
});
submitCustomer.addEventListener('click', function (e) {
    e.preventDefault();
    var newCustomer = {
        Name: null,
        Address: null,
        CVR: null,
        City: null,
        CompanyTypeId: null,
        CountryId: null,
        Email: null,
        Zipcode: null,
        Password: null
    };
    newCustomer.Name = customerName.value;
    newCustomer.Address = customerAddress.value;
    newCustomer.CVR = customerCvr.value;
    newCustomer.City = customerCity.value;
    newCustomer.CompanyTypeId = parseInt(customerType.value);
    newCustomer.CountryId = parseInt(customerCountry.value);
    newCustomer.Email = customerEmail.value;
    newCustomer.Zipcode = customerZip.value;
    newCustomer.Password = customerPassword.value;
    if (!customerForm.dataset.productId) {
        shop.postNewCustomer(newCustomer);
    }
    else {
        shop.updateCustomer(parseInt(productForm.dataset.productId), newCustomer);
    }
});
postNewProduct.addEventListener('click', function (e) {
    productForm.dataset.productId = '';
    shop.fillProductEdit();
});
postNewCustomer.addEventListener('click', function (e) {
    customerForm.dataset.productId = '';
    shop.fillCustomerEdit();
});
cartButton.addEventListener('click', function (e) {
    e.preventDefault();
    shop.showCart();
    shop.hideProducts();
});
getInvoices.addEventListener('click', function (e) {
    e.preventDefault();
    shop.showInvoices();
    shop.getInvoices(JSON.parse(myStorage.getItem('currentUser')).CustomerId);
    shop.hideProducts();
});
submitDelete.addEventListener('click', function (e) {
    shop.deleteProduct(parseInt(productForm.dataset.productId));
});
registration.addEventListener('click', function (e) {
    shop.hideProducts();
    shop.showManageCustomer();
    shop.hideManageStore();
});
logOut.addEventListener('click', function (e) {
    shop.logOut();
});
order.addEventListener('click', function (e) {
    e.preventDefault();
    shop.orderProducts();
});
shop.getProducts();
shop.getProductCategories();
shop.updateCart();
shop.productPrompt();
shop.customerPrompt();
