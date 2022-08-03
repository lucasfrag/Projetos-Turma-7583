import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "Veiculos.db"; //Nome do banco de dados
const database_version = "1.0"; //Versão do banco de dados
const database_displayname = "Veiculos - React Native"; //Nome de exibição do banco de dados
const database_size = 200000; //tamanho do banco de dados

export default class Database {

    Conectar() {
        let db;
        return new Promise((resolve) => {
            SQLite.echoTest().then(() => {
                SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then(DB => {
                    db = DB;
                    db.executeSql('SELECT 1 FROM Veiculo LIMIT 1').then(() => {
                        console.log("O banco de dados está pronto ... Executando Consulta SQL ...");
                    }).catch((error) => {

                        console.log("O Banco de dados não está pronto ... Criando Dados");
                        db.transaction((tx) => {
                            tx.executeSql('CREATE TABLE IF NOT EXISTS Veiculo (id INTEGER PRIMARY KEY AUTOINCREMENT, modelo VARCHAR(30), marca VARCHAR(30), ano INTEGER, imagem TEXT);');
                        }).then(() => {
                            console.log("Tabela criada com Sucesso");
                        }).catch(error => {
                            console.log(error);
                        });
                    });
                    resolve(db);
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log("echoTest Falhou - plugin não funcional");
            });
        });
    }


    Desconectar(db) {
        if (db) {
            console.log("Fechando Banco de Dados");
            db.close().then(status => {
                console.log("Banco de dados Desconectado!!");
            }).catch(error => {
                console.log(error)
            });
        } else {
            console.log("A conexão com o banco não está aberta");
        }
    };


    // Operações de CRUD
    Listar() {
        return new Promise((resolve) => {
            const lista = [];
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para listar os dados da tabela   
                    tx.executeSql('SELECT * FROM Veiculo', []).then(([tx, results]) => {

                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            const { id, modelo, marca, ano, imagem } = row;
                            lista.push({ id, modelo, marca, ano, imagem });
                        }
                        console.log(lista);
                        resolve(lista);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });

    }


    Inserir(item) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {     
                    //Query SQL para inserir um novo produto   
                    tx.executeSql('INSERT INTO Veiculo (modelo, marca, ano, imagem) VALUES (?, ?, ?, ?)', [item.modelo, item.marca, item.ano, item.imagem]).then(([tx, results]) => { 
                        resolve(results);        
                    });      
                }).then((result) => {        
                    this.Desconectar(db);      
                }).catch((err) => {        
                    console.log(err);      
                });    
            }).catch((err) => {      
                console.log(err);    
            });  
        });  
    }

    Remover(id) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {     
                    tx.executeSql('DELETE FROM Veiculo WHERE id = ?', [id]).then(([tx, results]) => {          
                        console.log(results);          
                        resolve(results);        
                    });      
                }).then((result) => {        
                    this.Desconectar(db);      
                }).catch((err) => {        
                    console.log(err);      
                });    
            }).catch((err) => {      
                console.log(err);    
            });  
        });  
    }

    /*
    updateProduct(id, prod) {  
        return new Promise((resolve) => {    
            this.initDB().then((db) => {      
                db.transaction((tx) => {
                    //Query SQL para atualizar um dado no banco        
                    tx.executeSql('UPDATE Produtos SET nome = ?, descricao = ?, imagem = ?, preco = ? WHERE id = ?', [prod.nome, prod.descricao, prod.imagem, prod.preco, id]).then(([tx, results]) => {          
                    resolve(results);        
                });      
            }).then((result) => {        
                  this.closeDatabase(db);      
                }).catch((err) => {        
                  console.log(err);      
                });    
            }).catch((err) => {     
                console.log(err);    
            });  
        });  
    }
    */
    

}