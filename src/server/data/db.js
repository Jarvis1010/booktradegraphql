import mongoose from 'mongoose';

const { MONGOLAB_URI: dburl } = process.env;

mongoose.connect(dburl);

mongoose.connection.on('connected', function() {
  console.log('mongoose connected');
});

mongoose.connection.on('disconnected', function() {
  console.log('mongoose is disconnected');
});

mongoose.connection.on('error', function(err) {
  console.log('mongoose connection error: ' + err);
});

process.on('SIGTERM', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose closed through app termination');
    process.exit(0);
  });
});

process.once('SIGUSR2', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose closed through app termination');
    process.kill(process.pid, 'SIGUSR2');
  });
});

require('./users.model.js');