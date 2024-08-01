// Biblioteca que escuta chamadas http
const http = require("http");

// Biblioteca que comunica com banco de dados
const sqlite3 = require("sqlite3").verbose();

// Iniciando comunicação com banco de dados
const db = new sqlite3.Database("database.sqlite", (err) => {
    if(err){
        console.error(err);
    }else{
        console.log("Conexão realizado com sucesso!");
    }
})

// Executa a query de criação da tabela produtos
db.run(
    `CREATE TABLE IF NOT EXISTS produtos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_name TEXT,
        id_supplier INTEGER,
        id_category INTEGER,
        unit TEXT,
        price float
    )`,
    (err) => {
        if(err){
            console.error(err);
        }else{
            console.log("Tabela criada com sucesso");
        }
    }
);

// Executa a query que busca os dados do banco de dados
const search = (callback)=>{
    db.all("SELECT * FROM produtos", (err, rows) =>{
        if(err){
            console.error(err);
        }else{
            callback(rows);
        }
    });
};

//Executa a query que insere um valor no banco de dados
const insertData = db.prepare(
    `INSERT INTO produtos(product_name, id_supplier, id_category, unit, price)
    VALUES (?, ?, ?, ?, ?)`,
    (err) => {
        if(err){
            console.error(err);
        }else{
            console.log("Dados inseridos com sucesso!");
        }
    }
)

// Executa a query que deleta um valor do banco de dados
const deleteData = db.prepare(`DELETE FROM produtos WHERE id = ?`,
    (err) => {
        if(err){
            console.error(err);
        }else{
            console.log("Dados excluídos com sucesso.");
        }
    }
);

// Executa a query que atualiza um valor no banco de dados
const modifyData = db.prepare(
    `UPDATE produtos
        SET product_name = ?,
            id_supplier = ?,
            id_category = ?,
            unit = ?,
            price = ?
    WHERE id = ?`,
    (err) => {
        if(err){
            console.error(err);
        }else{
            console.log("Dados modificados com sucesso.");
        }
    }
);

// Cria o listenner das requisições http
const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-type");

    search((result)=>{
        res.write(JSON.stringify(result));
        res.end();
    });

    if(req.method === "POST"){
        let body = "";
        req.on(`data`, (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const parsedBody = JSON.parse(body);
            insertData.run(
                parsedBody.product_name,
                parsedBody.id_supplier,
                parsedBody.id_category,
                parsedBody.unit,
                parsedBody.price
            );
            console.log("Dados criados com sucesso")
        })
    }else if(req.method === "DELETE"){
        let body = "";
        req.on("data", (chunk)=>{
            body+=chunk;
        });
        req.on("end", () => {
            const parsedBody = JSON.parse(body);
            console.log(parsedBody);
            deleteData(parsedBody.id);
            console.log("Dados excluídos com sucesso");
        });
    }else if(req.method === "PUT"){
        const parsedBody = JSON.parse(body);
            modifyData.run(
                parsedBody.product_name,
                parsedBody.id_supplier,
                parsedBody.id_category,
                parsedBody.unit,
                parsedBody.price
            );
            console.log("Dados modificados com sucesso!");
    }
});

const port = 3000;
server.listen(port);
console.log(`Servidor escutando na porta ${port}`);