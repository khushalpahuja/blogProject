import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user;
  constructor(public authService : AuthService) { }

  ngOnInit() {
    this.authService.setUser();
    this.user = this.authService.user;
    this.authService.user = this.user;
    
  }

  onLogout(){
    localStorage.clear();
    this.authService.user = null;
  }
}
