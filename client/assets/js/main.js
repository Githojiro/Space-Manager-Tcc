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

  if (data.mensage === 'Token válido') {
      loadRese();

    const profile = async () => {
      const log = {
        id: idParam,
      };
      const init = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(log),
      };
  
      const responseSMProf = await fetch("http://localhost:1313/getUser", init);
      const dataProf = await responseSMProf.json();

      document.getElementById("userName").innerHTML = ""
      document.getElementById("userRM").innerHTML = ""
      document.getElementById("userTell").innerHTML = ""
      document.getElementById("userEmail").innerHTML = ""

      document.getElementById("userName").innerHTML = dataProf.namecCad
      document.getElementById("userRM").innerHTML = "RM: " +  dataProf.rmCad
      document.getElementById("userTell").innerHTML = "Telefone: " + dataProf.teleCad
      document.getElementById("userEmail").innerHTML = dataProf.emailCad
    }
    profile().then(loadSpace())
    
  }
  else {
    alert('Você não tem permissão para está aqui!')
    location.href = '../../index.html'
  }

};