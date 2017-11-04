var mysql = require('mysql');
var Sequelize = require ('sequelize');
// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var seq = new Sequelize ('chat', 'student', 'student', {
  define: {
    timestamps: false
  }
});
console.log ('testestst');

var Users = seq.define('Users', {
  userId: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  username: {type: Sequelize.STRING},
  createdAt: {type: Sequelize.DATE, defaultValues: Sequelize.NOW},
  updatedAt: {type: Sequelize.DATE, defaultValues: Sequelize.NOW}
});


var Rooms = seq.define('Rooms', {
  roomname: {type: Sequelize.STRING, unique: 'true'},
  roomId: {type: Sequelize.INTEGER, unique: true, autoIncrement: true, primaryKey: true} 
});

var Messages = seq.define('Messages', {
  objectId: Sequelize.INTEGER,
  text: Sequelize.STRING,
  // roomname: {type: Sequelize.INTEGER, references: {model: Rooms, key: 'roomname', deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE}},
  // username: {type: Sequelize.INTEGER, references: {model: Users, key: 'userId'}}
});

// Messages.hasOne(Users, { foreignKey: 'userId', foreignKeyConstraint: true });
// Messages.hasOne(Rooms, { foreignKey: 'roomId', foreignKeyConstraint: true });
Users.hasMany(Messages);
Rooms.hasMany(Messages);
Messages.belongsTo(Users);
Messages.belongsTo(Rooms);

/* Sequelize comes with built in support for promises
 * making it easy to chain asynchronous operations together */

Users.sync();
Rooms.sync();
Messages.sync();

  // .then(function() {
  //   // Now instantiate an object and save it:
  //   return Users.create({username: 'Jean Valj'});
  // })
  // .then(function() {
  //   // Retrieve objects from the database:
  //   return Users.findAll({ where: {username: 'Jean Valjean'} });
  // })
  // .catch(function(error) {
  //   console.log('error', error);
  // });
//   .then(function(users) {
//     users.forEach(function(user) {
//       console.log(user.username + ' exists');
//     });
//     seq.close();
//   })
//   .catch(function(err) {
//     // Handle any error in the chain
//     console.error(err);
//     seq.close();
//   });

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'chat'
});

connection.connect();

module.exports.db = connection;
module.exports.Users = Users;
module.exports.Rooms = Rooms;
module.exports.Messages = Messages;