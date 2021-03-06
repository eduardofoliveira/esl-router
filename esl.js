const moment = require("moment");
const esl = require("esl");
const fs = require("fs");
const saida = fs.createWriteStream("./relatorio-tembici.txt", { flags: "a" });

let chamadas_ativas = [];
let chamadas_na_ura = [];
let chamadas_na_espera = [];
let chamadas_no_basix = [];
let eventos = [];

let limit = 16;
let tempo = 20000;

const removerListaUra = id => {
  for (let index = 0; index < chamadas_na_ura.length; index++) {
    if (chamadas_na_ura[index] === id) {
      chamadas_na_ura.splice(index, 1);
    }
  }
};

const removerListaEspera = id => {
  for (let index = 0; index < chamadas_na_espera.length; index++) {
    if (chamadas_na_espera[index] === id) {
      chamadas_na_espera.splice(index, 1);
    }
  }
};

const call_handler = async function() {
  let id = this.uuid;
  let from = this.data["Caller-Caller-ID-Number"];
  let to = this.data["Channel-Destination-Number"];
  let status = [];
  status.push({
    state: "IDLE",
    horario: moment().format("DD-MM-YYYY HH:mm:ss")
  });

  eventos.push({
    id,
    status,
    from,
    to
  });

  try {
    this.onceAsync("CHANNEL_HANGUP").then(function() {
      let id = this.uuid;
      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "HANGUP",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }

      for (let index = 0; index < chamadas_ativas.length; index++) {
        if (chamadas_ativas[index] === id) {
          chamadas_ativas.splice(index, 1);
        }
      }

      for (let index = 0; index < chamadas_na_ura.length; index++) {
        if (chamadas_na_ura[index] === id) {
          chamadas_na_ura.splice(index, 1);
        }
      }

      for (let index = 0; index < chamadas_na_espera.length; index++) {
        if (chamadas_na_espera[index][1] === id) {
          chamadas_na_espera.splice(index, 1);
        }
      }

      for (let index = 0; index < chamadas_no_basix.length; index++) {
        if (chamadas_no_basix[index] === id) {
          chamadas_no_basix.splice(index, 1);
        }
      }
    });

    if (to === "40030374") {
      to = `5511${to}`;
      from = `${from}Bike_Belem`;
      chamadas_na_ura.push(id);

      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "URA",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }

      await this.command("answer");
      await this.command("playback", "silence_stream://1000");
      await this.command(
        "playback",
        "/home/ec2/tembici/IVR_4003_sem_auto_atendimento.wav"
      );
      this.command("playback", "local_stream://default");
      removerListaUra(id);
      chamadas_na_espera.push([this, id, from, to]);

      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "QUEUE",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }
    }

    if (to === "40030387") {
      to = `5511${to}`;
      from = `${from}ManoBike`;
      chamadas_na_ura.push(id);
      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "URA",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }

      await this.command("answer");
      await this.command("playback", "silence_stream://1000");
      await this.command(
        "playback",
        "/home/ec2/tembici/IVR_4003_sem_auto_atendimento.wav"
      );
      this.command("playback", "local_stream://default");
      removerListaUra(id);
      chamadas_na_espera.push([this, id, from, to]);

      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "QUEUE",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }
    }

    if (to === "40030391") {
      to = `5511${to}`;
      from = `${from}Danoninho`;
      chamadas_na_ura.push(id);
      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "URA",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }

      await this.command("answer");
      await this.command("playback", "silence_stream://1000");
      await this.command(
        "playback",
        "/home/ec2/tembici/IVR_4003_sem_auto_atendimento.wav"
      );
      this.command("playback", "local_stream://default");
      removerListaUra(id);
      chamadas_na_espera.push([this, id, from, to]);

      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "QUEUE",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }
    }

    if (to === "40036052") {
      to = `5511${to}`;
      from = `${from}Bike_POA`;
      chamadas_na_ura.push(id);
      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "URA",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }

      await this.command("answer");
      await this.command("playback", "silence_stream://1000");
      await this.command("playback", "/home/ec2/tembici/IVR_Poa2018.wav");
      this.command("playback", "local_stream://default");
      removerListaUra(id);
      chamadas_na_espera.push([this, id, from, to]);

      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "QUEUE",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }
    }

    if (to === "40036054") {
      to = `5511${to}`;
      from = `${from}Bike_Rio`;
      chamadas_na_ura.push(id);
      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "URA",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }

      await this.command("answer");
      await this.command("playback", "silence_stream://1000");
      // await this.command("playback", "/home/ec2/tembici/Carnaval_BikeRio.wav");

      let opcao = "";
      this.on("DTMF", call => {
        opcao += call.body["DTMF-Digit"];
      });
      await this.command(
        "play_and_get_digits",
        "1 1 1 5000 1 /home/ec2/tembici/IVR_Rio2018.wav"
      );

      if (opcao === "1") {
        to = "551100000005";
      }

      this.command("playback", "local_stream://default");
      removerListaUra(id);
      chamadas_na_espera.push([this, id, from, to]);

      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "QUEUE",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }
    }

    if (to === "40036055") {
      to = `5511${to}`;
      from = `${from}Bike_Sampa`;
      chamadas_na_ura.push(id);
      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "URA",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }

      await this.command("answer");
      await this.command("playback", "silence_stream://1000");
      //await this.command("playback", "/home/ec2/tembici/Carnaval_BikeSampa.wav")
      this.command("playback", "local_stream://default");
      removerListaUra(id);
      chamadas_na_espera.push([this, id, from, to]);

      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "QUEUE",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }
    }

    if (to === "40036056") {
      to = `5511${to}`;
      from = `${from}Bike_PE`;
      chamadas_na_ura.push(id);
      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "URA",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }

      await this.command("answer");
      await this.command("playback", "silence_stream://1000");
      //await this.command("playback", "/home/ec2/tembici/Carnaval_BikePE.wav");

      let opcao = ""
      this.on("DTMF", call => {
        opcao += call.body["DTMF-Digit"]
      })
      await this.command(
        "play_and_get_digits",
        "1 1 1 5000 1 /home/ec2/tembici/IVR_PE2018.wav"
      )

      if (opcao === "1") {
        to = "551100000005"
      }

      this.command("playback", "local_stream://default");
      removerListaUra(id);
      chamadas_na_espera.push([this, id, from, to]);

      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "QUEUE",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }
    }

    if (to === "40039892") {
      to = `5511${to}`;
      from = `${from}Bike_Salvador`;
      chamadas_na_ura.push(id);
      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "URA",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }

      await this.command("answer");
      await this.command("playback", "silence_stream://1000");
      await this.command("playback", "/home/ec2/tembici/IVR_Salvador2018.wav");
      // await this.command(
      //   "playback",
      //   "/home/ec2/tembici/Carnaval_BikeSalvador.wav"
      // );
      this.command("playback", "local_stream://default");
      removerListaUra(id);
      chamadas_na_espera.push([this, id, from, to]);

      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "QUEUE",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }
    }

    // Segunda a Sexta
    //05:00 IVR_0300_2420
    //09:00 IVR_0300_2420_ibike
    //18:00 IVR_0300_2420
    //00:00 IVR_Noturno_Tembici

    // Sabado e Domingo
    //05:00 IVR_0300_2420
    //00:00 IVR_Noturno_Tembici

    if (to === "40036053") {
      to = `5511${to}`;
      from = `${from}VilaVelha`;
      chamadas_na_ura.push(id);

      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "URA",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }

      await this.command("answer");
      await this.command("playback", "silence_stream://1000");

      let opcao = "";
      this.on("DTMF", call => {
        opcao += call.body["DTMF-Digit"];
      });
      await this.command(
        "play_and_get_digits",
        "1 1 1 5000 1 /home/ec2/tembici/IVR_VilaVelha2018.wav"
      );

      if (opcao === "1") {
        to = "551100000005";
      }

      this.command("playback", "local_stream://default");
      removerListaUra(id);
      chamadas_na_espera.push([this, id, from, to]);

      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "QUEUE",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }
    }

    if (to === "2420") {
      to = `550300313${to}`;
      from = `${from}Tembici`;
      chamadas_na_ura.push(id);
      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "URA",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }

      await this.command("answer");
      await this.command("playback", "silence_stream://1000");

      let opcao = "";
      this.on("DTMF", call => {
        opcao += call.body["DTMF-Digit"];
      });

      console.log(!(opcao === "1" || opcao === "2" || opcao === "3"));
      while (!(opcao === "1" || opcao === "2" || opcao === "3")) {
        opcao = "";
        await this.command(
          "play_and_get_digits",
          "1 1 1 5000 1 /home/ec2/tembici/IVR_Inicio_0300.wav"
        );
      }

      if (opcao === "1") {
        to = "551100000006";
      }
      if (opcao === "3") {
        to = "551100000007";
      }
      this.command("playback", "local_stream://default");
      removerListaUra(id);
      chamadas_na_espera.push([this, id, from, to]);

      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "QUEUE",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }
    }
  } catch (error) {
    console.log(`chamada terminada ${id}`);

    for (let index = 0; index < eventos.length; index++) {
      if (eventos[index].id === id) {
        eventos[index].status.push({
          state: "HANGUP",
          horario: moment().format("DD-MM-YYYY HH:mm:ss")
        });
      }
    }

    for (let index = 0; index < chamadas_ativas.length; index++) {
      if (chamadas_ativas[index] === id) {
        chamadas_ativas.splice(index, 1);
      }
    }

    for (let index = 0; index < chamadas_na_ura.length; index++) {
      if (chamadas_na_ura[index] === id) {
        chamadas_na_ura.splice(index, 1);
      }
    }

    for (let index = 0; index < chamadas_na_espera.length; index++) {
      if (chamadas_na_espera[index][1] === id) {
        chamadas_na_espera.splice(index, 1);
      }
    }

    for (let index = 0; index < chamadas_no_basix.length; index++) {
      if (chamadas_no_basix[index] === id) {
        chamadas_no_basix.splice(index, 1);
      }
    }
  }
};

