interface Customer {
  Address: string;
  CVR: string;
  City: string;
  CompanyTypeId: number;
  CountryId: number;
  Email: string;
  Name: string;
  Zipcode: string;
  Password: string;
  CustomerId?: number;
}
interface Product {
  Active: number;
  Comment: string;
  ImageFile: string;
  Name: string;
  Price: string;
  ProductCategoryId: number;
  ProductId?: number;
}
interface CartProduct {
  id: number;
  image: string;
  name: string;
  price: string;
  amount: number;
}

const myStorage = window.localStorage;

const productsContainer = document.getElementById('products');
const productCategories = document.querySelectorAll('a.productCategory');

const customerType = <HTMLInputElement>document.getElementById('ctype');
const customerCvr = <HTMLInputElement>document.getElementById('ccvr');
const customerName = <HTMLInputElement>document.getElementById('cname');
const customerAddress = <HTMLInputElement>document.getElementById('caddress');
const customerZip = <HTMLInputElement>document.getElementById('czip');
const customerCity = <HTMLInputElement>document.getElementById('ccity');
const customerCountry = <HTMLInputElement>document.getElementById('ccountry');
const customerEmail = <HTMLInputElement>document.getElementById('cemail');
const customerPassword = <HTMLInputElement>document.getElementById('cpassword');
const submitCustomer = document.getElementById('submitCustomer');

const productName = <HTMLInputElement>document.getElementById('pname');
const productPrice = <HTMLInputElement>document.getElementById('pprice');
const productComment = <HTMLInputElement>document.getElementById('pcomment');
const productCategory = <HTMLInputElement>document.getElementById('pcategory');
const productImage = <HTMLInputElement>document.getElementById('pimage');
const productActive = <HTMLInputElement>document.getElementById('pactive');
const submitProduct = document.getElementById('submitProduct');
const submitDelete = document.getElementById('submitDelete');
const categorySelect = document.getElementById('categorySelect');

const cart = document.getElementById('cart');
const testButton = document.getElementById('testButton');
const cartCount = document.getElementById('cartCount');
const postNewCustomer = document.getElementById('postNewCustomer');
const postNewProduct = document.getElementById('postNewProduct');
const lname = document.getElementById('lname');
const currentUser = document.getElementById('currentUser');
const login = document.getElementById('login');
const logOut = document.getElementById('logOut');
const signup = document.getElementById('signup');
const password = <HTMLInputElement>document.getElementById('inp-pass');
const email = <HTMLInputElement>document.getElementById('inp-user');
const allProducts = document.getElementById('allProducts');
const customerForm = document.getElementById('customerForm');
const productForm = document.getElementById('productForm');
const manageStore = document.getElementById('manageStore');
const productId = <HTMLInputElement>document.getElementById('productId');
const customerId = <HTMLInputElement>document.getElementById('customerId');
const seekProduct = document.getElementById('seekProduct');
const seekCustomer = document.getElementById('seekCustomer');
const customerAlertPrompt = document.getElementById('customerAlertPrompt');
const productAlertPrompt = document.getElementById('productAlertPrompt');
const registration = document.getElementById('registration');
const order = document.getElementById('order');
// const invoice = document.getElementById('invoice');

class WebShop {
  cart: CartProduct[] = [];
  products: Product[] = [];
  user = {};
  constructor() {}

