import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { User } from "../models/user.model";

@Injectable()
export class AuthService{
    public user:User;
    public authToken;
    constructor(private http:Http){}
    
    signup(user:User) {
        return this.http.post('http://localhost:8000/register' , user);
    }

    login(username:string,password:string) {
        return this.http.post('http://localhost:8000/login' , {username , password});
    }

    logout() {
        return this.http.get('http://localhost:8000/logout');
    }

    setUser() {
        if(!(this.user && this.authToken)){
            if(localStorage.getItem('user') && localStorage.getItem('token')) {
                this.user = JSON.parse(localStorage.getItem('user'));
                this.authToken = localStorage.getItem('token');
            }
        }
    }
}