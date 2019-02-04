const esl = require('modesl')

conn = new esl.Connection('192.168.0.220', 8021, 'ClueCon', function() {
    conn.events('json', 'all')
    
    conn.api('eval ${regex(${sofia_contact(R1101@duduhouse.dyndns.info)}|^(.*:[0-9]{4,5})|%1)}', (result) => {
        //let from = result.body
        //let to = '35880866'
        
        //conn.api(`originate {origination_caller_id_number=5511999683333}${from} &bridge(sofia/gateway/84f47efe-b143-4024-9cc1-89be3b1320b1/${to})`)
        conn.api(`originate {origination_caller_id_number=5511999683333}${from} &loop_playback(/usr/share/freeswitch/sounds/music/default/8000/danza-espanola-op-37-h-142-xii-arabesca.wav 
            +2)`, (result) => {
            console.log(result.body.replace('+OK ', ''))
        })
    })
})