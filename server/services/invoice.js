const { query } = require('./db');
const { asyncForEach } = require('../helper');
const easyinvoice = require('easyinvoice');

const createNewInvoice = async (currentUser, cart) => {
  const invoiceLines = [];
  const newInvoice = await query(`
  INSERT INTO invoice (CustomerId, CreateDate, ModifiedDate) VALUES (${currentUser}, NOW(), NOW());`);
  const res = await query(
    `SELECT * FROM invoice ORDER BY InvoiceId DESC LIMIT 0, 1`
  );
  await asyncForEach(cart, async ({ id, price, amount }) => {
    const invoiceLine = await query(`
    INSERT INTO invoiceline (InvoiceId, ProductId, Price, Quantity) VALUES (${res[0].InvoiceId}, ${id}, ${price}, ${amount});`);
    invoiceLines.push(invoiceLine);
  });

  // console.log('RES ' + JSON.stringify(res));
  return invoiceLines;
};

const getInvoices = async () => {
  const invoices = await query(`
    SELECT * FROM invoice
      INNER JOIN customer
      ON invoice.customerid = customer.customerid
  `);
  return invoices;
};

const getInvoiceLines = async (id) => {
  const invoiceLines = await query(
    `SELECT * FROM invoiceline WHERE invoiceline.invoiceid = (?)`,
    [id]
  );

  return invoiceLines;
};

module.exports = { createNewInvoice, getInvoices, getInvoiceLines };
