module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/melomano/' // Reemplaza 'nombre-del-subdirectorio' con el nombre real de tu subdirectorio
    : '/'
}
