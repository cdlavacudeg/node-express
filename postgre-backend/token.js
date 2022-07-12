const jwt = require('jsonwebtoken');

const secret = 'myCat';

const payload = {
  sub: 1,
  role: 'customer',
};

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}
const token = signToken(payload, secret);
console.log(token);
console.log(verifyToken(token, secret));
