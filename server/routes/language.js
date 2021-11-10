const express = require('express');
const router = express.Router();
const languages = require('../services/language');

/* GET languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await languages.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting languages `, err.message);
    next(err);
  }
});


/* POST language */
router.post('/', async function(req, res, next) {
    try {
      res.json(await languages.create(req.body));
    } catch (err) {
      console.error(`Error while creating language`, err.message);
      next(err);
    }
  });


/* PUT language */
router.put('/:id', async function(req, res, next) {
    try {
      res.json(await languages.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating language`, err.message);
      next(err);
    }
  });


/* DELETE language */
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await languages.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting language`, err.message);
      next(err);
    }
  });


module.exports = router;