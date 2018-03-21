import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { User } from "../models/user.model";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Subject } from "rxjs";
// import { FlashMessage } from 'angular-flash-message';
 
@Injectable()
export class AuthService{
    public user:User;
    public authToken;
    chnageUsername = new Subject<User>();
    constructor(private http:Http , private router:Router){}
    
    signup(user:User) {
        let headers = new Headers();
        headers.append('Content-Type','application/json');      
        return this.http.post('http://localhost:8000/register' , user,{headers:headers});
    }

    login(username:string,password:string) {
        let headers = new Headers();  
        headers.append('Content-Type','application/json');      
        return this.http.post('http://localhost:8000/login' , {username , password},{headers:headers});
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

    getAdminPanel() {
        let headers = new Headers();  
        headers.append('Authorization',localStorage.getItem('token'));
        return this.http.get('http://localhost:8000/admin',{headers:headers});
    }

    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
          if(this.user){
            return true;
          }else{
            // this.flashMessage.danger("You need to login first !",{delay:3000,generalClass: 'ui red message'});
            this.router.navigate(['login']);  
          }
    }

    activateUser(userId:string){
        let headers = new Headers();  
        headers.append('Authorization',localStorage.getItem('token'));
        return this.http.put('http://localhost:8000/admin/'+userId , {},{headers:headers});
    }

    dashboard(userId:string) {
        let headers = new Headers();  
        headers.append('Authorization',localStorage.getItem('token'));
        return this.http.get('http://localhost:8000/user/'+ userId + '/dashboard' , {headers:headers})
    }
}