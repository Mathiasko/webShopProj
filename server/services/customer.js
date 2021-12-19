const db = require("./db");
const bcrypt = require('bcryptjs');
const { crypt } = require('../helper')

async function getCustomers() {
  const rows = await db.query(`SELECT * FROM customer`);
  let res = [];
  rows.forEach((item) => {
    res.push(item);
  });
  return res;
}

async function getCustomerById({ id }) {
  const rows = await db.query(
    `SELECT * FROM customer WHERE customer.customerId = (?)`,
    [id]
  );
  let res = {};
  rows.forEach((item) => {
    res = item;
  });
  return res;
}

async function postNewCustomer({ CompanyTypeId, CVR, Name, Address, Zipcode, City, CountryId, Email }, {Password}) {

  const hashedPassword = await bcrypt.hash(Password, crypt.saltRounds);
  console.log(hashedPassword);
  // const res = await db.query(
  //   `INSERT INTO customer (CompanyTypeId, CVR, Name, Address, Zipcode, City, CountryId, Email) VALUES (?,?,?,?,?,?,?,?);
  //   INSERT INTO customerpassword (FK_CustomerId, hashedPassword) VALUES (SCOPE_IDENTITY(), (?));`,
  //   [ CompanyTypeId, CVR, Name, Address, Zipcode, City, CountryId, Email, hashedPassword]
  // );
    return `New customer added! /n ${JSON.stringify(hashedPassword)}`;
}


// SELECT CustomerID, Name, Email FROM customer WHERE customerId = SCOPE_IDENTITY();

async function updateCustomer(id, { CompanyTypeId, CVR, Name, Address, Zipcode, City, CountryId, Email }) {
  const result = await db.query(
    `UPDATE customer 
      SET CompanyTypeId=?, CVR=?, Name=?, Address=?, Zipcode=?, City=?, CountryId=?, Email=?
      WHERE customerId=?`,
    [ CompanyTypeId, CVR, Name, Address, Zipcode, City, CountryId, Email, id ]
  );

  let message = 'Error in updating customer';

  if (result.affectedRows) {
    message = 'Customer updated successfully';
  }

  return { message };
}

// async function deleteCustomer({ id }) {
//   console.log(id);
//   const res = await db.query(`DELETE FROM customer WHERE customerId=?`, [id]);

//   if (res.affectedRows) {
//     return `Customer deleted!`;
//   }
// }

async function deleteCustomer({ id }) {
  const res = await db.query(`UPDATE customer SET Active = 0 WHERE customerId=?`, [id]);
  if (res.affectedRows) {
    return `Customer deactevated!`;
  }
}

async function reviveCustomer({ id }) {
  const res = await db.query(`UPDATE customer SET Active = 1 WHERE customerId=?`, [id]);
  if (res.affectedRows) {
    return `Customer Lives!`;
  }
}

module.exports = {
  getCustomers,
  getCustomerById,
  postNewCustomer,
  deleteCustomer,
  reviveCustomer,
  updateCustomer
};
