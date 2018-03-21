import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username:string = '';
  constructor(public authService : AuthService,private router:Router) { }

  ngOnInit() {
    this.authService.setUser();
    // console.log(this.authService.user,"authuser");
    // console.log(this.user,"local user");
    // this.authService.user = this.user;
    // if(this.authService.user)
    // this.authService.user.username = this.username;
    
  }

  onLogout(){
    localStorage.clear();
    this.authService.user = null;
    this.authService.authToken = undefined;
    this.router.navigate(['/']);

  }
}
