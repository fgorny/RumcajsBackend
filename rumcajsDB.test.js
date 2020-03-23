const createDb = require('./rumcajsDB');
const {User, Friend, Message} = require('./classes');
require('fake-indexeddb/auto');

test('Should create indexedbDB', (done) => {
    setUpDb();
    
});