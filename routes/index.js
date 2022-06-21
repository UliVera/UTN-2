var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', async (req, res, next) => {
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var message = req.body.message;

  console.log(req.body)

  var obj = {
    to: 'ulivera01@gmail.com',
    subject: 'Contacto desde la página web',
    html: nombre + apellido + "se contacto a traves y quiere mas info de este correo:" + email +  ". <br> Ademas hizo el siguiente comentario" + message
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  })
  var info = await transport.sendMail(obj);

  res.render('index', {
    message: "Mensaje enviado correctamente",
  });
});


module.exports = router;