setInterval(async () => {
  if (chamadas_na_espera.length > 0 && chamadas_no_basix.length < limit) {
    let [conn, id, from, to] = chamadas_na_espera.shift();

    try {
      await conn.command("set", `effective_caller_id_name=${from}`);
      await conn.command("set", `effective_caller_id_number=${from}`);
      await conn.command("set", `bridge_generate_comfort_noise=true`);
      removerListaEspera(id);
      chamadas_no_basix.push(id);

      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "CALLCENTER",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }

      await conn.command("bridge", `sofia/gateway/gateway_cloud/${to}`);
      await conn.hangup();
    } catch (error) {
      console.log(`chamada terminada ${id}`);

      for (let index = 0; index < eventos.length; index++) {
        if (eventos[index].id === id) {
          eventos[index].status.push({
            state: "HANGUP",
            horario: moment().format("DD-MM-YYYY HH:mm:ss")
          });
        }
      }

      for (let index = 0; index < chamadas_ativas.length; index++) {
        if (chamadas_ativas[index] === id) {
          chamadas_ativas.splice(index, 1);
        }
      }

      for (let index = 0; index < chamadas_na_ura.length; index++) {
        if (chamadas_na_ura[index] === id) {
          chamadas_na_ura.splice(index, 1);
        }
      }

      for (let index = 0; index < chamadas_na_espera.length; index++) {
        if (chamadas_na_espera[index][1] === id) {
          chamadas_na_espera.splice(index, 1);
        }
      }

      for (let index = 0; index < chamadas_no_basix.length; index++) {
        if (chamadas_no_basix[index] === id) {
          chamadas_no_basix.splice(index, 1);
        }
      }
    }
  }
}, tempo);

setInterval(async () => {
  console.log(`Chamadas ativas: ${chamadas_ativas.length}`);
  console.log(`Chamadas na ura: ${chamadas_na_ura.length}`);
  console.log(`Chamadas na espera: ${chamadas_na_espera.length}`);
  console.log(`Chamadas no basix: ${chamadas_no_basix.length}`);
}, 5000);

setInterval(async () => {
  for (let i = 0; i < eventos.length; i++) {
    for (let a = 0; a < eventos[i].status.length; a++) {
      if (eventos[i].status[a].state === "HANGUP") {
        saida.write(JSON.stringify(eventos[i]));
        eventos.splice(i, 1);
      }
    }
  }
}, 60000);

const server = esl.server(call_handler);
server.listen(8087);
