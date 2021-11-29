const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
  const rows = await db.query(`SELECT * FROM product`);
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getProductById(id) {
  const res = await db.query(`SELECT * FROM product WHERE ProductId = (?)`, [ id, ]);
return {
    res,
  };
}

async function create(product) {
  const result = await db.query(
    `INSERT INTO product 
      (Name, Price, Comment, ProductCategoryId, ImageFile, Active) 
      VALUES 
      (?, ?, ?, ?, ?, ?)`,
    [ product.Name, product.Price, product.Comment, product.ProductCategoryId, product.ImageFile, product.Active, ]
  );

  let message = 'Error in creating product';
    if (result.affectedRows) {
    message = 'product created successfully';
  }
  return { message };
}

async function update(id, {Name, Price, Comment, ProductCategoryId, ImageFile, Active}) {
  const result = await db.query(
    `UPDATE product 
      SET Name=?, Price=?, Comment=?, ProductCategoryId=?, ImageFile=?, Active=?
      WHERE ProductId=?`,
    [ Name, Price, Comment, ProductCategoryId, ImageFile, Active, id, ]
  );

  let message = 'Error in updating product';
  if (result.affectedRows) {
    message = 'product updated successfully';
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(`DELETE FROM product WHERE productid=?`, [id]);

  let message = 'Error in deleting product';
  if (result.affectedRows) {
    message = 'product deleted successfully';
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
  getProductById,
};
