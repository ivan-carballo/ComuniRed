import express from "express"
import cors from "cors"
import userController from "../controllers/userController.js"

const app = express()
app.use(cors())



// Funcion para validar el correo electronico
const validateById = async (req,res) =>{
    const id = req.params.id
    const propiedad = await userController.getById(id);

    
    // Tres estados posibles, validar correcto, ya validado de antes y dato ID incorrecto
    if (propiedad && propiedad.validateEmail == false) { // Validar correcto
        const newArrayUpdate = {'validateEmail': true}
        const sendUpdateUser = await userController.update(id, newArrayUpdate)

        const arrayPropiedad = [propiedad.username, true]
        res.json({data:arrayPropiedad})

    } else if (propiedad && propiedad.validateEmail == true) { // Ya validado que dara un enlace caducado
        const arrayPropiedad = [propiedad.username, false]
        res.json({data:arrayPropiedad})

    } else { // Error de ID por ser incorrecto o no existir en mongoDB
        const arrayPropiedad = [false, false]
        res.json({data:arrayPropiedad})

    }
}






export {
    validateById
}