import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id:1,
          title: 'Website Development',
          type: 'deposit',
          category: 'Work',
          amount: 4000,
          createdAt: new Date('2021-06-15 11:30:00')
        },
        {
          id:2,
          title: 'Hamburger Combo',
          type: 'withdraw',
          category: 'Food',
          amount: 30,
          createdAt: new Date('2021-06-22 13:30:00')
        }
      ]
    });
  },

  routes(){
    this.namespace = 'api';

    this.get('/transactions', () =>{
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request)=>{
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