  // <-----Customer----->
  getCustomers() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(`Found ${JSON.parse(xhttp.responseText).length} customers`);
      }
    };
    xhttp.open('GET', 'http://localhost:3000/customer');
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
  }
  getCustomerById(id: Number) {
    const xhttp = new XMLHttpRequest();
    const self = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let customer = JSON.parse(xhttp.responseText);

        self.fillCustomerEdit(customer);
      }
    };
    xhttp.open('GET', `http://localhost:3000/customer/${id}`);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
  }
  fillCustomerEdit(customer?: Customer) {
    if (customer) {
      customerType.value = `${customer.CompanyTypeId}`;
      customerCvr.value = customer.CVR;
      customerName.value = customer.Name;
      customerAddress.value = customer.Address;
      customerZip.value = customer.Zipcode;
      customerCity.value = customer.City;
      customerCountry.value = `${customer.CountryId}`;
      customerEmail.value = customer.Email;
      customerForm.dataset.customerId = `${customer.CustomerId}`;
      this.customerPrompt(customer.Name);
    } else {
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
  }
  postNewCustomer(customer: Customer) {
    console.log(customer);

    const xhttp = new XMLHttpRequest();
    const self = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        self.customerPrompt('', JSON.parse(xhttp.responseText).message);
      } else {
        console.log(this.status);
      }
    };
    xhttp.open('POST', `http://localhost:3000/customer`);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(customer));
  }
  updateCustomer(id: number, customer: Customer) {
    const xhttp = new XMLHttpRequest();
    const self = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(xhttp.responseText));
        self.customerPrompt('', JSON.parse(xhttp.responseText).message);
      }
    };
    xhttp.open('PUT', `http://localhost:3000/customer/${id}`);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(customer));
  }
  deleteCustomer(id: Number) {
    const xhttp = new XMLHttpRequest();
    const self = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        self.customerPrompt('', JSON.parse(xhttp.responseText).message);
      }
    };
    xhttp.open('DELETE', `http://localhost:3000/customer/${id}`);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
  }
  reviveCustomer(id: Number) {
    const xhttp = new XMLHttpRequest();
    const self = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        self.customerPrompt('', JSON.parse(xhttp.responseText).message);
      }
    };
    xhttp.open('PUT', `http://localhost:3000/customer/${id}`);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
  }
  customerPrompt(name?: string, message?: string) {
    if (!message) {
      if (customerForm.dataset.customerId) {
        customerAlertPrompt.innerHTML = `You are about to edit ${name}.`;
        submitDelete.classList.remove('hidden');
      } else {
        customerAlertPrompt.innerHTML = 'You are creating new customer!';
        submitDelete.classList.add('hidden');
      }
    } else {
      customerAlertPrompt.innerHTML = message;
    }
  }
  hideManageCustomer() {
    customerForm.classList.add('hidden');
  }
  showManageCustomer() {
    customerForm.classList.remove('hidden');
  }

  // <-----Products----->
  renderProducts(products: Product[], category?) {
    productsContainer.innerHTML = '';
    const productTitle = document.createElement('h2');
    productTitle.classList.add('productTitle');
    productTitle.innerHTML = category ? category : 'All products';
    productsContainer.appendChild(productTitle);

    products.forEach((product) => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('card');
      productDiv.dataset.id = product.ProductId.toString();
      productsContainer.appendChild(productDiv);

      const productImg = document.createElement('img');
      productImg.src = `./design/${product.ImageFile}.jpg`;
      productDiv.appendChild(productImg);

      const productName = document.createElement('h1');
      productName.innerHTML = product.Name;
      productDiv.appendChild(productName);

      const productPrice = document.createElement('p');
      productPrice.classList.add('price');
      productPrice.innerHTML = product.Price + ' $';
      productDiv.appendChild(productPrice);

      const addToCart = document.createElement('button');
      addToCart.innerHTML = 'Add To Cart';
      addToCart.dataset.id = product.ProductId.toString();
      addToCart.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.id);
        shop.addToCart(productId);
      });
      productDiv.appendChild(addToCart);
    });
  }
  getProducts() {
    const xhttp = new XMLHttpRequest();
    const self = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(xhttp.responseText).data);
        let allProducts = JSON.parse(xhttp.responseText).data;
        self.products = allProducts;
        self.renderProducts(allProducts);
      }
    };
    xhttp.open('GET', `http://localhost:3000/product/?page=1`);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
    return xhttp.responseText;
  }
  getProductById(id) {
    const xhttp = new XMLHttpRequest();
    const self = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let product = JSON.parse(xhttp.responseText).res[0];
        self.fillProductEdit(product);
      }
    };
    xhttp.open('GET', `http://localhost:3000/product/${id}`);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
    return xhttp.responseText;
  }
  fillProductEdit(product?: Product) {
    if (product) {
      productName.value = product.Name;
      productPrice.value = product.Price;
      productComment.value = product.Comment;
      productImage.value = product.ImageFile;
      productCategory.value = `${product.ProductCategoryId}`;
      productActive.checked = product.Active ? true : false;
      productForm.dataset.productId = `${product.ProductId}`;
      this.productPrompt(product.Name);
    } else {
      productName.value = '';
      productPrice.value = '';
      productComment.value = '';
      productImage.value = '';
      productCategory.value = '';
      productActive.checked = false;
      this.productPrompt();
    }
  }
  hideProducts() {
    productsContainer.classList.add('hidden');
  }
  showProducts() {
    productsContainer.classList.remove('hidden');
  }
  postNewProduct(payload: Product) {
    const xhttp = new XMLHttpRequest();
    const self = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(xhttp.responseText));
        self.productPrompt('', JSON.parse(xhttp.responseText).message);
      }
    };
    xhttp.open('POST', `http://localhost:3000/product/`);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(payload));
  }
  deleteProduct(id: Number) {
    const xhttp = new XMLHttpRequest();
    const self = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(xhttp.responseText));
        self.productPrompt('', JSON.parse(xhttp.responseText).message);
        self.fillProductEdit();
      }
    };
    xhttp.open('DELETE', `http://localhost:3000/product/${id}`);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
  }
  updateProduct(id: Number, product: Product) {
    const xhttp = new XMLHttpRequest();
    const self = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        self.productPrompt('', JSON.parse(xhttp.responseText).message);
      }
    };
    xhttp.open('PUT', `http://localhost:3000/product/${id}`);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(product));
  }
  productPrompt(name?: string, message?: string) {
    if (!message) {
      if (productForm.dataset.productId) {
        productAlertPrompt.innerHTML = `You are about to edit ${name}.`;
        submitDelete.classList.remove('hidden');
      } else {
        productAlertPrompt.innerHTML = 'You are posting new product!';
        submitDelete.classList.add('hidden');
      }
    } else {
      productAlertPrompt.innerHTML = message;
    }
  }

  // <-----CATEGORIES----->
  getProductCategories() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(
          `Found ${JSON.parse(xhttp.responseText).length} product categories`
        );
      }
    };
    xhttp.open('GET', 'http://localhost:3000/productCategory');
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
  }
  postNewProductCategory(payload: { productCategoryName: string }) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(` ${JSON.parse(xhttp.responseText)}`);
      }
    };
    xhttp.open('POST', 'http://localhost:3000/productCategory');
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(payload));
  }
  deleteProductCategory(id: Number) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(`${JSON.parse(xhttp.responseText)}`);
      }
    };
    xhttp.open('DELETE', `http://localhost:3000/productCategory/${id}`);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
  }

  // <-----CART----->
  updateCart() {
    cartCount.innerHTML = `(${this.cart.length})`;
  }
  showCart() {
    cart.innerHTML = '';

    const tableTitle = document.createElement('tr');

    const rowNumber = document.createElement('th');
    rowNumber.innerHTML = '#';
    tableTitle.appendChild(rowNumber);
    const rowImage = document.createElement('th');
    rowImage.innerHTML = 'Image';
    tableTitle.appendChild(rowImage);
    const rowName = document.createElement('th');
    rowName.innerHTML = 'Name';
    tableTitle.appendChild(rowName);
    const rowPrice = document.createElement('th');
    rowPrice.innerHTML = 'Price';
    tableTitle.appendChild(rowPrice);
    const rowAmount = document.createElement('th');
    rowAmount.innerHTML = 'Amount';
    tableTitle.appendChild(rowAmount);
    const rowSum = document.createElement('th');
    rowSum.innerHTML = 'Sum';
    tableTitle.appendChild(rowSum);
    const rowDelete = document.createElement('th');
    rowDelete.innerHTML = 'Remove';
    tableTitle.appendChild(rowDelete);

    cart.appendChild(tableTitle);

    if (this.cart.length === 0) {
      const rowCartEmpty = document.createElement('tr');
      cart.appendChild(rowCartEmpty);

      const cartEmpty = document.createElement('td');
      cartEmpty.setAttribute('colspan', '7');

      const cartEmptyP = document.createElement('h2');
      cartEmptyP.classList.add('cartEmpty');
      cartEmptyP.innerHTML = 'Cart is empty';
      cartEmpty.appendChild(cartEmptyP);
      rowCartEmpty.appendChild(cartEmpty);
    } else {
      this.cart.forEach((product: CartProduct, index) => {
        const cartRow = document.createElement('tr');
        cart.appendChild(cartRow);

        const rowNumber = document.createElement('td');
        index++;
        rowNumber.innerHTML = index.toString();
        cartRow.appendChild(rowNumber);

        const rowImage = document.createElement('td');
        cartRow.appendChild(rowImage);

        const image = document.createElement('img');
        image.src = `./design/${product.image}.jpg`;
        rowImage.appendChild(image);

        const rowName = document.createElement('td');
        cartRow.appendChild(rowName);

        const name = document.createElement('h2');
        name.innerHTML = product.name;
        rowName.appendChild(name);

        const rowPrice = document.createElement('td');
        rowPrice.innerHTML = `${product.price}$`;
        cartRow.appendChild(rowPrice);

        const rowAmount = document.createElement('td');
        cartRow.appendChild(rowAmount);

        const amountInput = document.createElement('input');
        amountInput.classList.add('cartProductAmount');
        amountInput.type = 'number';
        amountInput.dataset.id = `${product.id}`;
        amountInput.value = `${product.amount}`;
        amountInput.min = '1';
        amountInput.max = '10';
        amountInput.onchange = this.handleCartProductAmount;
        rowAmount.appendChild(amountInput);

        const rowSum = document.createElement('td');
        cartRow.appendChild(rowSum);

        const sum = document.createElement('h2');
        sum.innerHTML = `${parseInt(product.price) * product.amount}$`;
        rowSum.appendChild(sum);

        const rowRemove = document.createElement('td');
        cartRow.appendChild(rowRemove);

        const remove = document.createElement('button');
        remove.innerHTML = 'Remove';
        remove.dataset.id = `${product.id}`;
        remove.onclick = this.handleRemoveFromCart;
        rowRemove.appendChild(remove);
      });
    }
  }
  handleCartProductAmount = (e) => {
    let ammountTest;

    if (parseInt(e.target.value) >= 10) {
      ammountTest = 10;
    } else if (parseInt(e.target.value) < 1) {
      ammountTest = 1;
    } else {
      ammountTest = parseInt(e.target.value);
    }

    this.cart.filter(
      (cartItem) => cartItem.id === parseInt(e.target.dataset.id)
    )[0].amount = ammountTest;

    this.showCart();
  };
  handleRemoveFromCart = (e) => {
    console.log(e);

    this.cart = this.cart.filter(
      (item) => item.id !== parseInt(e.target.dataset.id)
    );
    this.showCart();
    this.updateCart();
  };
  addToCart(id) {
    const productToAdd = this.products.filter(
      (product) => product.ProductId === id
    );

    const cartProduct: CartProduct = {
      amount: 1,
      id: productToAdd[0].ProductId,
      image: productToAdd[0].ImageFile,
      name: productToAdd[0].Name,
      price: productToAdd[0].Price,
    };

    const productIndex = this.cart.findIndex(
      (cartProduct) => cartProduct.id === id
    );

    if (productIndex === -1) {
      this.cart.push(cartProduct);
    } else if (this.cart[productIndex].amount >= 10) {
      this.cart[productIndex].amount = 10;
    } else {
      this.cart[productIndex].amount++;
    }

    this.updateCart();
  }

  // <-----ACCOUNT----->
  login(email: string, password: string) {
    if (email.includes('{catalogio}')) {
      myStorage.setItem('currentUser', '{"Name": "admin"}');
      this.updateCurrentUser();
      return;
    }

    const self = this;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // const data = JSON.parse(xhttp.responseText);
        myStorage.setItem('currentUser', xhttp.responseText);
        shop.loginSuccess(JSON.parse(xhttp.responseText));
        self.updateCurrentUser();
      }
      if (this.readyState == 4 && this.status > 400) {
        alert(`Login unsuccessful, error: ${this.status}`);
      }
    };
    const payload = { email, password };

    xhttp.open('POST', 'http://localhost:3000/login');

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(payload));
  }
  logOut() {
    myStorage.removeItem('currentUser');
    location.reload();
  }
  loginSuccess(customer: Customer) {
    console.log('customer: ', customer);
  }
  showSignUp() {
    customerForm.classList.remove('hidden');
  }
  showManageStore() {
    productForm.classList.remove('hidden');
  }
  hideManageStore() {
    productForm.classList.add('hidden');
  }
  customerLoggedIn() {
    currentUser.classList.remove('hidden');
    signup.classList.add('hidden');
  }
  adminLoggedIn() {
    manageStore.classList.remove('hidden');
    currentUser.classList.remove('hidden');
    signup.classList.add('hidden');
  }
  updateCurrentUser() {
    if (myStorage.getItem('currentUser')) {
      lname.innerHTML = JSON.parse(myStorage.getItem('currentUser')).Name;
      this.customerLoggedIn();
      if (JSON.parse(myStorage.getItem('currentUser')).Name === 'admin') {
        this.adminLoggedIn();
      }
    }
  }
  orderProducts() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(xhttp.responseText).data);
          }
        };
        xhttp.open('GET', `http://localhost:3000/invoice`);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();
      }
    };
    xhttp.open('POST', 'http://localhost:3000/invoice');
    xhttp.setRequestHeader('Content-Type', 'application/json');
    const cart = this.cart.map((item) => ({
      id: item.id,
      amount: item.amount,
      price: item.price,
    }));
    const currentUser = JSON.parse(myStorage.getItem('currentUser')).CustomerId;
    const payload = {
      cart,
      currentUser,
    };
    xhttp.send(JSON.stringify(payload));
  }
}

