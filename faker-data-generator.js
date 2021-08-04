'use strict';
var faker = require('faker');
module.exports = {
  generateUser,
};

var maxNoOfPeoplePerRequest = 50;

function generateUser(userContext, events, done) {
  var data = [];

  // for (var i = 0; i < Math.random(1, maxNoOfPeoplePerRequest); i++) {
  //   var item = {
  //     heightCM: between(1, 100),
  //     weightKG: between(1, 150),
  //     gender: faker.name.gender(),
  //   };
  //   data.push(item);
  // }

  var item = {
    heightCM: between(1, 100),
    weightKG: between(1, 150),
    gender: faker.name.gender(),
  };
  data.push(item);

  var payload = {
    data: data,
  };

  userContext.vars.payload = payload;
  return done();
}

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
