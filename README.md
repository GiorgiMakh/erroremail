# erroremail

Middleware which logs error and sends to email.

## Prerequisite
- [Node.js](https://nodejs.org/en/) on your platform
- Setup Gmail for [app](https://support.google.com/mail/answer/185833?hl=en#) authorization

## Installation

```sh
npm install erroremail --save-dev
```

## Example
```js
// Import our library
var erroremail = require('erroremail');

// App get
app.get('/example', (req, res, next)=>{
    try {
        res.json({"Happy Coding!"});
    } catch(err){
        next(err);
    }
});

// Error Handler Middleware
app.use(erroremail('Gmail','Your@gmail.com','Gmail App Password','To_mail@gmail.com'));
```

## License

[MIT](LICENSE)
