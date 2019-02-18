let eventos = []

  let id = 1
  let from = 50
  let to = 80
  let status = []

  status.push({
    state: 'IDLE',
    horario: Date.now()
  })

  eventos.push({
    id,
    status,
    from,
    to
  })

  eventos[0].status.push({
    state: 'CONECTADA',
    horario: Date.now()
  })

console.log(eventos[0].id)