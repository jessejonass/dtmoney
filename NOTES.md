## Configurações
#### index.html & rootDir/public
removre favicon, meta description, logo, manifest, comments do index e deletar arquivos de *public*

#### na pasta rootDir/src
deixar só app, index e react-app-env.d.ts

#### index.tsx
remover webvitals e css

#### App.jsx
remover todas importações e deixar app só com div className=""

#### Mover de dependencies para devDependecies:
"@testing-library/jest-dom": "^5.11.4",
"@testing-library/react": "^11.1.0",
"@testing-library/user-event": "^12.1.10",
"@types/jest": "^26.0.15",
"@types/node": "^12.0.0",
"@types/react": "^17.0.0",
"@types/react-dom": "^17.0.0",
"typescript": "^4.1.2"

<hr />

## Desenvolvimento
yarn add styled-components
yarn add @types/styled-components -D

### Estilos globais
src/styles/global.ts

`
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #f0f2f5;
    --red: #e52e4d;
    --blue: #5429cc;
    --blue-light: #6933ff;
    --text-title: #363f5f;
    --text-body: #969cb3;
    --shape: #fff;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  // determina o tamanho global de 1rem
  html {
    @media (max-width: 1080px) {
      font-size: 93.75%; // font-size: 15px === 1rem
    }

    @media (max-width: 720px) {
      font-size: 87.5%; // font-size: 14px === 1rem
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h5, h5, h6 {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
`

### Usando o MirageJS para simular api
#### importar no rootDir/src/index.tsx o createServer e criar o server
`
import { createServer, Model } from 'miragejs';

createServer({
  // simula que existe um model de banco de dados
  models: {
    transaction: Model,
  },

  // criando seeds
  seeds(server) {
    server.db.loadData({
      transactions: [ // nome do modulo no plural
        {
          id: 1,
          title: 'Freelance de Website',
          type: 'deposit',
          category: 'Dev',
          amount: 600,
          createdAt: new Date('2021-06-29 09:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 300,
          createdAt: new Date('2021-07-02 11:15:00'),
        },
      ],
    });
  },

  // cria as rotas
  routes() {
    this.namespace = 'api'; // sub rota - ex: api/TRANSACTIONS

    // rota get de transactions - api/transactions
    this.get('/transactions', () => {
      return this.schema.all('transaction'); // retorna ALL transactions
    });

    // ROTA POST
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data);
    });
  }
});
`