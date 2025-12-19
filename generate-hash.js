const bcrypt = require('bcrypt');

const password = 'katana'; // твой пароль
bcrypt.hash(password, 10).then(hash => {
  console.log('Хэш для пароля:', hash);
});