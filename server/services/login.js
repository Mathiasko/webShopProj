const db = require("./db");


async function moginMORE(loginInfoObj) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const pool = await sql.connect(con);
        const result = await pool
          .request()
          .input('email', sql.NVarChar(255), loginInfoObj.email)
          .query(`SELECT * FROM botUser
                              INNER JOIN botUserPassword
                                  ON botUser.userID = botUserPassword.FK_userID
                              INNER JOIN botUserRole
                                  ON botUser.userID = botUserRole.FK_userID
                              INNER JOIN botRole
                                  ON botUserRole.FK_roleID = botRole.roleID
                              WHERE botUser.email = @email`);

        console.log(result);
        if (!result.recordset[0])
          throw { statusCode: 404, message: 'User not found' };
        if (result.recordset.length > 1)
          throw { statusCode: 500, message: 'DB is corrupt' };

        const match = await bcrypt.compare(
          loginInfoObj.password,
          result.recordset[0].hashedPassword
        );
        if (!match) throw { statusCode: 404, message: 'User not found' };

        const record = {
          userID: result.recordset[0].userID,
          email: result.recordset[0].email,
          role: {
            roleID: result.recordset[0].roleID,
          },
        };

        const { error } = User.validate(record);
        if (error) throw { statusCode: 409, message: error };

        resolve(new User(record));
      } catch (err) {
        console.log(err);
        let errorMessage;
        if (!err.statusCode) {
          errorMessage = {
            statusCode: 500,
            message: err,
          };
        } else {
          errorMessage = err;
        }
        reject(errorMessage);
      }
      sql.close();
    })();
  });
}

async function matchUserEmailAndPassword(email) {
  const res = await db.query(
    `SELECT * FROM customer WHERE customer.Email = (?)`,
    [email]
  );
  if (res.length > 1) {
    throw { statusCode: 500, message: 'DB is corrupt' };
  } else if (res.length === 0) {
    throw { statusCode: 404, message: 'UserNotFound' };
  }

  return res;
}

module.exports = {
  matchUserEmailAndPassword,
};
