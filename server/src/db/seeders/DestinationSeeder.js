import { Destination } from "../../models/index.js";

class DestinationSeeder {
  static async seed() {
    const destinationData = [
      {
        name: "Hampton Beach",
        description: "lots of sad times",
        location: "Hampton, NH",
        type: "beach",
        website: "https://hamptonbeach.org/",
      },
      {
        name: "Malibu Beach",
        description: "Not what you think",
        location: "Boston, MA",
        type: "beach",
        website: "https://www.mass.gov/locations/savin-hill-and-malibu-beach",
      },
      {
        name: "Cranes Beach",
        description: "Actually a nice beach!",
        location: "Ipswich, MA",
        type: "beach",
        website: "https://thetrustees.org/place/crane-beach-on-the-crane-estate/",
      },
    ];

    for (const destination of destinationData) {
      const currentDestination = await Destination.query().findOne({ name: destination.name });
      if (!currentDestination) {
        await Destination.query().insert(destination);
      }
    }
  }
}

export default DestinationSeeder;
