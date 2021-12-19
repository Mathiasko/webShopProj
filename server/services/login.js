const db = require('./db');
const bcrypt = require('bcryptjs');

async function matchUserEmailAndPassword({ email, password }) {
  const res = await db.query(
    `SELECT * FROM customer
    INNER JOIN customerpassword
        ON customer.customerid = customerpassword.FK_CustomerId
        WHERE customer.email = (?)`,
    [email]
  );
  if (res.length > 1) {
    throw { statusCode: 500, message: 'DB is corrupt' };
  } else if (res.length === 0) {
    throw { statusCode: 404, message: 'Customer not found' };
  }

  const match = await bcrypt.compare(password, res[0].hashedPassword);
  if (!match) throw { statusCode: 404, message: 'User not found' };
  else {
    console.log('MATCH!');
  }

  return res[0];
}

module.exports = {
  matchUserEmailAndPassword,
};
