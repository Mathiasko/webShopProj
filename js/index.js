var WebShop = /** @class */ (function () {
    function WebShop() {
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
        console.log(payload);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("added");
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
                console.log(" " + JSON.parse(xhttp.responseText));
            }
        };
        xhttp.open('DELETE', "http://localhost:3000/productCategory/" + id);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();
    };
    return WebShop;
}());
var shop = new WebShop();
shop.getProductCategories();
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
    Zipcode: '6294',
};
// shop.postNewCustomer(newCustomer)
// shop.deleteCustomer(22);
// shop.reviveCustomer(22);
//# sourceMappingURL=index.js.map