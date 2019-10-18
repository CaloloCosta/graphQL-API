const {RESTDataSource} =  require('apollo-datasource-rest')

class NoticeAPI extends RESTDataSource {
    constructor(){
        super()
        this.baseURL = 'http://localhost:9090/noter/'
    }
    async getAllNotices(){
        return this.get('getNotice')
    }
}

module.exports.NoticeAPI = NoticeAPI 