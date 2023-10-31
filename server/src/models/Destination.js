const Model = require("./Model.js")

class Destination extends Model {
    static get tableName() {
        return "destinations"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "location", "destinationType"],
            properties: {
                name: { type: "string" },
                location: { type: "string" },
                destinationType: { type: "string" },
                website: { type: "string" },
                description: { type: "string" }
            }
        }
    }
}

module.exports = Destination
