const express = require('express');
const router = express.Router();
const {getProductCategory, postNewCategory, deleteCategory} = require('../services/productCategory');

/* GET products. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await getProductCategory());
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});
router.post('/', async function(req, res, next) {
  try {
    res.json(await postNewCategory(req.body));
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await deleteCategory(req.params));
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }
});


module.exports = router;