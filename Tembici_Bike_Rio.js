var esl = require('modesl')

var esl_server = new esl.Server({host: '0.0.0.0', port: 8085, myevents:true}, function(){
    console.log("Gerenciador de fila iniciado")
})

let tempo = 15000
const lista = []

esl_server.on('connection::ready', function(conn, id) {
    console.log('Chamada com ID: ' + id + ' pronta para manipulação')
    
    conn.execute('answer', function(cb) {
        conn.execute('playback', 'local_stream://moh', cb => {})
        lista.push(conn)
        console.log(conn.channelData.headers.getHeader('Channel-Call-UUID'))
    })
})

setInterval(() => {
    if(lista.length > 0){
        let conn = lista.shift()

        conn.execute('set', 'effective_caller_id_name=${caller_id_number}Bike_Rio',  function(cb) {
            conn.execute('set', 'effective_caller_id_number=${caller_id_number}Bike_Rio', function(cb) {
                conn.execute('set', 'bridge_generate_comfort_noise=true', function(cb) {
                    conn.execute('bridge', `sofia/gateway/gateway_cloud/551140036054`, function(cb) {
                        conn.execute('hangup', function(cb) {})
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
    console.log('Chamada com ID: ' + id + ' encerrada')
})