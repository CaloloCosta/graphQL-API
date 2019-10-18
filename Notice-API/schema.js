const {gql} = require('apollo-server')

const typeDefs = gql`
# declare custom scalar for date
scalar GQDate
#notice type
type Notice {
    id: ID!
    topic: String
    description: String
    submissionDate: GQDate
    day: Int
    month: Int
    week: Int
}

# implemantations of READ Operations
type Query {
    # Return a notice by id
    Notice(id: ID!): Notice
    # Return all notices
    Notices(limit: Int): [Notice]
}

# implementations of CREATE, UPDATE, DELETE
type Mutation {
    # Create a notice
    createNotice (topic: String, description: String, submissionDate: GQDate, day: Int, month: Int, week: Int): Notice
    # Update a notice
    updateNotice (id: ID!, topic: String, description: String, submissionDate: GQDate): Notice
    # Delete a Notice
    deleteNotice(id: ID!): Notice
}
`
module.exports.TypeDefs = typeDefs