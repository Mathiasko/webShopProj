const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT * FROM product`);
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(product) {
  const result = await db.query(
    `INSERT INTO product 
      (PartNumber, Name, Price, Comment, ProductCategoryId, ImageFile, CreateDate, ModifiedDate, Active) 
      VALUES 
      (?, ?, ?, ?,?, ?, ?, ?, ?)`,
    [
      product.PartNumber,
      product.Name,
      product.Price,
      product.Comment,
      product.ProductCategoryId,
      product.ImageFile,
      product.CreateDate,
      product.ModifiedDate,
      product.Active,
    ]
  );

  let message = "Error in creating product";

  if (result.affectedRows) {
    message = "product created successfully";
  }

  return { message };
}

async function update(id, product) {
  const result = await db.query(
    `UPDATE product 
      SET PartNumber=?, Name=?, Price=?, Comment=?,
          ProductCategoryId=?, ImageFile=?, CreateDate=?, ModifiedDate=?, Active=?
      WHERE ProductId=?`,
    [
      product.PartNumber,
      product.Name,
      product.Price,
      product.Comment,
      product.ProductCategoryId,
      product.ImageFile,
      product.CreateDate,
      product.ModifiedDate,
      product.Active,
      id,
    ]
  );

  let message = "Error in updating product";

  if (result.affectedRows) {
    message = "product updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(`DELETE FROM product WHERE productid=?`, [id]);

  let message = "Error in deleting product";

  if (result.affectedRows) {
    message = "product deleted successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
};
