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
  let res = [];
  rows.forEach((item) => {
    res.push(item);
  });
  return res;
}

async function postNewCustomer({ CompanyTypeId, CompanyName, CVR, Name, Address, Zipcode, City, CountryId, Phone, Email, Comment, CreateDate, ModifiedDate, Active,
}) {
  const res = await db.query(
    `INSERT INTO customer (CompanyTypeId, CompanyName, CVR, Name, Address, Zipcode, City, CountryId, Phone, Email, Comment, CreateDate, ModifiedDate, Active) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [ CompanyTypeId, CompanyName, CVR, Name, Address, Zipcode, City, CountryId, Phone, Email, Comment, CreateDate, ModifiedDate, Active, ]
  );
  if (res.affectedRows) {
    return `New customer added! /n ${JSON.stringify(res)}`;
  }
}

// async function deleteCustomer({ id }) {
//   console.log(id);
//   const res = await db.query(`DELETE FROM customer WHERE customerId=?`, [id]);

//   if (res.affectedRows) {
//     return `Customer deleted!`;
//   }
// }

async function deleteCustomer({ id }) {
  console.log(id);
  const res = await db.query(`UPDATE customer SET Active = 0 WHERE customerId=?`, [id]);

  if (res.affectedRows) {
    return `Customer deactevated!`;
  }
}

async function reviveCustomer({ id }) {
  console.log(id);
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
  reviveCustomer
};
