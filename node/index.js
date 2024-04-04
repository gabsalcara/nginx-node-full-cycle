const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'devops',
    database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sqlCreate =  `CREATE TABLE IF NOT EXISTS people (id INT auto_increment, name VARCHAR(255), primary key (id))`
connection.query(sqlCreate)

const sqlInsert = `INSERT INTO people(name) values('Gabriel'),('Fernando'),('Wesley')`
connection.query(sqlInsert)

const sqlPeople = `SELECT * FROM people`
connection.query(sqlPeople, (error,rows) => {
    if(error) {
        console.error('Erro ao selecionar da tabela people: ', err);
        return;
    }

    connection.end();

    app.get('/', (req, res) => {
        
        const resultHtml = `<h1>Full Cycle Rocks!</h1></br><p>${JSON.stringify(rows)}</p>`;
        res.send(resultHtml);
    });

    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
});