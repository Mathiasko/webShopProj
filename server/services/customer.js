const db = require("./db");

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

async function postNewCustomer({ CompanyTypeId, CVR, Name, Address, Zipcode, City, CountryId, Email}) {
  console.log(CompanyTypeId, CVR, Name, Address, Zipcode, City, CountryId, Email);
  const res = await db.query(
    `INSERT INTO customer (CompanyTypeId, CVR, Name, Address, Zipcode, City, CountryId, Email) VALUES (?,?,?,?,?,?,?,?)`,
    [ CompanyTypeId, CVR, Name, Address, Zipcode, City, CountryId, Email]
  );
  if (res.affectedRows) {
    return `New customer added! /n ${JSON.stringify(res)}`;
  }
}

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
