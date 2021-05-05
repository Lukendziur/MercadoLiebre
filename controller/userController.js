const {validationResult} = require('express-validator');



let userController = {
    register: (req, res) => {
        res.render('register');
    },

    processRegister: (req, res) =>{
       const resultValidation = validationResult(req);
       if(resultValidation.errors.length > 0){
        return res.render('register', {
            errors: resultValidation.mapped(),
            oldData: req.body //Esto es para que no se vaya borrando lo que uno escribe
        });
    }
       return res.send('Se ha registrado con éxito') //acá iria un res.redirect hacia la página del uduario
    },

    login: (req, res) => {
        res.render('login')
    }
}

module.exports = userController

