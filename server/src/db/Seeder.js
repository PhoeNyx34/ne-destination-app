/* eslint-disable no-console */
import { connection } from "../boot.js"
import DestinationSeeder from "./seeders/DestinationSeeder.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("seeding destinations...")
    await DestinationSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder