const {
  createNewInvoice,
  getInvoices,
  getInvoiceLines,
} = require('../services/invoice');
const express = require('express');
const router = express.Router();
router.post('/', async (req, res, next) => {
  try {
    const newInvoice = await createNewInvoice(
      req.body.currentUser,
      req.body.cart
    );
    res.send(JSON.stringify(newInvoice));
  } catch (err) {
    console.error(`Error while creating an invoice`, err.message);
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const invoices = await getInvoices(req.params.id);
    res.send(JSON.stringify(invoices));
  } catch (err) {
    console.error(`Error while getting an invoice`, err.message);
    next(err);
  }
});

router.get('/lines/:id', async (req, res, next) => {
  try {
    const invliceLines = await getInvoiceLines(req.params.id);
    res.send(JSON.stringify(invliceLines));
  } catch (err) {
    console.error(`Error while getting an invoice line`, err.message);
    next(err);
  }
});

module.exports = router;
