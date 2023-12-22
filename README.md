# erroremail

Middleware which logs error and sends to email.

## Prerequisite
- [Node.js](https://nodejs.org/en/) on your platform
- Setup Gmail for [app](https://support.google.com/mail/answer/185833?hl=en#) authorization

## Installation

```bash
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
app.use(erroremail('Gmail', 'Your@gmail.com', 'Gmail App Password'));
```

## Single target email address example

```js
app.use(erroremail('Gmail', 'Your@gmail.com', 'Gmail App Password', 'Tomail@gmail.com'));
```

## Multiple emails example

```js
app.use(erroremail('Gmail', 'Your@gmail.com', 'Gmail App Password', ['Tomail@gmail.com', 'Tomail@gmail.com']));
```

## License

[MIT](LICENSE)
