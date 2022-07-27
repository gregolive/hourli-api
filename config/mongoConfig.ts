import mongoose from 'mongoose';

const initialize = () => {
  const mongoDB = process.env.MONGODB_URI || '';
  mongoose.connect(mongoDB);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};

export default initialize;
