import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    // if (!process.env.JWT_KEY) {
    //   throw new Error('JWT_KEY must be defined');
    // }

      if (!process.env.DB_URL) {
      throw new Error('Mondo URI must be defined');
    }

    try {
      await mongoose.connect(`mongodb+srv://${process.env.DB_URL}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      });
      console.log('Connected to MongoDb');
    } catch (err) {
      console.error(err);
    }
  
    app.listen(3000, () => {
      console.log('Listening on port 3000!');
    });
  };

  start();