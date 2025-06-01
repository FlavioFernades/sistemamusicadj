document.addEventListener('DOMContentLoaded', function () {
  const verMusicasBtn = document.getElementById('verMusicasBtn');
  const listaMusicas = document.getElementById('listaMusicas');
  const logoutBtn = document.getElementById('logoutBtn');

  // 🔐 Verificar se o botão existe (estamos na página de músicas)
  if (verMusicasBtn) {
    verMusicasBtn.addEventListener('click', async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('Você precisa estar logado para ver as músicas.');
        window.location.href = 'login.html';
        return;
      }

      try {
        const response = await fetch('/musicas', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 401) {
          alert('Token inválido ou expirado. Faça login novamente.');
          window.location.href = 'login.html';
          return;
        }

        const musicas = await response.json();
        listaMusicas.innerHTML = '';

        musicas.forEach(musica => {
          const li = document.createElement('li');
          li.textContent = musica;
          listaMusicas.appendChild(li);
        });
      } catch (error) {
        console.error('Erro ao buscar músicas:', error);
        alert('Erro ao carregar músicas.');
      }
    });
  }

  // 🔚 Botão de logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    });
  }
});
