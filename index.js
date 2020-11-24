const express = require('express');
const app = express();
const pool = require('./dataBase/db');


app.use(express.json())
//ROUTES//

//Obtenir la liste des tâches à faire
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
       res.json(allTodos.rows);
    } catch (error) {
      console.error(error.message);
    }
})
//Obtenir une tâche
app.get("/todos/:id", async(req, res) => {
    const {id} = req.params;
    try {
const todo = await pool.query('SELECT * FROM todo WHERE todo_id=$1 ', [id]);
res.json(todo.rows[0])
    } catch (error) {
        console.error(error.message);
    }
})
//Créer une tâche
app.post('/todos', async(req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [description]);
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})
//modifier une tâche
app.put("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query('UPDATE todo SET description =$1 WHERE todo_id=$2', [description,id]);
        res.json("Tâche modifiée avec succès !");
    } catch (error) {
        console.error(error.message);
    }
})
//Supprimer une tâche
app.delete('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json('Tâche supprimée avec succès !')
    } catch (error) {
        console.log(error.message);
    }
})


app.listen(8000,() =>{
    console.log('Le serveur a démarré sur le port 8000');
})