var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('Message: Get:');
      /// get the messages
      models.messages.get()
      .then((result) => {
        console.log ('results send Get:', result);
        res.writeHead(200);
        res.write(JSON.stringify({ results: result}));
        res.end();
      })
      .catch(error => {

      });
      
      // .then (function (results) {
      //   res.write(JSON.stringify(results));
      //   res.end();
      // })
      // .catch(function (error) {
      //   console.log ('error:', error);
      // });

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('Message: Post');

      let body = '';
      req.on('data', chunk => {
        body += chunk;
      });
      req.on('end', () => {
        console.log(body);
        models.messages.post(JSON.parse(body));
        res.writeHead(201);
        res.write(JSON.stringify({}));
        res.end();
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('users: Get:');
      models.users.get((error, data) => {
        if (error) {
          res.writeHead(404);
          
        } else {
          res.writeHead(200);
        }
        res.write(JSON.stringify({results: data}));
        res.end();
      });
    },
    post: function (req, res) {
      console.log('users: Post:');
      if (req.body !== undefined) {
        body = req.body;
        console.log ('raw body', typeof body)
        models.users.post(body, (error, data) => {
          if (error) {
            res.writeHead(404);
            
          } else {
            res.writeHead(201);
          }
          res.write(JSON.stringify({results: data}));
          res.end();
        });
      } else {
        let body = '';
        req.on('data', chunk => {
          body += chunk;
          console.log(body);
        });
        req.on('end', () => {
          console.log('body', body);
          models.users.post(JSON.parse(body), (error, data) => {
            if (error) {
              res.writeHead(404);
              
            } else {
              res.writeHead(201);
            }
            res.write(JSON.stringify({results: data}));
            res.end();
          });
        });
      }
    }
  }
};

