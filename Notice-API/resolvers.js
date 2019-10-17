const { GraphQLScalarType } = require("graphql");
// date format
function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    let d = new Date(inputFormat);
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

const notices = [
    {
        id: 1,
        topic: "DSP test",
        description: "Second DSP test will be written in Octuber 15",
        submissionDate: new Date("2019-09-10")
    },
    {
        id: 2,
        topic: "DSP Assignment 2",
        description: "Second DSP assignment is due in Octuber 21",
        submissionDate: new Date("2019-09-10")
    }
]

const resolvers = {
    Query: {
        Notices: () => notices,
        Notice: (_, { id }) => notices.find(notice => notice.id == id)
    },
    Mutation: {
        createNotice: (root, args) => {
            const nextId = notices.reduce((id, notice) => {
                return Math.max(id, notice.id)
            }, -1) + 1;
            
            let newNotice = {
                id: nextId,
                topic: args.topic,
                description: args.description,
                submissionDate: args.submissionDate
            }
            notices.push(newNotice);
            return notices[nextId];
        },
        deleteNotice: (root, args) => {
            const index = notices.findIndex(
                notice => notice.id == args.id
            )
            if(index){
                notices.splice(index, 1)
            }
        },
        updateNotice: (root, args) => {
            const index = notices.findIndex(
                notice => notice.id == args.id
            );
            if(index){
                notices[index].topic = args.topic;
                notices[index].description = args.description;
                notices[index].submissionDate = args.submissionDate;
                return notices[index];
            }
        }
    },
    GQDate
};

module.exports.Resolvers = resolvers;