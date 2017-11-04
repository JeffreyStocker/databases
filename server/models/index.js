var db = require('../db');

var dbChat = db.db;

module.exports = {
  messages: {
    get: function () {
      return new Promise ((resolve, reject) => {
        console.log ('Controller: Messages: Get');
        // objectId, username, text, createdAt, updatedAt, roomname
        // dbChat.query('SELECT Messages.id, Messages.message, Rooms.roomName, Users.username FROM Messages, Rooms, Users', (error, results, field) => {
        // dbChat.query('SELECT Messages.MessageId, Messages.message FROM Messages, Rooms, Users', (error, results, field) => {
        dbChat.query(`SELECT Messages.objectId, Messages.text, Users.username, Rooms.roomname, Messages.createdAt 
          FROM Messages left join (Rooms cross join Users)
          on (Rooms.roomId = Messages.room and Messages.username = Users.userId);`, (error, results, field) => {
          
          if (!error) {
            // console.log ('db results: ', results);
            resolve (results);
          } else {
            // console.log ('db error: ', error);
            reject(error);
          }
        });
      });
    }, // a function which produces all the messages
    post: function (message) {
      console.log ('Controller: Messages: Post');
      // message = JSON.parse(message);  //don't delete
      var data = {};
      data.username = message.username || 'anonymous';
      data.text = message.text || '';
      data.room = message.roomname || 'lobby';
      data.createdAt = new Date().toISOString();

      dbChat.query(`INSERT INTO Rooms (roomname) values ('${data.room}')`, (error, responseRoom) => {
        if (error) {
          console.log('Error posting message:', error);
        } else {
          // console.log('Message posted:', message, '||', response);
          dbChat.query(`insert into Users (username) values ('${data.username}')`, (error, responseUser) => {
            if (error) {
              console.log('Error posting message:', error);
            } else {
              dbChat.query(`insert into Messages (room, username, text, createdAt) values ('${responseRoom.insertId}', '${responseUser.insertId}', '${data.text}', '${data.createdAt}')`, (error, response) => {
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



    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      console.log ('Controller: users: Get');
    },
    post: function (data, callback) {
      console.log ('Controller: users: Post');
      // dbChat.query(`insert into Users (username)
      //   select Users.username
      //   value ('${data.username}')
      //   where not exists (select username
      //     from Users
      //     );`, (error, response) => {

      // dbChat.query(`insert into Users (username) values ('${data.username}')
      //   where '${data.username}' not in 
      //   ( select username );`, (error, response) => {

      // dbChat.query(`if not exists (select * from Username)
      //     insert into Users (username) values ('${data.username}');`, (error, response) => {

      dbChat.query(`insert ignore into Users (username) values ('${data.username}');`, (error, response) => {
        if (error) {
          console.log('query error', error);
          callback (error, null);
        } else {
          console.log('query response', response);
          callback (null, response);
        }
      });
    }
  }
};

