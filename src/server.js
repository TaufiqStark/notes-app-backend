require('dotenv/config'); // import dotenv
const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const users = require('./api/users');
const NotesService = require('./services/postgres/NotesService');
const UsersService = require('./services/postgres/UsersService');
const NotesValidator = require('./validator/notes');
const UsersValidator = require('./validator/users');

const init = async () => {
  const notesService = new NotesService();
  const usersService = new UsersService();

  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([{
    plugin: notes,
    options: {
      service: notesService,
      validator: NotesValidator,
    },
  }, {
    plugin: users,
    options: {
      service: usersService,
      validator: UsersValidator,
    },
  }]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
