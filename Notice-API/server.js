// const {ApolloServer} = require('apollo-server-express')
// const express = require('express')
// const cors = require('cors')
// const typeDefs = require('./schema').TypeDefs
// const resolvers = require('./resolvers').Resolvers
// const server = new ApolloServer({typeDefs, resolvers})

// const app = express()
// app.use(cors)
// server.applyMiddleware({app})
// app.listen({port: 4000}, () => {
//     console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
// })


// // server.listen().then(({url}) =>{
// //     console.log(`SErver ready at ${url}`)
// // })

// const express = require('express')
// const cors = require('cors')
// const graphqlHTTP = require('express-graphql')
// const {makeExecutableSchema} = require('graphql-tools')

// const typeDefs = require('./schema').TypeDefs
// const resolvers = require('./resolvers').Resolvers
// const schema = makeExecutableSchema({
//     typeDefs,
//     resolvers,
//     logger: {
//         log: e => console.log(e)
//     }
// })

// const app = express()
// app.use(cors())

// app.use(
//     "/graphql",
//     graphqlHTTP(request => ({
//       schema: schema,
//       graphiql: true
//     }))
//   );
// app.listen(4000, () =>{
//     console.log('SErver ready at localhost:4000')
// })  

const {ApolloServer} = require('apollo-server')
const {NoticeAPI} = require('./datasource')
const typeDefs = require('./schema').TypeDefs
const resolvers = require('./resolvers').Resolvers



const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    noticeAPI: new NoticeAPI()
  })
})

server.listen().then(({url}) => {
  console.log(`Server ready at ${url}`)
})