const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM language LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}


async function create(language){
    const result = await db.query(
      `INSERT INTO language 
      (namedanish, nameenglish, displayorder, active) 
      VALUES 
      (?, ?, ?, ?)`, 
      [
        language.namedanish, language.nameenglish,
        language.displayorder, language.active
      ]
    );
  
    let message = 'Error in creating language';
  
    if (result.affectedRows) {
      message = 'Language created successfully';
    }
  
    return {message};
  }
  
  
  async function update(id, language){
    const result = await db.query(
      `UPDATE language 
      SET namedanish=?, nameenglish=?, displayorder=?, active=? WHERE languageid=?`, 
      [
        language.namedanish, language.nameenglish,
        language.displayorder, language.active,
        id
      ]
    );
  
    let message = 'Error in updating language';
  
    if (result.affectedRows) {
      message = 'Language updated successfully';
    }
  
    return {message};
  }
  

  async function remove(id){
    const result = await db.query(
      `DELETE FROM language WHERE languageid=?`, 
      [id]
    );
  
    let message = 'Error in deleting language';
  
    if (result.affectedRows) {
      message = 'Language deleted successfully';
    }
  
    return {message};
  }
  
  module.exports = {
    getMultiple,
    create,
    update,
    remove
  }

