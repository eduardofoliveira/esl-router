var esl = require('modesl')

var esl_server = new esl.Server({host: '0.0.0.0', port: 8085, myevents:true}, function(){
    console.log("Gerenciador de fila iniciado")
})

const espera = []
const ativa = []

esl_server.on('connection::ready', function(conn, id) {
    //console.log(conn.channelData.headers)
    console.log('Chamada com ID: ' + id + ' pronta para manipulação')

    if(ativa.length < 5){
        ativa.push([id, conn])

        conn.execute('set', 'effective_caller_id_name=${caller_id_number}Bike_Rio',  cb => {
            conn.execute('set', 'effective_caller_id_number=${caller_id_number}Bike_Rio', cb => {
                conn.execute('set', 'bridge_generate_comfort_noise=true', cb => {
                    conn.execute('bridge', `sofia/gateway/gateway_cloud/551140036054`, cb => {
                        conn.execute('hangup', cb => {})
                    })
                })
            })
        })
    }else{
        conn.execute('answer', cb => {
            espera.push([id, conn])
            conn.execute('valet_park', 'valet_lot $1', cb => {})
        })
    }
})

esl_server.on('connection::open', (conn, id) => {
	console.log('Chamada com ID: ' + id + ' chegou')
})

esl_server.on('connection::close', (conn, id) => {
    console.log('Chamada com ID: ' + id + ' encerrada')
    ativa.find((element, index) => {
        if(element[0] = id){
            ativa.splice(index)
        }
    })
})

setInterval(() => {
    if(espera.length > 0){
        let [id, atual] = espera.shift()
        ativa.push([id, atual])
        
        atual.execute('set', 'effective_caller_id_name=${caller_id_number}Bike_Rio',  cb => {
            atual.execute('set', 'effective_caller_id_number=${caller_id_number}Bike_Rio', cb => {
                atual.execute('set', 'bridge_generate_comfort_noise=true', cb => {
                    atual.execute('bridge', `sofia/gateway/gateway_cloud/551140036054`, cb => {
                        atual.execute('hangup', cb => {})
                    })
                })
            })
        })
    }

}, 20000)

setInterval(() => {
    console.log(`Espera: ${espera.length}`)
    console.log(`Ativa: ${ativa.length}`)
}, 5000)