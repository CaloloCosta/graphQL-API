const {RESTDataSource} =  require('apollo-datasource-rest')


class NoticeAPI extends RESTDataSource {
    constructor(){
        super()
    }
    async getAllNotices(port){
        this.baseURL = `http://localhost:909${port}/`
        console.log(port)
        return this.get('getNotices')
    }
    async getNotice(id,port){
        this.baseURL = `http://localhost:909${port}/`
        console.log(port)
        return this.get(`getNotice/${id}`)
    }
    async addNotice(notice,port){
        this.baseURL = `http://localhost:909${port}/`
        console.log(port)
        return this.post('addNotice',notice)
    }
    async deleteNotice(id, port){
        this.baseURL = `http://localhost:909${port}/`
        console.log(port)
        return this.get(`deleteNotice/${id}`)

    }

    async updateNotice(notice, port){
        this.baseURL = `http://localhost:909${port}/`
        console.log(port)
        return this.post('updateNotice',notice)

    }
}

module.exports.NoticeAPI = NoticeAPI 