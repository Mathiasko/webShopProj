const express = require('express');
const router = express.Router();
const {
  getCustomers,
  postNewCustomer,
  deleteCustomer,
  getCustomerById,
  reviveCustomer,
  updateCustomer,
} = require('../services/customer');

router.get('/', async function (req, res, next) {
  try {
    res.json(await getCustomers());
  } catch (err) {
    console.error(`Error while getting customers `, err.message);
    next(err);
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    res.json(await getCustomerById(req.params));
  } catch (err) {
    console.error(`Error while getting customer `, err.message);
    next(err);
  }
});

router.post('/', async function (req, res, next) {
  try {
    res.json(await postNewCustomer(req.body));
    // console.log(req.body);
  } catch (err) {
    console.error(`Error creating customer `, err.message);
    next(err);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await deleteCustomer(req.params));
  } catch (err) {
    console.error(`Error killing customer `, err.message);
    next(err);
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    if (req.body.Name) {
      res.json(await updateCustomer(req.params.id, req.body));
    } else {
      res.json(await reviveCustomer(req.params));
    }
  } catch (err) {
    console.error(`Error updating customer `, err.message);
    next(err);
  }
});

module.exports = router;
