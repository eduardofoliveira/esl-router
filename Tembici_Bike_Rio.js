var esl = require('modesl')

var esl_server = new esl.Server({host: '0.0.0.0', port: 8085, myevents:true}, function(){
    console.log("Gerenciador de fila iniciado")
})

let tempo = 0

esl_server.on('connection::ready', function(conn, id) {
    tempo = tempo + 20000
    console.log('Chamada com ID: ' + id + ' pronta para manipulação')
    //console.log(conn.channelData.headers)
    
    conn.execute('answer', cb => {
        conn.execute('valet_park', 'valet_lot $1', cb => {})
        
        setInterval(() => {
            conn.execute('set', 'effective_caller_id_name=${caller_id_number}Bike_Rio',  cb => {
                conn.execute('set', 'effective_caller_id_number=${caller_id_number}Bike_Rio', cb => {
                    conn.execute('set', 'bridge_generate_comfort_noise=true', cb => {
                        conn.execute('bridge', `sofia/gateway/gateway_cloud/551140036054`, cb => {
                            tempo = tempo - 20000
                            conn.execute('hangup', cb => {})
                        })
                    })
                })
            })
        }, tempo)
    })
})

esl_server.on('connection::open', (conn, id) => {
	console.log('Chamada com ID: ' + id + ' chegou')
})

esl_server.on('connection::close', (conn, id) => {
    console.log('Chamada com ID: ' + id + ' encerrada')
})