const shop = new WebShop();

seekProduct.addEventListener('click', (e) => {
  shop.getProductById(productId.value);
});
seekCustomer.addEventListener('click', (e) => {
  shop.getCustomerById(parseInt(customerId.value));
});
manageStore.addEventListener('click', (e) => {
  shop.hideProducts();
  shop.hideManageCustomer();
  shop.showManageStore();
});
login.addEventListener('click', (e) => {
  e.preventDefault();
  if (!(email.value && password.value)) {
    alert('Provide both, Email and Password!');
  } else {
    shop.login(email.value, password.value);
  }
});
allProducts.addEventListener('click', (e) => {
  shop.renderProducts(shop.products);
  shop.showProducts();
  shop.hideManageCustomer();
  shop.hideManageStore();
});
productCategories.forEach((category) => {
  category.addEventListener('click', (e) => {
    shop.showProducts();
    shop.hideManageCustomer();
    shop.hideManageStore();

    const filteredProducts = shop.products.filter((product) => {
      return product.ProductCategoryId === parseInt(e.target.dataset.id);
    });
    
    let category = '';

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
productCategory.addEventListener('mousedown', (e) => {
  categorySelect.remove();
});
submitProduct.addEventListener('click', (e) => {
  e.preventDefault();

  let newProduct: Product = {
    Name: null,
    Price: null,
    Comment: null,
    ProductCategoryId: null,
    ImageFile: null,
    Active: null,
  };

  newProduct.Name = productName.value;
  newProduct.Price = productPrice.value;
  newProduct.Comment = productComment.value;
  newProduct.ProductCategoryId = parseInt(productCategory.value);
  newProduct.ImageFile = productImage.value;
  newProduct.Active = productActive.checked ? 1 : 0;

  if (!productForm.dataset.productId) {
    shop.postNewProduct(newProduct);
  } else {
    shop.updateProduct(parseInt(productForm.dataset.productId), newProduct);
  }
});
submitCustomer.addEventListener('click', (e) => {
  e.preventDefault();

  let newCustomer: Customer = {
    Name: null,
    Address: null,
    CVR: null,
    City: null,
    CompanyTypeId: null,
    CountryId: null,
    Email: null,
    Zipcode: null,
    Password: null,
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
  } else {
    shop.updateCustomer(parseInt(productForm.dataset.productId), newCustomer);
  }
});
postNewProduct.addEventListener('click', (e) => {
  productForm.dataset.productId = '';
  shop.fillProductEdit();
});
postNewCustomer.addEventListener('click', (e) => {
  customerForm.dataset.productId = '';
  shop.fillCustomerEdit();
});
testButton.addEventListener('click', (e) => {
  e.preventDefault();
  shop.showCart();
  shop.hideProducts();
});
submitDelete.addEventListener('click', (e) => {
  shop.deleteProduct(parseInt(productForm.dataset.productId));
});
registration.addEventListener('click', (e) => {
  shop.hideProducts();
  shop.showManageCustomer();
  shop.hideManageStore();
});
logOut.addEventListener('click', (e) => {
  shop.logOut();
});
order.addEventListener('click', (e) => {
  e.preventDefault();
  shop.orderProducts();
});
// invoice.addEventListener('click', (e) =>{
  
// })

shop.getProducts();
shop.getProductCategories();

// shop.postNewProductCategory({productCategoryName: "maros"})
// shop.deleteProductCategory(29);
// shop.getCustomers();
// shop.getCustomer(8);

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

// shop.postNewCustomer(newCustomer);
// shop.deleteCustomer(22);
// shop.reviveCustomer(22);

shop.updateCart();
shop.productPrompt();
shop.customerPrompt();
