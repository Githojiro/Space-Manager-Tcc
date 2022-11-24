const getDate = async () => {
  const reservas = await fetch('http://localhost:1313/reservas')
  const resp = await reservas.json()
  const reseDays = []
  for (let index = 0; index < resp.length; index++) {
    reseDays.push(resp[index].dayRes)
  }

const thisRes = reseDays.filter(function(este, i) {
    return reseDays.indexOf(este) === i;
});

console.log(thisRes)

let count = 0
const dateHTML = document.getElementById("dateHTML")
dateHTML.innerHTML = thisRes[0]
  document.getElementById("upData").addEventListener("click", () => {
    count++
    if (count >= thisRes.length) {
      count = count - 1
      alert('Não há reservas para datas posterioes a essa!')
    }
    else {
      dateHTML.innerHTML = thisRes[count]
    }
  })
  document.getElementById("downData").addEventListener("click", () => {
    count = count - 1
    if (count < 0) {
      count = count + 1
      alert('Não há reservas para datas anteriores a essa!')
    }
    else {
      dateHTML.innerHTML = thisRes[count]
    }
  })

  console.log(reseDays)
  let date = new Date().toLocaleDateString('pt-BR');
  console.log(date)

  const day = date.substring(0, 2)
  const month = date.substring(3, 5)
  const year = date.substring(6, 10)
  const monthsBR = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  // console.log(dateHTML.textContent)
  // dateHTML.innerHTML = `
  // ${monthsBR[month-1]} ${day}, ${year}
  // `
  // const dateNow = `${monthsBR[month-1]} ${day}, ${year}`
  // console.log(dateNow)
  getSpace()
  
}

const getSpace = async () => {
  const resp = await fetch(`http://localhost:1313/space`);
  const data = await resp.json();
  console.log(data);

  for (let index = 0; index < data.length; index++) {
    document.getElementById("espaco").innerHTML += `
    <option value="${data[index].espEspa}">${data[index].espEspa}</option>
    `
  }
};

document.getElementById("espaco").addEventListener("change", async () => {
  const dateHTML = document.getElementById("dateHTML")
  console.log(dateHTML.textContent)
  const theList = document.getElementById("list")
  theList.innerHTML = ''
  const thisSpace = document.getElementById("espaco").value
  const log = {
    room: thisSpace,
    date: dateHTML.textContent
  };

  const init = {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(log),
  };
  const resp = await fetch(`http://localhost:1313/list`, init);
  // const resp = await fetch(`http://192.168.0.7:1313/list`, init);
  const respSM = await resp.json();
  console.log(respSM);


  if (respSM.mensage) {
    alert("Não há nenhuma reserva para essa sala!")
  }
  else {
    for (let index = 0; index < respSM.length; index++) {
      theList.innerHTML += `
      <li class="list-group-item"><button class="btn-reserva" onclick="loadReserva(${respSM[index].idRes})" data-bs-toggle="modal" data-bs-target="#exampleModal"><b>${respSM[index].horaResDe} até ${respSM[index].horaResAte}</b> - ${respSM[index].userRes}</button></li>
      `
    }
  }
})

const loadReserva = async (id) => {
  console.log(`ID da reserva: ${id}`)

  const thisID = {
    id: id
  };

  const init = {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(thisID),
  };
  const resp = await fetch(`http://localhost:1313/getReservasByID`, init);
  const respSM = await resp.json();
  console.log(respSM);

  const modalBody = document.getElementById("modalBody")

  modalBody.style = 'display: flex;'

  modalBody.innerHTML = `
  <ul class="list-group" style="width: 100%; font-size: 18px;">
  <li class="list-group-item">Espaço: ${respSM.espaRes}</li>
  <li class="list-group-item">Horário: ${respSM.horaResDe} - ${respSM.horaResAte}</li>
  <li class="list-group-item">Turma: ${respSM.curRes}</li>
  <li class="list-group-item" style="font-size: 15px;">Descrição: ${respSM.descriRes}</li>
  </ul>
  `
}