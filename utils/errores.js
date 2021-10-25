const errorCustom = (res, error) => {
    console.log('se obtuvo el error');
    console.log('se obtuvo el error');
    console.log('se obtuvo el error');
    console.log('se obtuvo el error');
    console.log('se obtuvo el error');
    console.log('se obtuvo el error');
    console.log('error :>> ', error);
    return res.status(400).json({ok: false, err: 'se obtuvo un error en el manejador'});
}

module.exports = errorCustom;