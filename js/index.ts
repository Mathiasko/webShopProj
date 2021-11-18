interface Customer {
  Active: number;
  Address: string;
  CVR: string;
  City: string;
  Comment: null;
  CompanyName: string;
  CompanyTypeId: number;
  CountryId: number;
  CreateDate: string;
  Email: string;
  ModifiedDate: string;
  Name: string;
  Phone: string;
  Zipcode: string;
}
interface Product {
  Active: number;
  Comment: string;
  CreateDate: string;
  ImageFile: string;
  ModifiedDate: string;
  Name: string;
  PartNumber: string;
  Price: string;
  ProductCategoryId: number;
  ProductId: number;
}
interface CartProduct {
  id: number;
  image: string;
  name: string;
  price: string;
  amount: number;
}
const cutomerType = document.getElementById('ctype');
const customerCvr = document.getElementById('ccvr');
const customerName = document.getElementById('cname');
const customerAddress = document.getElementById('caddress');
const customerZip = document.getElementById('czip');
const customerCity = document.getElementById('ccity');
const customerCountry = document.getElementById('ccountry');
const customerEmail = document.getElementById('cemail');

const productName = document.getElementById('pname');
const productPrice = document.getElementById('pprice');
const productComment = document.getElementById('pcomment');
const productCategory = document.getElementById('pcategory');
const productImage = document.getElementById('pimage');
const productActive = document.getElementById('pactive');

const cart = document.getElementById('cart');
const testButton = document.getElementById('testButton');
const cartCount = document.getElementById('cartCount');

class WebShop {
  cart: CartProduct[] = [];
  products: Product[] = [];
  constructor() {}
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
  getCustomer(id: Number) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(`Found ${JSON.parse(xhttp.responseText)[0].Name}`);
        console.log(JSON.parse(xhttp.responseText)[0]);
      }
    };
    xhttp.open('GET', `http://localhost:3000/customer/${id}`);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
  }
  postNewCustomer(payload: Customer) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(`New customer added`);
      }
    };
    xhttp.open('POST', `http://localhost:3000/customer`);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(payload));
  }
  deleteCustomer(id: Number) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(xhttp.responseText));
      }
    };
    xhttp.open('DELETE', `http://localhost:3000/customer/${id}`);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
  }
  reviveCustomer(id: Number) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(xhttp.responseText));
      }
    };
    xhttp.open('PUT', `http://localhost:3000/customer/${id}`);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
  }
  getProducts() {
    const xhttp = new XMLHttpRequest();
    const self = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(xhttp.responseText).data);
        let allProducts = JSON.parse(xhttp.responseText).data;
        self.products = allProducts;

        const productsContainer = document.getElementById('products');

        allProducts.forEach((product: Product) => {
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
            shop.addToCart(parseInt(e.target.dataset.id));
            // shop.showCart();
          });
          productDiv.appendChild(addToCart);
        });
      }
    };
    xhttp.open('GET', `http://localhost:3000/product/?page=1`);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
    return xhttp.responseText;
  }
  postNewProduct(payload: Product) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(xhttp.responseText));
      }
    };
    xhttp.open('POST', `http://localhost:3000/product/`);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(payload));
  }
  deleteProduct(id: Number) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(xhttp.responseText));
      }
    };
    xhttp.open('DELETE', `http://localhost:3000/product/${id}`);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
  }
  updateProduct(id: Number, product: Product) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(xhttp.responseText));
      }
    };
    xhttp.open('PUT', `http://localhost:3000/product/${id}`);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(product));
  }
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

    cart.appendChild(tableTitle);

    if (this.cart.length === 0) {
      const cartEmpty = document.createElement('p');
      cartEmpty.innerHTML = 'cart is empty';
      cart.appendChild(cartEmpty);
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
  addToCart(id) {
    const productToAdd = this.products.filter(
      (product: Product) => product.ProductId === id
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
}

testButton.addEventListener('click', (e) => {
  e.preventDefault();
  shop.showCart();
});

const shop = new WebShop();

shop.getProductCategories();
shop.getProducts();
// shop.postNewProductCategory({productCategoryName: "maros"})
// shop.deleteProductCategory(29);
shop.getCustomers();
shop.getCustomer(8);
const newCustomer = {
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

const newProduct = {
  Active: 1,
  Comment: 'hmmmm dobra!',
  CreateDate: '2021-09-08T11:19:15.000Z',
  ImageFile: 'M215.jpg',
  ModifiedDate: '2021-10-13T11:19:15.000Z',
  Name: 'Ferkovica updated',
  PartNumber: 'V487XXA',
  Price: '139.01',
  ProductCategoryId: 9,
};
// shop.postNewProduct(newProduct);
// shop.deleteProduct(12);
// shop.updateProduct(11, newProduct)
shop.updateCart();
