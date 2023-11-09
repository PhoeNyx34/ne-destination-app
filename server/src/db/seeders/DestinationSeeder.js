import { Destination } from "../../models/index.js";

class DestinationSeeder {
  static async seed() {
    const destinationData = [
      {
        name: "Hampton Beach",
        description:
          "lLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        location: "Hampton, NH",
        type: "beach",
        website: "https://hamptonbeach.org/",
      },
      {
        name: "Malibu Beach",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        location: "Boston, MA",
        type: "beach",
        website: "https://www.mass.gov/locations/savin-hill-and-malibu-beach",
      },
      {
        name: "Cranes Beach",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
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
