// public/musicas.js

document.addEventListener("DOMContentLoaded", () => {
  const verMusicasBtn = document.getElementById("verMusicasBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const listaMusicas = document.getElementById("listaMusicas");

  const token = localStorage.getItem("token");

  // Redirecionar para login se token estiver ausente
  if (!token) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "/login.html";
    return;
  }

  verMusicasBtn.addEventListener("click", () => {
    fetch("/musicas", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          throw new Error("Token inválido ou expirado");
        }
        return res.json();
      })
      .then((dados) => {
        listaMusicas.innerHTML = ""; // limpa a lista
        dados.forEach((musica) => {
          const li = document.createElement("li");
          li.textContent = musica;
          listaMusicas.appendChild(li);
        });
      })
      .catch((err) => {
        alert(err.message);
        window.location.href = "/login.html";
      });
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
  });
});
