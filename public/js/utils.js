// public/js/utils.js
function verificarToken(token) {
  if (!token) {
    return false;
  }
  return true;
}

module.exports = { verificarToken };
