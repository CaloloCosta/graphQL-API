const { GraphQLScalarType } = require("graphql");
// date format
function convertDate() {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    let d = new Date();
    return [pad(d.getDate()), pad(d.getMonth()), d.getFullYear()].join("/");
}

// define date scalar
const GQDate = new GraphQLScalarType({
    name: "GQDate",
    description: "Date Type",
    parseValue(value){
        return value;
    },
    serialize(value){
        return value;
    },
    parseLiteral(ast){
        return new DataCue(ast.value);
    }
});


const resolvers = {
    Query: {
        Notices: (root, args, {dataSources}) => dataSources.noticeAPI.getAllNotices(Math.round((Math.random(1)*4)+1)),
        Notice: (root, args, {dataSources}) => dataSources.noticeAPI.getNotice(args.id,Math.round((Math.random(1)*4)+1))
    },
    Mutation: {
        createNotice: (root, args, {dataSources}) => {
            let notice = {
                "topic": args.topic, 
                "description": args.description, 
                "submissionDate": args.submissionDate, 
                "day": args.day, 
                "month": args.month, 
                "submissionDate": convertDate(),
                "week": args.week
            }
            return dataSources.noticeAPI.addNotice(notice,Math.round((Math.random(1)*4)+1))
        },
        deleteNotice: (root, args, {dataSources}) => {
                                         
            return dataSources.noticeAPI.deleteNotice(args.id,Math.round((Math.random(1)*4)+1))
        },
        
        updateNotice: (root, args, {dataSources}) => {
            let notice = {
                "topic": args.topic, 
                "description": args.description, 
                "submissionDate": args.submissionDate, 
                "day": args.day, 
                "month": args.month, 
                "week": args.week,
                "id": args.id
            }
            return dataSources.noticeAPI.updateNotice(notice,Math.round((Math.random(1)*4)+1))
        }
    },
    GQDate
};

module.exports.Resolvers = resolvers;