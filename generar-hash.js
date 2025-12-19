const bcrypt = require('bcryptjs');

const password = 'tu_contraseña_aquí';

bcrypt.hash(password, 12, (err, hash) => {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('Hash generado para la contraseña "' + password + '":');
    console.log(hash);
  }
});