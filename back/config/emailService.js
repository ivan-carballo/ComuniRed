import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '79.umaru@gmail.com',
      pass: 'Miroku_Gmail'
    }
  })
  


  const sendVerificationEmail = (email, token) => {
    const mailOptions = {
      from: 'comunired-info@comunired.com',
      to: email,
      subject: 'Verificacion de email',
      text: `Bienvenido a ComuniRed. Le agradecemos que desee ser parte de esta gran comunidad. Para poder continuar necesitamos que verifique el correo electronico usado para su registro, debe pulsar en el siguiente enlace dentro de las siguientes 24 horas.`
    }
  


    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  }


  export {
    sendVerificationEmail
  }