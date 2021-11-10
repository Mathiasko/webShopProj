const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT * FROM product LIMIT ?,?`, [
    offset,
    config.listPerPage,
  ]);
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
      product.partnumber,
      product.name,
      product.price,
      product.comment,
      product.productcategoryid,
      product.imagefile,
      product.createdate,
      product.modifieddate,
      product.active,
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
      SET partnumber=?, name=?, price=?, comment=?,
          productcategoryid=?, imagefile=?, createdate=?, modifieddate=?, active=?
      WHERE productid=?`,
    [
      product.partnumber,
      product.name,
      product.price,
      product.comment,
      product.productcategoryid,
      product.imagefile,
      product.createdate,
      product.modifieddate,
      product.active,
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
