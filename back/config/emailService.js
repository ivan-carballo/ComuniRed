import dotenv from 'dotenv';
import Mailjet from 'node-mailjet';
dotenv.config();


async function sendEmail(email, username, url) {

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
        Subject: '¡Bienvenid@ a ComuniRed! Verifica tu correo electrónico para comenzar',
        HTMLPart:
          `<h3>¡Hola ${username}!</h3>

            <p>Nos alegra darte la bienvenida a ComuniRed, tu nueva red social donde podrás conectar con amigos, compartir momentos y descubrir contenido interesante.</p>

            <p>Para completar el proceso de registro y empezar a disfrutar de todas las funcionalidades de ComuniRed, necesitamos que verifiques tu correo electrónico. Este paso es fundamental para garantizar la seguridad de tu cuenta y asegurarnos de poder contactar con usted en caso de cualquier problema tecnico.</p>

            <p>Por favor, haz clic en el siguiente enlace para verificar tu correo electrónico:</p>

            <a href='http://api.comunired.ivancm.info/validate/${url}'>Verificar email</a>

            <p>Si el enlace no funciona, copia y pega la siguiente URL en tu navegador:</p>

            <p>http://api.comunired.ivancm.info/validate/${url}</p>

            <p>¡Y eso es todo! Una vez que hayas verificado tu correo, estarás listo para explorar todo lo que ComuniRed tiene para ofrecer.</p>

            <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos respondiendo a este correo. Estaremos encantados de asistirte.</p>

            <p>¡Gracias por unirte a ComuniRed!</p>

            <p>Saludos cordiales,</p>

            <b>El equipo de ComuniRed</b>`,
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
  sendEmail,
}