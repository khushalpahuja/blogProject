import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  onSubmit(signupForm:NgForm){
    console.log(signupForm.value);
    this.authService.signup(signupForm.value).subscribe()
    
  }

}
