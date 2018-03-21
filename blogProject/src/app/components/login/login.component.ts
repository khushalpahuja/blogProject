import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
user:User;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }

  onSubmit(loginForm:NgForm) {
    this.authService.login(loginForm.value.username , loginForm.value.password).subscribe(
      (response:Response)=> { 

        // this.authService.user.username = response.json().user.username;
        console.log(response.json());
        this.authService.user = response.json().user;
        localStorage.setItem('token' ,response.json().token);
        localStorage.setItem('user' , JSON.stringify(response.json().user));
        this.authService.setUser();
        this.user = this.authService.user;
        this.authService.chnageUsername.next(this.authService.user); 
        console.log(this.authService.user);
        this.router.navigate(['/blogs']);
      }
    );
  }

}
