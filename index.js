const nodemailer = require('nodemailer');

function erroremail(service, email, pass, toemail) {
  if(!service||!email||!pass||!toemail) throw new Error('Errormail: Not Valid Parameters');

  const transporter = nodemailer.createTransport({
    service: service,
    auth: {
      user: email,
      pass: pass
    }
  });

  return function (err, req, res, next){
    const date = new Date();
    const content = `
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Erroremail</title>
      <style>
        body, h1, p {
          margin: 0;
          padding: 0;
        }
    
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.5;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
    
        h1 {
          color: #333;
          margin-bottom: 20px;
          text-align: center;
        }
    
        p {
            color: #555;
            margin-top: 5px;
        }
    
        #error{
            border: 2px solid #555;
            background-color: azure;
            padding: 5px;
            border-radius: 5px;
            font-family: monospace;
            color: black;
            box-shadow: 0px 2px 2px #5555556b;
            font-size: .875rem;
            line-height: 1.125rem;
            line-break: anywhere;
            white-space: pre-wrap;
            overflow: auto;
            max-height: 64vh;
        }
    
        footer{
            margin-top: 5px;
            text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Error eMail</h1>
        <p>Date: ${date.toString()}</p>
        <div id="error">${err.stack.toString()}</div>
        <p>Good luck !</p>
        <footer>
          <a href="https://github.com/GiorgiMakh/erroremail"><img width="32" height="32" src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"></img></a>   
        </footer>
      </div>
    </body>
    </html>    
    `;

    const mailOptions = {
      from: 'Error Mail',
      to: toemail,
      subject: `Error ${err.code}`,
      html: content
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          console.log(error);
          next(error);
      } else {
          console.log('Error email sent: ' + info.response);
      }
    });
  }
}

module.exports = erroremail;