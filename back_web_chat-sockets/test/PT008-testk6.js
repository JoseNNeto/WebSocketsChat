//k6 run PT008-testk6.js
import { check, sleep } from 'k6';
import ws from 'k6/ws';

export const options = {
  stages: [
    { duration: '10s', target: 5 },  
    { duration: '10s', target: 8 },  
    { duration: '10s', target: 10 },  
    { duration: '10s', target: 12 },
    { duration: '10s', target: 15 },
    { duration: '10s', target: 20 },
    { duration: '10s', target: 30 },
    { duration: '10s', target: 35 },
    { duration: '10s', target: 40 },
    { duration: '10s', target: 50 }, // Chegar até o limite de 50
  ],
};

export default function () {
  const url = 'ws://localhost:3333'; // Substitua pelo seu servidor WebSocket

  const res = ws.connect(url, function (socket) {
    socket.on('open', function () {
      console.log('Conectado ao servidor!');
    });

    socket.on('message', function (data) {
      console.log(`Mensagem recebida: ${data}`);
    });

    socket.on('close', function () {
      console.log('Conexão fechada!');
    });

    socket.on('error', function (e) {
      console.log(`Erro: ${e.error()}`);
    });

    sleep(10); // Cada conexão fica ativa por 10 segundos
    socket.close(); // Fecha a conexão ao final
  });

  check(res, {
    'Conexão bem-sucedida': () => res !== undefined,
  });
}
