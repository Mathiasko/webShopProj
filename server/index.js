const express = require('express');
const bodyParser = require('body-parser');
const sessions = require('express-session');
const cors = require('cors');

const app = express();
const port = 3000;

const languagesRouter = require('./routes/language');
const productsRouter = require('./routes/product');
const productCategotyRouter = require('./routes/productCategory');
const customerRouter = require('./routes/customer');
const login = require('./routes/login');
const invoice = require('./routes/invoice');

app.use(
  cors({
    origin: 'http://127.0.0.1:5501',
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({ message: 'WEB SHOP' });
});

app.use('/language', languagesRouter);
app.use('/product', productsRouter);
app.use('/productCategory', productCategotyRouter);
app.use('/customer', customerRouter);
app.use('/login', login);
app.use('/invoice', invoice);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
