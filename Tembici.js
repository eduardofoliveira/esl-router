var esl = require('modesl')

var esl_server = new esl.Server({host: '0.0.0.0', port: 8086, myevents:true}, function(){
    console.log("Gerenciador de fila iniciado")
})

let tempo = 15000
const lista = []

getHeader = (lista, item) => {
  for (let index = 0; index < lista.length; index++) {
    if(lista[index].name === item){
      return lista[index].value
    }
  }
}

esl_server.on('connection::ready', function(conn, id) {
    console.log('Pronta para manipulação' + id)

    let headers = conn.channelData.headers
    let from = getHeader(headers, 'Caller-Caller-ID-Name')
    let to = getHeader(headers, 'Channel-Destination-Number')

    if(to === '40030374'){
      to = `5511${to}`
      from = `${from}Bike_Belem`
    }
    if(to === '40030387'){
        to = `5511${to}`
        from = `${from}ManoBike`
    }
    if(to === '40030391'){
        to = `5511${to}`
        from = `${from}Danoninho`
    }
    if(to === '40036052'){
        to = `5511${to}`
        from = `${from}Bike_POA`
    }
    if(to === '40036054'){
        to = `5511${to}`
        from = `${from}Bike_Rio`
    }
    if(to === '40036055'){
        to = `5511${to}`
        from = `${from}Bike_Sampa`
    }
    if(to === '40036056'){
        to = `5511${to}`
        from = `${from}Bike_PE`
    }
    if(to === '40039892'){
        to = `5511${to}`
        from = `${from}Bike_Salvador`
    }
    if(to === '40036053'){
        to = `5511${to}`
        from = `${from}VilaVelha`
    }
    if(to === '2420'){
        to = `550300313${to}`
        from = `${from}Tembici`
    }
    
    conn.execute('answer', function(cb) {
        conn.execute('playback', 'local_stream://moh', cb => {})
        lista.push([conn, id, from, to])
    })
})

setInterval(() => {
    if(lista.length > 0){
        let [conn, id, from, to] = lista.shift()

        conn.execute('set', `effective_caller_id_name=${from}`,  function(cb) {
            conn.execute('set', `effective_caller_id_number=${from}Bike_Belem`, function(cb) {
                conn.execute('set', 'bridge_generate_comfort_noise=true', function(cb) {
                    conn.execute('bridge', `sofia/gateway/gateway_cloud/${to}`, function(cb) {
                        conn.execute('hangup', function(cb) {})
                    })
                })
            })
        })
    }
}, tempo)

esl_server.on('connection::open', (conn, id) => {
    console.log('Chegou para manipulação' + id)
})

esl_server.on('connection::close', (conn, id) => {
    console.log('Desligada para manipulação' + id)

    for (let index = 0; index < lista.length; index++) {
        if(lista[index][1] === id){
            lista.splice(index, 1)
        }
    }
})