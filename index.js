const esl = require('modesl')

lista = []

setInterval(() => {
    console.log(lista)
}, 2000)

conn = new esl.Connection('192.168.0.220', 8021, 'ClueCon', function() {
    conn.events('json', 'all')

    conn.on('esl::event::CHANNEL_BRIDGE::**', (event) => {
        let call = {
            evento: event.getHeader('Event-Name'),
            callid: event.getHeader('Channel-Call-UUID'),
            from: event.getHeader('Other-Leg-Caller-ID-Number'),
            to: event.getHeader('Other-Leg-Callee-ID-Number')
        }

        lista.push([call.callid, call])
    })

    conn.on('esl::event::CHANNEL_HANGUP_COMPLETE::**', (event) => {
        if(event.getHeader('Caller-Network-Addr') !== '192.168.0.221'){
            lista.find((item, index) => {
                if(item[1].callid === event.getHeader('Channel-Call-UUID')){
                    lista.splice(index)
                }
            })
        }
    })
})