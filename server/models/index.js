var db = require('../db');

var dbChat = db.db;

module.exports = {
  messages: {
    get: function () {
      console.log ('Controller: Messages: Get');
      // dbChat.query('SELECT Messages.id, Messages.message, Rooms.roomName, Users.username FROM Messages, Rooms, Users', (error, results, field) => {
      dbChat.query('SELECT * FROM Messages, Rooms, Users', (error, results, field) => {
        if (!error) {
          console.log ('db results: ', results);
        } else {
          console.log ('db error: ', error);
        }
      });
    }, // a function which produces all the messages
    post: function (message) {
      console.log ('Controller: Messages: Post');
      message = JSON.parse(message);  //don't delete
      var data = {};
      data.username = message.username || 'anonymous';
      data.message = message.text || '';
      data.room = message.roomname || 'lobby';
      // { '0': { username: 'Bob', text: 'test', roomname: 'lobby' } }
      // console.log('post args', arguments);
      // console.log (data)

      /////////////note////////////
      //we appear to be inserting data multiple times...
      dbChat.query(`INSERT INTO Rooms (roomName) values ('${data.room}')`, (error, responseRoom) => {
        if (error) {
          console.log('Error posting message:', error);
        } else {
          console.log ('WE INSERTED THINGS CORRECTLY WE THINK!!!!');
          console.log (responseRoom);
        }
      });

      // dbChat.query(`INSERT INTO Rooms (roomName) values ('${data.room}')`, (error, responseRoom) => {
      //   if (error) {
      //     console.log('Error posting message:', error);
      //   } else {
      //     // console.log('Message posted:', message, '||', response);
      //     dbChat.query(`insert into Users (username) values ('${data.username}')`, (error, responseUser) => {
      //       if (error) {
      //         console.log('Error posting message:', error);
      //       } else {
      //         dbChat.query(`insert into Messages (room, username, message) values ('${responseRoom.insertId}', '${responseUser.insertId}', '${data.message}')`, (error, response) => {
      //           if (error) {
      //             console.log('Error posting message:', error);
      //           } else {
      //             console.log ('WE INSERTED THINGS CORRECTLY WE THINK!!!!');
      //             console.log (responseUser);
      //           }
      //         });
      //       }
      //     });
      //   }
      // });



    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      console.log ('Controller: users: Get');
    },
    post: function () {
      console.log ('Controller: users: Post');
    }
  }
};

