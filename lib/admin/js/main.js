const authen = async () => {
  const token = sessionStorage.getItem("thistoken");
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get('user')
  
  const log = {
    idUser: idParam
  }
  const init = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-acess-token": token,
    },
    body: JSON.stringify(log),
  };
  const responseSM = await fetch("http://localhost:1313/authen", init);
  const data = await responseSM.json();


  if (data.mensage == 'Token válido') {

    if (data.userID != user) {
      alert("Usuário não autorizado")
      location.href = 'http://gustavosalles13.atwebpages.com//Space-Manager/index.html'
    }
  }
  else {
    alert('Você não tem permissão para está aqui!')
    location.href = 'http://gustavosalles13.atwebpages.com//Space-Manager/'
  }
};


function openM() {
  let dropMenu = document.querySelector(".dropdownMenu")
  let dropProf = document.querySelector(".dropdownMenuProf")
  dropMenu.classList.add('show')
  dropProf.classList.add('show')
}

function quitDrop() {
  let dropMenu = document.querySelector(".dropdownMenu")
  let dropProf = document.querySelector(".dropdownMenuProf")
  dropMenu.classList.remove('show')
  dropProf.classList.remove('show')
}