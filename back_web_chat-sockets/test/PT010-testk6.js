//k6 run PT010-testk6.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  iterations: 3,
};

const BASE_URL = 'http://localhost:3333/user/login'; // Certifique-se de que a URL está correta

export default function () {
  const testCases = [
    { username: 'testek6@gmail.com', password: 'senha_errada', expectedMsg: 'Senha incorreta', expectedStatus: 400 },
    { username: 'usuario_invalido@gmail.com', password: 'senha_certa', expectedMsg: 'Usuário não cadastrado', expectedStatus: 404 },
    { username: 'usuario_invalido@gmail.com', password: 'senha_errada', expectedMsg: 'Usuário não cadastrado', expectedStatus: 404 },
  ];

  for (let i = 0; i < testCases.length; i++) {
    const payload = JSON.stringify({
      email: testCases[i].username,
      senha: testCases[i].password,
    });

    const headers = { 'Content-Type': 'application/json' };
    const res = http.post(BASE_URL, payload, { headers });

    console.log(`🔹 Tentativa ${i + 1}: ${testCases[i].username} / ${testCases[i].password}`);
    console.log(`🔸 Status: ${res.status}`);
    console.log(`🔹 Resposta completa: ${res.body}`);

    // Verificando o tipo de conteúdo da resposta
    const contentType = res.headers['Content-Type'] || '';
    if (contentType.includes('application/json')) {
      try {
        let jsonResponse = JSON.parse(res.body);
        console.log(`🔹 JSON interpretado:`, jsonResponse);

        // Verificando a mensagem de erro
        check(res, {
          'Mensagem de erro correta': (r) => jsonResponse.msg && jsonResponse.msg.includes(testCases[i].expectedMsg),
        });
      } catch (e) {
        console.error('❌ Erro ao parsear JSON:', e);
      }
    } else {
      console.warn('⚠️ A resposta não é JSON:', contentType);
    }

    // Verificando o status da resposta
    check(res, {
      'Status correto': (r) => r.status === testCases[i].expectedStatus,
    });

    sleep(1);
  }
}
