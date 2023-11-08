import { User } from "../../models/index.js";

class UserSeeder {
  static async seed() {
    const usersData = [
      {
        email: "tess.ting@gmail.com",
        userName: "tess",
        password: "tess",
      },
      {
        email: "tracy.turnblad@gmail.com",
        userName: "tracy",
        password: "tracy",
      },
      {
        email: "fatboislimjim@gmail.com",
        userName: "fatboi",
        password: "fatboi",
      },
    ];

    for (const user of usersData) {
      const currentUser = await User.query().findOne({ email: user.email });
      if (!currentUser) {
        await User.query().insert(user);
      }
    }
  }
}

export default UserSeeder;
