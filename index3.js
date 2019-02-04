var esl = require('modesl')

var esl_server = new esl.Server({host: '0.0.0.0', port: 8085, myevents:true}, function(){
    console.log("Gerenciador de fila iniciado")
})

esl_server.on('connection::ready', function(conn, id) {

    console.log(conn.channelData.headers)

    conn.execute('answer', cb => {
        // tocar o prompt inicial 
        conn.execute('valet_park', 'valet_lot $1', cb => {})

        setTimeout(() => {
            try {
                //conn.execute('bridge', `sofia/gateway/84f47efe-b143-4024-9cc1-89be3b1320b1/999683333`, (cb, error) => {
                    conn.execute('hangup', cb => {})
                //})
            } catch (error) {
                console.log(error)
            }
        }, 30000)
    })

})