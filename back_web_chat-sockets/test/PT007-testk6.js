import { check, sleep } from 'k6';
import ws from 'k6/ws';

export const options = {
  vus: 10, // Número de conexões simultâneas
  duration: '10s', // Tempo total do teste
};

export default function () {
  const url = 'ws://localhost:3333'; // Muda para o host do teu servidor

  const res = ws.connect(url, function (socket) {
    socket.on('open', function () {
      console.log('Conectado ao servidor!');
      socket.send(JSON.stringify({ message: 'Teste WebSocket' }));
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

    sleep(30); // Mantém a conexão por 30 segundos
    socket.close(); // Fecha a conexão ao final
  });

  // Verificando se a conexão foi bem-sucedida
  check(res, {
    'Conexão bem-sucedida': () => res !== undefined, // Verifica se a conexão foi feita corretamente
  });
}
