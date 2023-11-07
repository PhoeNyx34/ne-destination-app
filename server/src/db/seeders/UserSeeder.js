import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const usersData = [
            {
                email: "tess.ting@gmail.com",
                password: "test"
            },
            {
                email: "tracy.turnblad@gmail.com",
                password: "test2"
            },
            {
                email: "fatboislimjim@gmail.com",
                password: "test3"
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