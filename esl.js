const esl = require('esl')

let chamadas = []
let chamadas_ativas = []
let limit = 1
let tempo = 20000

const call_handler = async function() {

  let id = this.uuid
  let from = this.data['Caller-Caller-ID-Number']
  let to = this.data['Channel-Destination-Number']
  console.log(`chamada inicou ${id}`)
  chamadas_ativas.push(id)

  this.onceAsync('CHANNEL_HANGUP').then(function(){
    let id = this.uuid
    console.log(`chamada terminada ${id}`)
    
    for (let index = 0; index < chamadas.length; index++) {
      if (chamadas[index][1] === id) {
        chamadas.splice(index, 1)
      }
    }

    for (let index = 0; index < chamadas_ativas.length; index++) {
      if (chamadas_ativas[index] === id) {
        chamadas_ativas.splice(index, 1)
      }
    }
  })

  if (to === '40030374') {
    to = `5511${to}`
    from = `${from}Bike_Belem`

    await this.command('answer')
    await this.command('playback', 'silence_stream://1000')
    await this.command('playback', '/home/ec2/tembici/IVR_4003_sem_auto_atendimento.wav')

    if (chamadas.length >= limit) {
      await this.command('playback', '/home/ec2/tembici/Temibici_Ocupados.wav')
      await this.hangup()
    }else{
      this.command('playback', 'local_stream://default')
      chamadas.push([this, id, from, to])
    }
  }

  /*let opcao = ''
  //console.log('name: ' + this.data['Caller-Caller-ID-Name'])
  //console.log('number: ' + this.data['Caller-Caller-ID-Number'])
  //console.log('destination: ' + this.data['Channel-Destination-Number'])

  this.on('DTMF', call => {
    opcao += call.body['DTMF-Digit']
  })

  await this.command('answer')
  await this.command('playback', 'silence_stream://1000')
  await this.command('playback', '/usr/share/freeswitch/sounds/en/us/callie/digits/8000/11.wav')
  await this.command('playback', '/usr/share/freeswitch/sounds/en/us/callie/digits/8000/12.wav')
  await this.command('playback', '/usr/share/freeswitch/sounds/en/us/callie/digits/8000/80.wav')

  opcao = ''
  while(!(opcao === '1' || opcao === '2')){
    if(opcao !== ''){
      // opção inválida
      //await this.command('playback', '/usr/share/freeswitch/sounds/en/us/callie/ivr/8000/ivr-pin_or_extension_is-invalid.wav')
    }
    opcao = ''
    await this.command('play_and_get_digits', '1 1 1 3000 1 local_stream://moh')
  }
  
  if(opcao === '1'){
    await this.command('bridge', `sofia/gateway/Tfreeswitch/37115000`)
    await this.hangup()
  }
  if(opcao === '2'){
    await this.command('bridge', `sofia/gateway/Tfreeswitch/35880866`)
    await this.hangup()
  }*/
  
  
}

setInterval(async () => {
  if (chamadas.length > 0) {
    let [conn, id, from, to] = chamadas.shift()

    await conn.command('set', `effective_caller_id_name=${from}`)
    await conn.command('set', `effective_caller_id_number=${from}`)
    await conn.command('set', `bridge_generate_comfort_noise=true`)
    await conn.command('bridge', `sofia/gateway/gateway_cloud/${to}`)
    await conn.hangup()
  }
}, tempo)

setInterval(async () => {
  console.log(`quantidade de chamadas ativas: ${chamadas_ativas.length}`)
  console.log(`quantidade de chamadas na espera: ${chamadas.length}`)
}, 5000)

const server = esl.server(call_handler)
server.listen(8087)