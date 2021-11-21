const crypt = {
  saltRounds: parseInt(process.env.BCRYPT_SALTROUNDS),
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY
}

module.exports = crypt;