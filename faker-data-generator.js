'use strict';
var faker = require('faker');
module.exports = {
  generateUser,
};

function generateUser(userContext, events, done) {
  var payload = [
    {
      heightCM: between(1, 100),
      weightKG: between(1, 150),
      gender: faker.name.gender(),
    },
  ];

  userContext.vars.payload = payload;
  return done();
}

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
