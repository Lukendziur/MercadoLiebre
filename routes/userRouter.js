const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const path = require('path');

//Configuración de multer
const multer = require('multer');
const {body} = require('express-validator') //body tmb se puede usar como 'check'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/avatars');
    },
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
})
const uploadFile = multer({storage});


const validations = [
    body('nombre').notEmpty().withMessage('Se requiere un nombre'),
    body('nombreUsuario').notEmpty().withMessage('Se requiere un nombre de usuario'),
    body('fecha').notEmpty().withMessage('Se requiere una fecha de nacimiento'),
    body('adress').notEmpty().withMessage('Se requiere una dirección'),
    body('perfil').notEmpty().withMessage('Se requiere una opción'),
    body('intereses').notEmpty().withMessage('Se requiere una opción'),
    body('avatar').custom((value, { req }) =>{
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.gif', '.png'];
        
        
        if(!file){
            throw new Error ('Tenés que subir una imagen');

        }else{
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)){
            throw new Error(`Las extensiones de archivo permitidas son  ${acceptedExtensions.join(', ')}`);
        
        }
        
    }
    return true;
    }),
    body('password').notEmpty().withMessage('Se requiere una contraseña'),

    // ejemplo para validación de email:
    // body('email').notEmpty().withMessage('Se requiere un email').bail()
    // .isEmail().withMessage('debes poner un email válido)
    // 

]


//implementacion sobre el router
router.get('/Register', userController.register);
router.post('/Register', uploadFile.single('avatar'), validations, userController.processRegister);

router.get('/Login', userController.login);

// router.get('/profile/:userId', userController.profile);

 module.exports = router;
