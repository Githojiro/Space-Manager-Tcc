document.getElementById('itemSelect').addEventListener("change", async () => {
  const itemSelect = document.getElementById('itemSelect').value 


  const infoItemSelect = await fetch(`http://localhost:1313/${itemSelect}`)
  const resp = await infoItemSelect.json()

  document.querySelector('.list-group').innerHTML = ''
  if (itemSelect == 'materias') {
    for (let index = 0; index < resp.length; index++) {
      document.querySelector('.list-group').innerHTML += `<li class="list-group-item">${resp[index].matsMat}</li>`
      console.log(itemSelect)
    }
  }
  else if (itemSelect == 'hora') {
    for (let index = 0; index < resp.length; index++) {
      document.querySelector('.list-group').innerHTML += `<li class="list-group-item">${resp[index].horsHora}</li>`
      console.log(itemSelect)
    }
  }
  else if (itemSelect == 'space') {
    for (let index = 0; index < resp.length; index++) {
      document.querySelector('.list-group').innerHTML += `<li class="list-group-item">${resp[index].espEspa}</li>`
      console.log(itemSelect)
    }
  }
  else if (itemSelect == 'cursos') {
    for (let index = 0; index < resp.length; index++) {
      document.querySelector('.list-group').innerHTML += `<li class="list-group-item">${resp[index].curCurs}</li>`
      console.log(itemSelect)
    }
  }

  console.log(resp)
})