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
        <div id="error">${err.toString()}</div>
        <p>Good luck !</p>
        <footer>
            <a href="https://github.com/GiorgiMakh"><svg x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.6,5,2.5,9.3,6.9,10.7v-2.3c0,0-0.4,0.1-0.9,0.1c-1.4,0-2-1.2-2.1-1.9 c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1c0.4,0,0.7-0.1,0.9-0.2 c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6c0,0,1.4,0,2.8,1.3 C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3 c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v3.3c4.1-1.3,7-5.1,7-9.5C22,6.1,16.9,1.4,10.9,2.1z"></path>
            </svg></a>
        </footer>
      </div>
    </body>
    </html>    
    `;

    const mailOptions = {
      from: 'Error Mail',
      to: toemail,
      subject: `Error ${date.toString()}`,
      html: content
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          console.log(error);
          next(error);
      } else {
          console.log('Email sent: ' + info.response);
      }
    });
  }
}

module.exports = erroremail;