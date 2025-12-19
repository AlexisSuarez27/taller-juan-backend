const bcrypt = require('bcryptjs');

async function generar() {
  const admin = await bcrypt.hash("ADMIN123", 10);
  const tecnico = await bcrypt.hash("TECNICO123", 10);

  console.log("Admin:", admin);
  console.log("Tecnico:", tecnico);
}

generar();
