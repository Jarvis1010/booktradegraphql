import mongoose from 'mongoose';

const { MONGOLAB_URI: dburl } = process.env;

mongoose.connect(dburl);

mongoose.connection.on('connected', () => console.log('mongoose connected'));

mongoose.connection.on('disconnected', () =>
  console.log('mongoose is disconnected')
);

mongoose.connection.on('error', err =>
  console.log('mongoose connection error: ' + err)
);

process.on('SIGTERM', () =>
  mongoose.connection.close(() => {
    console.log('Mongoose closed through app termination');
    process.exit(0);
  })
);

process.once('SIGUSR2', () =>
  mongoose.connection.close(() => {
    console.log('Mongoose closed through app termination');
    process.kill(process.pid, 'SIGUSR2');
  })
);

require('./users.model.js');
