const express = require('express');
const router = express.Router();

//Conexion a la base de datos
const pool = require('../mysqlconn');

// Task Model
/*const Task = require('../models/task');*/

// GET all users
router.get('/', async (req, res) => {
  const users = await pool.query('SELECT * FROM users');
  res.json(users);
});


// GET user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const users = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  res.json(users);
});

// ADD a new USER
router.post('/', async (req, res) => {
  const { name, ruc, phone, email } = req.body;
  console.log(email);
  const newUser = {
    name,
    ruc,
    phone,
    email
  };
  await pool.query('INSERT INTO users SET ?', [newUser]);
  //req.flash('success', 'User Saved Successfully');
  //Must return a json to React
  res.json({"Status":'User Saved'});
});

// UPDATE a user
router.put('/:id', async (req, res) => {
  console.log('PUT REQ')
  const { id } = req.params;
  const { name, ruc, phone, email } = req.body;
  const updateUser = {
    name,
    ruc,
    phone,
    email
  }; 
  await pool.query('UPDATE users SET ? WHERE id = ?', [updateUser, id]);
  res.json({ "Status": 'User Updated' });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteResult = await pool.query('DELETE FROM users WHERE id = ?', [id]);
  //console.log(deleteResult.affectedRows);
  res.json({ "Status": 'User Deleted' });
});

module.exports = router;
