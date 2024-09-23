import {API} from '../axios/api'

class AuthService{
    async register(dataReq){
        return await API.post('/auth/register',dataReq)
    }
    async login(dataReq){
        return await API.post('/auth/login',dataReq)
    }
    async getUserInfo(){
        return await API.get('/auth/user-info',{token: true})
    }
    async updateUserInfo(dataReq){
        return await API.post('/auth/user-info',dataReq,{token:true})
    }
}