var esl = require('modesl')

var esl_server = new esl.Server({ host: '0.0.0.0', port: 8086, myevents: true }, function () {
  console.log("Gerenciador de fila iniciado")
})

let tempo = 20000 // tempo entre as entregas de chamadas
let limit = 18 // Maximo de chamadas conectadas
const lista = []

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

  if (to === '40030374') {
    to = `5511${to}`
    from = `${from}Bike_Belem`

    conn.execute('answer', function (cb) {
      conn.execute('playback', '/home/ec2/tembici/IVR_4003_sem_auto_atendimento.wav', cb => {

        console.log(`Quantidade de chamadas: ${lista.length}`)

        if (lista.length > limit) {
          conn.execute('playback', '/home/ec2/tembici/Temibici_Ocupados.wav', cb => {
            conn.execute('hangup', function (cb) { })
          })
        } else {
          conn.execute('playback', 'local_stream://default', cb => { })
          lista.push([conn, id, from, to])
        }

      })
    })
  }
  if (to === '40030387') {
    to = `5511${to}`
    from = `${from}ManoBike`

    conn.execute('answer', function (cb) {
      conn.execute('playback', '/home/ec2/tembici/IVR_4003_sem_auto_atendimento.wav', cb => {

        console.log(`Quantidade de chamadas: ${lista.length}`)

        if (lista.length > limit) {
          conn.execute('playback', '/home/ec2/tembici/Temibici_Ocupados.wav', cb => {
            conn.execute('hangup', function (cb) { })
          })
        } else {
          conn.execute('playback', 'local_stream://default', cb => { })
          lista.push([conn, id, from, to])
        }

      })
    })
  }
  if (to === '40030391') {
    to = `5511${to}`
    from = `${from}Danoninho`

    conn.execute('answer', function (cb) {
      conn.execute('playback', '/home/ec2/tembici/IVR_4003_sem_auto_atendimento.wav', cb => {

        console.log(`Quantidade de chamadas: ${lista.length}`)

        if (lista.length > limit) {
          conn.execute('playback', '/home/ec2/tembici/Temibici_Ocupados.wav', cb => {
            conn.execute('hangup', function (cb) { })
          })
        } else {
          conn.execute('playback', 'local_stream://default', cb => { })
          lista.push([conn, id, from, to])
        }

      })
    })
  }
  if (to === '40036052') {
    to = `5511${to}`
    from = `${from}Bike_POA`

    conn.execute('answer', function (cb) {
      conn.execute('playback', '/home/ec2/tembici/IVR_Poa2018.wav', cb => {

        console.log(`Quantidade de chamadas: ${lista.length}`)

        if (lista.length > limit) {
          conn.execute('playback', '/home/ec2/tembici/Temibici_Ocupados.wav', cb => {
            conn.execute('hangup', function (cb) { })
          })
        } else {
          conn.execute('playback', 'local_stream://default', cb => { })
          lista.push([conn, id, from, to])
        }

      })
    })
  }
  if (to === '40036054') {
    to = `5511${to}`
    from = `${from}Bike_Rio`

    conn.execute('answer', function (cb) {
      conn.execute('playback', '/home/ec2/tembici/IVR_Rio2018.wav', cb => {

        console.log(`Quantidade de chamadas: ${lista.length}`)

        if (lista.length > limit) {
          conn.execute('playback', '/home/ec2/tembici/Temibici_Ocupados.wav', cb => {
            conn.execute('hangup', function (cb) { })
          })
        } else {
          conn.execute('playback', 'local_stream://default', cb => { })
          lista.push([conn, id, from, to])
        }

      })
    })
  }
  if (to === '40036055') {
    to = `5511${to}`
    from = `${from}Bike_Sampa`

    conn.execute('answer', function (cb) {
      console.log(`Quantidade de chamadas: ${lista.length}`)

      if (lista.length > limit) {
        conn.execute('playback', '/home/ec2/tembici/Temibici_Ocupados.wav', cb => {
          conn.execute('hangup', function (cb) { })
        })
      } else {
        conn.execute('playback', 'local_stream://default', cb => { })
        lista.push([conn, id, from, to])
      }
    })
  }
  if (to === '40036056') {
    to = `5511${to}`
    from = `${from}Bike_PE`

    conn.execute('answer', function (cb) {
      conn.execute('playback', '/home/ec2/tembici/IVR_PE2018.wav', cb => {

        console.log(`Quantidade de chamadas: ${lista.length}`)

        if (lista.length > limit) {
          conn.execute('playback', '/home/ec2/tembici/Temibici_Ocupados.wav', cb => {
            conn.execute('hangup', function (cb) { })
          })
        } else {
          conn.execute('playback', 'local_stream://default', cb => { })
          lista.push([conn, id, from, to])
        }

      })
    })
  }
  if (to === '40039892') {
    to = `5511${to}`
    from = `${from}Bike_Salvador`

    conn.execute('answer', function (cb) {
      conn.execute('playback', '/home/ec2/tembici/IVR_Salvador2018.wav', cb => {

        console.log(`Quantidade de chamadas: ${lista.length}`)

        if (lista.length > limit) {
          conn.execute('playback', '/home/ec2/tembici/Temibici_Ocupados.wav', cb => {
            conn.execute('hangup', function (cb) { })
          })
        } else {
          conn.execute('playback', 'local_stream://default', cb => { })
          lista.push([conn, id, from, to])
        }

      })
    })
  }
  if (to === '40036053') {
    to = `5511${to}`
    from = `${from}VilaVelha`

    conn.execute('answer', function (cb) {
      conn.execute('playback', '/home/ec2/tembici/IVR_VilaVelha2018.wav', cb => {

        console.log(`Quantidade de chamadas: ${lista.length}`)

        if (lista.length > limit) {
          conn.execute('playback', '/home/ec2/tembici/Temibici_Ocupados.wav', cb => {
            conn.execute('hangup', function (cb) { })
          })
        } else {
          conn.execute('playback', 'local_stream://default', cb => { })
          lista.push([conn, id, from, to])
        }

      })
    })
  }
  if (to === '2420') {
    to = `550300313${to}`
    from = `${from}Tembici`

    console.log(`Quantidade de chamadas: ${lista.length}`)

    if (lista.length > limit) {
      conn.execute('answer', function (cb) {
        conn.execute('playback', '/home/ec2/tembici/Temibici_Ocupados.wav', cb => {
          conn.execute('hangup', function (cb) { })
        })
      })
    } else {
      conn.execute('answer', function (cb) {
        conn.execute('playback', 'local_stream://default', cb => { })
        lista.push([conn, id, from, to])
      })
    }
  }
})

setInterval(() => {
  if (lista.length > 0) {
    let [conn, id, from, to] = lista.shift()

    conn.execute('set', `effective_caller_id_name=${from}`, function (cb) {
      conn.execute('set', `effective_caller_id_number=${from}`, function (cb) {
        conn.execute('set', 'bridge_generate_comfort_noise=true', function (cb) {
          conn.execute('bridge', `sofia/gateway/gateway_cloud/${to}`, function (cb) {
            conn.execute('hangup', function (cb) { })
          })
        })
      })
    })
  }
}, tempo)

esl_server.on('connection::open', (conn, id) => {
  console.log('Chamada com ID: ' + id + ' chegou')
})

esl_server.on('connection::close', (conn, id) => {
  console.log('Chamada com ID: ' + id + ' desligada')

  for (let index = 0; index < lista.length; index++) {
    if (lista[index][1] === id) {
      lista.splice(index, 1)
    }
  }
})