const urlParams = new URLSearchParams(window.location.search);
const idParam = urlParams.get("user");

const saveRes = async () => {
  const resProfSM = await fetch(`http://localhost:1313/prof/${idParam}`);
  const profSM = await resProfSM.json();

  const getHora = await fetch("http://localhost:1313/hora");
  const respHora = await getHora.json();
  var space = document.getElementById("space").value;
  var horaIni = document.getElementById("horaIni").value;
  var horaFim = document.getElementById("horaFim").value;
  var mat = document.getElementById("materia").value;
  var turma = document.getElementById("turma").value;
  var descri = document.getElementById("descri").value;
  const dateRes = document.querySelector(".event-header").textContent;
  const theHora = [];
  const timeReserva = [];

  for (let index = 0; index < respHora.length; index++) {
    theHora.push(respHora[index].horsHora);
  }
  const finder1 = theHora.indexOf(horaIni);
  const finder2 = theHora.indexOf(horaFim);
  var end = finder2 - 1;
  for (let i = 0; i < theHora.length; i++) {
    if (i >= finder1 && i <= finder2) {
      timeReserva.push(theHora[i]);
    }
  }

  const log = {
    user: profSM.namecCad,
    curso: turma,
    materia: mat,
    data: dateRes,
    space: space,
    descri: descri,
    state: "yellow",
    horaIni: horaIni,
    horaFim: horaFim,
    timeReserva: timeReserva,
    endReserva: end,
    idUser: idParam
  };

  const init = {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(log),
  };

  const responseSM = await fetch("http://localhost:1313/reservas", init);
  const data = await responseSM.json();
  alert(data.mensage);
  location.reload();
};

const loadDesRes = async (eventID) => {
  const eventIDNew = eventID.id.replace("eventId", "");
  const getReservaByID = await fetch(
    `http://localhost:1313/getReserva/${eventIDNew}`
  );
  const resp = await getReservaByID.json();

  const getCursos = await fetch("http://localhost:1313/cursos");
  const respCursos = await getCursos.json();

  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("user");
  const resProfSM = await fetch(`http://localhost:1313/prof/${idParam}`);
  const profSM = await resProfSM.json();

  document.getElementById("descricaoReserva").innerHTML =
    "<b>Descrição:</b> <br>" + resp.descriRes;
  document.getElementById("salaReservada").innerHTML =
    "<b>Espaço reservado:</b> <br>" + resp.espaRes;
  document.getElementById("horarioReserva1").innerHTML =
    "Horário: <b>" + resp.horaResDe + " - " + resp.horaResAte + "</b>";
  document.getElementById("cursoReserva").innerHTML =
    "<b>Turma:</b> " + resp.curRes;
  document.getElementById("matReserva").innerHTML =
    "<b>Matéria:</b> " + resp.matRes;

  // ATUALIZAR A RESERVA!!!!!!!
  document.querySelector(".changeRes").innerHTML = `
  <button onclick="deleteReserva(${resp.idRes})" class="btn-remove-event" >Deletar Reserva</button>

  <h3><b>Atualizar:</b></h3>
  <h5>Turma da Reserva</h5>
    <select name="turma" id="changeTurma">
            
    </select>

          <h5>Matéria da Reserva</h5>
    <select name="turma" id="changeMat">
            
    </select>

    <div class="changeDes">
      <h5>Descrição da Reserva</h5>
      <textarea id="descriChange" cols="30" rows="10"></textarea>
    </div>

    <div class="controls">
    <button onclick="changeRes(${resp.idRes})" class="btn-reserva-change" >Salvar Mudanças</button>
  </div>
    `;

  document.getElementById("descriChange").value = resp.descriRes;

  for (let index = 0; index < respCursos.length; index++) {
    if (resp.curRes == respCursos[index].curCurs) {
      console.log("tem uma igual");
      document.getElementById(
        "changeTurma"
      ).innerHTML += `<option value="${respCursos[index].curCurs}" selected>${respCursos[index].curCurs}</option>`;
    } else {
      document.getElementById(
        "changeTurma"
      ).innerHTML += `<option value="${respCursos[index].curCurs}">${respCursos[index].curCurs}</option>`;
    }
  }

  if (profSM.typeCad === "prof") {
    const getMat = await fetch(`http://localhost:1313/loadMat/${idParam}`);
    const respMat = await getMat.json();

    for (let index = 0; index < respMat.length; index++) {
      if (resp.matRes === respMat[index]) {
        document.getElementById(
          "changeMat"
        ).innerHTML += `<option value="${respMat[index]}" selected>${respMat[index]}</option>`;
      } else {
        document.getElementById(
          "changeMat"
        ).innerHTML += `<option value="${respMat[index]}">${respMat[index]}</option>`;
      }
    }
  } else {
    const getMat = await fetch("http://localhost:1313/materias");
    const respMat = await getMat.json();

    for (let index = 0; index < respMat.length; index++) {
      document.getElementById(
        "changeMat"
      ).innerHTML += `<option value="${respMat[index].matsMat}">${respMat[index].matsMat}</option>`;
    }
  }
  document.getElementById("descriChange").value = resp.descriRes;
};

const deleteReserva = async (id) => {
  const confirma = confirm("Deseja excluir essa reserva?");
  if (confirma == true) {
    const log = {
      id: id,
    };

    const init = {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(log),
    };

    const responseSM = await fetch("http://localhost:1313/reservasdel", init);
    const data = await responseSM.json();

    alert(data.mensage);
    location.reload();
  }
};

const changeRes = async (id) => {
  const log = {
    id: id,
    turma: document.getElementById("changeTurma").value,
    materia: document.getElementById("changeMat").value,
    descri: document.getElementById("descriChange").value,
  };

  const init = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(log),
  };
  const getSpace = await fetch(`http://localhost:1313/updateRes`, init);
  const respSpace = await getSpace.json();

  alert(respSpace.mensage);
  location.reload();
};
