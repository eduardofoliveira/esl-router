const moment = require('moment')
const fs = require('fs')
const saida = fs.createWriteStream('./relatorio-tembici.txt', {flags:'a'})

let id = 'jfhkhsdk83947hfjkd'
let from = '11999683333'
let to = '551140036054'
let status = []

let eventos = []

status.push({
  state: 'IDLE',
  horario: moment().format('DD-MM-YYYY HH:mm:ss')
})

eventos.push({
  id,
  status,
  from,
  to
})

eventos[0].status.push({
  state: 'CONNECTED',
  horario: moment().format('DD-MM-YYYY HH:mm:ss')
})

eventos[0].status.push({
  state: 'END_CALL',
  horario: moment().format('DD-MM-YYYY HH:mm:ss')
})

saida.write(JSON.stringify(eventos[0]))