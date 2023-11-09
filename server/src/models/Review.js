const Model = require("./Model.js")

class Review extends Model {
    static get tableName() {
        return "reviews"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["rating", "userId", "destinationId"],
            properties: {
                userId: { type: ["integer", "string"] },
                destinationId: { type: ["integer", "string"] },
                rating: { type: ["integer", "string"] },
                title: { type: "string" },
                content: { type: "string" }

            }
        }
    }

    static get relationMappings() {
        const { User, Destination, Vote } = require("./index.js")

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "reviews.userId",
                    to: "users.id"
                }
            },
            destination: {
                relation: Model.BelongsToOneRelation,
                modelClass: Destination,
                join: {
                    from: "reviews.destinationId",
                    to: "destinations.id"
                }
            },
            votes: {
                relation: Model.HasManyRelation,
                modelClass: Vote,
                join: {
                    from: "reviews.id",
                    to: "votes.reviewId"
                }
            }
        }
    }
}

module.exports = Review