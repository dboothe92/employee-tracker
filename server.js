const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

app.get('/api/employee', (req, res) => {
    res.json({
        message: 'Look at that you have a server!'
    })
});

app.listen(PORT, () => {
    console.log(`Server is now live on port ${PORT}`);
})




