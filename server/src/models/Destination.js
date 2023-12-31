const Model = require("./Model.js");

class Destination extends Model {
  static get tableName() {
    return "destinations";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "location", "type"],
      properties: {
        name: { type: "string" },
        location: { type: "string" },
        type: { type: "string" },
        website: { type: "string" },
        description: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { Review } = require("./index.js")

    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "destinations.id",
          to: "reviews.destinationId"
        }
      }
    }
  }
}

module.exports = Destination;
