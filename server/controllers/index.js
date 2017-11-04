var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('Message: Get:');
      /// get the messages
      models.messages.get();
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
        models.messages.post(body);
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
    },
    post: function (req, res) {
      console.log('users: Post:');
    }
  }
};

