const mongoose = require('mongoose');

// async function conexion() {
//     await mongoose.connect('mongodb://localhost:27017/test');
// }

conexion = async () => await mongoose.connect('mongodb://localhost:27017/test');

try {
    conexion();
    console.log('se conecto a la base de datos');
} catch (error) {
    console.log('error :>> ', error);
    console.log('no se pudo conectar a la base de datos');
}