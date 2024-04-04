const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'devops',
    database: 'nodedb'
};

const connection = mysql.createConnection(config)

// Conecta ao banco de dados
connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return;
    }
    console.log('Conexão ao banco de dados MySQL estabelecida');
    
    // Criação da tabela "people" se não existir
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255)
      )
    `;
    connection.query(createTableQuery, (err, result) => {
      if (err) {
        console.error('Erro ao criar tabela:', err);
        return;
      }
      console.log('Tabela "people" criada com sucesso ou já existente');
      
      // Insere dados na tabela "people"
      const insertQuery = `INSERT INTO people (name) VALUES ('Gabriel'), ('Wesley'), ('Full Cycle')`;
      connection.query(insertQuery, (err, result) => {
        if (err) {
          console.error('Erro ao inserir dados na tabela:', err);
          return;
        }
        console.log('Dados inseridos na tabela "people" com sucesso');
        
        // Define um endpoint HTTP para retornar os nomes da tabela
        app.get('/', (req, res) => {
          const selectQuery = `SELECT name FROM people`;
          connection.query(selectQuery, (err, result) => {
            if (err) {
              console.error('Erro ao selecionar dados da tabela:', err);
              res.status(500).json({ error: 'Erro ao selecionar dados da tabela' });
              return;
            }
            const names = result.map(row => row.name);
            const html = `<h1>Full Cycle Rocks!</h1><ul>${names.map(name => `<li>${name}</li>`).join('')}</ul>`;
            res.send(html);
          });
        });

        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
      });
    });
  });