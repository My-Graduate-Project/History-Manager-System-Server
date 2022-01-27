const { test } = require('../models/test');

module.exports.test = async (ctx) => {
  const data = await test();
  console.log(data);
  console.log(11111111)
  ctx.body = {
    code: 200,
    data: data,
    message: 'success'
  };
}