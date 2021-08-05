import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';

import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

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

  routes() {
    this.namespace = 'api'; // sub rota - ex: api/TRANSACTIONS
    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data);
    });
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);