const db = require("./db");

async function getProductCategory() {
  const rows = await db.query(`SELECT * FROM productCategory`);
  let res = [];
  rows.forEach((item) => {
    res.push(item);
  });
  return res;
}

async function postNewCategory(productCategoryName) {
  const res = await db.query(
    `INSERT INTO productCategory (productCategoryName) VALUES (?)`,
    [productCategoryName.productCategoryName]
  );
  if(res.affectedRows){
    return `New categoty added!`
  }
}

async function deleteCategory({id}) {
  console.log(id);
  const res = await db.query(
    `DELETE FROM productCategory WHERE productCategoryId=?`,
    [id]
  );
  if(res.affectedRows){
    return `Categoty deleted!`
  }
}

module.exports = {
  getProductCategory,
  postNewCategory,
  deleteCategory
};
