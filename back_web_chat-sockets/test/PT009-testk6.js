//k6 run PT009-testk6.js
import { check, sleep } from 'k6';
import ws from 'k6/ws';
import { Trend } from 'k6/metrics';

// Criar uma métrica para armazenar tempos de resposta
let responseTimeMetric = new Trend('ws_response_time');

export const options = {
  vus: 10, // 10 usuários simultâneos
  duration: '30s', // Rodar o teste por 30 segundos
};

export default function () {
  const url = 'ws://localhost:3333'; // Substitua pelo endereço do seu WebSocket

  const res = ws.connect(url, function (socket) {
    socket.on('open', function () {
      console.log('Conectado ao servidor!');
      
      // Função para enviar mensagem e medir tempo de resposta
      function sendMessage() {
        const startTime = Date.now(); // Captura o tempo de envio
        socket.send('Hello Server'); // Envia a mensagem

        socket.on('message', function (data) {
          const endTime = Date.now(); // Captura o tempo de resposta
          const responseTime = endTime - startTime; // Calcula o tempo total
          
          responseTimeMetric.add(responseTime); // Salva a métrica

          console.log(`Resposta recebida: ${data} - Tempo: ${responseTime}ms`);
        });
      }

      function recvMessage() {
        socket.on('message', function (data) {
          console.log(`Mensagem recebida: ${data}`);
        });
      }

      // Cada usuário envia mensagens a cada 2 segundos
      for (let i = 0; i < 5; i++) {
        sleep(2); // Aguarda 2 segundos antes de enviar
        sendMessage();
      }

        // Cada usuário recebe mensagens a cada 2 segundos
        for (let i = 0; i < 5; i++) {
            sleep(2); // Aguarda 2 segundos antes de receber
            recvMessage();
        }
    });

    socket.on('close', function () {
      console.log('Conexão fechada!');
    });

    socket.on('error', function (e) {
      console.log(`Erro: ${e.error()}`);
    });

    sleep(10); // Mantém a conexão aberta
    socket.close();
  });

  check(res, {
    'Conexão bem-sucedida': () => res !== undefined,
  });
}
