var esl = require('modesl')

var esl_server = new esl.Server({host: '0.0.0.0', port: 8086, myevents:true}, function(){
    console.log("Gerenciador de fila iniciado")
})

let tempo = 15000
const lista = []

esl_server.on('connection::ready', function(conn, id) {
    console.log('Pronta para manipulação' + id)
    console.log(conn.channelData.headers)

    conn.execute('hangup', function(cb) {})
    
    //conn.execute('answer', function(cb) {
    //    conn.execute('playback', 'local_stream://moh', cb => {})
    //    lista.push([conn, id])
    //})
})

setInterval(() => {
    if(lista.length > 0){
        let [conn, id] = lista.shift()

        conn.execute('set', 'effective_caller_id_name=${caller_id_number}Bike_Belem',  function(cb) {
            conn.execute('set', 'effective_caller_id_number=${caller_id_number}Bike_Belem', function(cb) {
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