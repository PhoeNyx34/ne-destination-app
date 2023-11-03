import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const usersData = [
            {
                email: "tess.ting@gmail.com",
                cryptedPassword: "haioejfaheignbkn238"
            },
            {
                email: "tracy.turnblad@gmail.com",
                cryptedPassword: "ihuh832hia"
            },
            {
                email: "fatboislimjim@gmail.com",
                cryptedPassword: "h74260jhajie2"
            }
        ]

        for (const user of usersData) {
            const currentUser = await User.query().findOne({ email: user.email})
            if (!currentUser) {
                await User.query().insert(user)
            }
        }
    }
}

export default UserSeeder