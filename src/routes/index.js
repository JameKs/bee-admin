/*
const keys = context.keys().filter(item => item === './index.js');

const models = [];
for (let i = 0; i < keys.length; i += 1) {
  models.push(context(keys[i]));
}

console.log('models:',models);

export default models;
*/

const context = require.context('./', true, /\.js$/);
export default context('./index.js');

