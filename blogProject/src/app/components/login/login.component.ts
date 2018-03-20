import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  onSubmit(loginForm:NgForm) {
    this.authService.login(loginForm.value.username , loginForm.value.password).subscribe(
      (response:Response)=> {
        console.log(response.json());
        localStorage.setItem('token' ,response.json().token);
        localStorage.setItem('user' , JSON.stringify(response.json().user));
        this.authService.user = response.json().user;
      }
    );
  }

}
