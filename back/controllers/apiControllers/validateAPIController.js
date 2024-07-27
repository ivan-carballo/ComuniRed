import express from "express"
import cors from "cors"
import userController from "../controllers/userController.js"
import { sendEmail } from '../../config/emailService.js'

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





// Funcion para enviar un nuevo correo de validacion
const validateByProperty = async(req,res)=>{
    const {property,value}=req.body;

    try {
        const propiedad = await userController.getByProperty(property,value);

        if (propiedad) {
            sendEmail(propiedad[0].email, propiedad[0].username, propiedad[0]._id)
            res.json({data:true})
        } else {
            res.json({data:false})
        }
    } catch (error) {
        res.json({data:error})
    }




}






export {
    validateById,
    validateByProperty
}