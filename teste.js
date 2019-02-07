var esl = require('modesl')

var esl_server = new esl.Server({ host: '0.0.0.0', port: 8085, myevents: true }, function () {
  console.log("Gerenciador de fila iniciado")
})

getHeader = (lista, item) => {
  for (let index = 0; index < lista.length; index++) {
    if (lista[index].name === item) {
      return lista[index].value
    }
  }
}

esl_server.on('connection::ready', async (conn, id) => {
  console.log('Pronta para manipulação' + id)

  let headers = conn.channelData.headers
  let from = getHeader(headers, 'Caller-Caller-ID-Number')
  let to = getHeader(headers, 'Channel-Destination-Number')

  console.log(from, to)

  conn.execute('respond', '486', function (cb) {})

  /*conn.execute('answer', function (cb) {
    conn.execute('playback', 'local_stream://moh', cb => {})

     setTimeout(() => {
      conn.execute('hangup', function (cb) { })
     },5000)
  })*/
  
})

esl_server.on('connection::open', (conn, id) => {
  console.log('Chamada com ID: ' + id + ' chegou')
})

esl_server.on('connection::close', (conn, id) => {
  console.log('Chamada com ID: ' + id + ' desligada')
})