const path = require('path');
const fs = require('fs');

const usersController = {
    users: (req, res) => {
        let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
        res.render(path.resolve(__dirname, '../views/usuarios/users'), {users});
    },
    login: (req, res) => {
        res.render(path.resolve(__dirname, '../views/usuarios/login'));
    },
    register: (req,res) => {
        let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
        res.render(path.resolve(__dirname, '../views/usuarios/register'), {users});
    },  
    save: (req,res) => {
        let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
        let ultimoUsers = users.pop();
        users.push(ultimoUsers);
        let nuevoUsers = {
            id: parseInt(ultimoUsers.id + 1),
            nombre: req.body.nombre,
            email: req.body.email,
            password: req.body.password,
            cellphone: req.body.cellphone,
            direccion: req.body.direccion,
            imagen: req.file.filename
        }
        users.push(nuevoUsers);
        let nuevoUsersGuardar = JSON.stringify(users,null,2) //aca se guarda esa informacion de una manera organizada con el null y 2
        fs.writeFileSync(path.resolve(__dirname, '../database/users.json'), nuevoUsersGuardar); //writeFileSync me permite guardar el archvio
        res.redirect('/users');
    },
    ver: (req,res) => {
        let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json'))); 
        let miUsers;
        users.forEach(user =>{
            if(user.id == req.params.id){
                miUsers = user;
            }
        });
        res.render(path.resolve(__dirname, '../views/usuarios/ver'), {miUsers})
    },
    edit: (req,res) => {
        let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
        const usersId = req.params.id;
        let userEditar = users.find(user => user.id == usersId);
        res.render (path.resolve(__dirname, '../views/usuarios/register'), {userEditar});
    },
    update: (req,res) => {
        let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
        req.body.id = req.params.id;
        req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
        //si la info es igual haga lo del if
        let usersUpdate = users.map(user => {
            if(user.id == req.body.id){
                return user = req.body;
            }
            return user;
        })
        let userActualizar = JSON.stringify(usersUpdate,null,2);
        fs.writeFileSync(path.resolve(__dirname, '../database/users.json'), userActualizar);
        res.redirect('/users');
    }
}

module.exports = usersController;
