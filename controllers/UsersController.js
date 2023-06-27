import sha1 from 'sha1';
import Queue from 'bull';
// eslint-disable-next-line no-unused-vars
import { ObjectID } from 'mongodb';
// eslint-disable-next-line no-unused-vars
import redisClient from '../utils/redis';

const dbClient = require('../utils/db');

const userQueue = new Queue('userQueue', 'redis://127.0.0.1:6379');

class UsersController {
  // eslint-disable-next-line consistent-return
  static postNew(request, response) {
    const { email, password } = request.body;
    if (!email) {
      return response.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return response.status(400).json({ error: 'Missing password' });
    }

    const users = dbClient.db.collection('users');

    users.findOne({ email }, (err, result) => {
      if (err) throw err;
      if (result) {
        response.status(400).json({ error: 'Already exist' });
      } else {
        const hashedPassword = sha1(password);
        users.insertOne({ email, password: hashedPassword })
          .then((result) => {
            response.status(201).json({ id: result.insertedId, email });
            userQueue.add({ userId: result.insertedId });
          }).catch((error) => {
            console.log(error);
          });
      }
    });
  }
}

module.exports = UsersController;
