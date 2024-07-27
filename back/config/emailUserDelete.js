import dotenv from 'dotenv';
import Mailjet from 'node-mailjet';
dotenv.config();


async function sendEmailUserDelete(username, email) {

  // Incluir las claves publicas y privadas del servicio de envio de email
  const mailjet = new Mailjet({apiKey: '4f9935f315b5d9cdb36645e5c31a0f7b', apiSecret: 'e18f8d62f5f50f6326d516590f0c45bb'})


  // Cuerpo completo del email
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'soporte.comunired@gmail.com',
          Name: 'ComuniRed Admissions',
        },
        To: [
          {
            Email: email,
            Name: username,
          },
        ],
        Subject: 'Confirmación de eliminación de cuenta de ComuniRed',
        HTMLPart:
          `<h3>Estimad@ ${username}</h3>

            <p>Le escribimos para confirmar que su solicitud de eliminación de cuenta ha sido procesada con éxito. Su cuenta de usuario y todos los datos asociados han sido eliminados de nuestra base de datos de forma permanente.</p>

            <p>Nos gustaría informarle que, debido a las políticas de seguridad y privacidad, no será posible reutilizar el mismo nombre de usuario o dirección de correo electrónico para futuras cuentas.</p>

            <p>Lamentamos que haya decidido dejar nuestra comunidad. Le aseguramos que extrañaremos su presencia y su participación. Si en algún momento decide regresar, estaremos encantados de darle la bienvenida nuevamente.</p>

            <p>Agradecemos el tiempo que pasó con nosotros y esperamos que en el futuro podamos tener el placer de volver a contar con usted.</p>

            <p>Saludos cordiales,</p>

            <b>Atentamente, el equipo de ComuniRed</b>`,
      },
    ],
  })
  request
    .then(result => {
      console.log('result.body', result.body)
    })
    .catch(err => {
      console.log('err.statusCode', err.statusCode)
    })

}



export {
    sendEmailUserDelete,
}