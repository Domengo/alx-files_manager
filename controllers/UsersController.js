const dbClient = require('../utils/db');

class UsersController {
  static async postNew(request, response) {
    const { email, password } = request.body;
    if (!email) {
      return response.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return response.status(400).json({ error: 'Missing password' });
    }
    const user = await dbClient.nbUsers();
    return response.status(201).json({ id: user.id, email: user.email });
  }
}
module.exports = UsersController;
