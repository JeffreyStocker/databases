var db = require('../db');

var dbChat = db.db;

module.exports = {
  messages: {
    get: function () {
      console.log ('Controller: Messages: Get');
      dbChat.query('SELECT Messages.id, Messages.message, Rooms.roomName, Users.username FROM Messages, Rooms, Users', (error, results, field) => {
        // console.log('results',results,'\nfield', field);
        if (!error) {
          console.log ('db results: ', results);
        } else {
          console.log ('db error: ', error);
        }
      });
    }, // a function which produces all the messages
    post: function (message) {
      console.log ('Controller: Messages: Post');
      // message = JSON.parse(message);
      var data = {};
      data.username = message.username || 'anonymous';
      data.message = message.text || '';
      data.room = message.roomname || 'lobby';
      // { '0': { username: 'Bob', text: 'test', roomname: 'lobby' } }
      // console.log('post args', arguments);
      // console.log (data)


      dbChat.query(`INSERT INTO Rooms (roomName) values ('${data.room}')`, (error, responseRoom) => {
        if (error) {
          console.log('Error posting message:', error);
        } else {
          // console.log('Message posted:', message, '||', response);
          dbChat.query(`insert into Users (username) values ('${data.username}')`, (error, responseUser) => {
            if (error) {
              console.log('Error posting message:', error);
            } else {
              dbChat.query(`insert into Messages (room, username, message) values ('${responseRoom.insertId}', '${responseUser.insertId}', '${data.message}')`, (error, response) => {
                if (error) {
                  console.log('Error posting message:', error);
                } else {
                  console.log ('WE INSERTED THINGS CORRECTLY WE THINK!!!!');
                  console.log (responseUser);
                }
              });
            }
          });
        }
      });

      // dbChat.query(
      //   `start transaction;
      //   insert into Rooms (roomName) 
      //     values (${data.room});

      //   insert into Users  (username)
      //     values (${data.username});

      //   select Users.id, Rooms.id from Users, Rooms 

      //   insert into Messages set;

      //   ${database.room}
  
      // `);



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

