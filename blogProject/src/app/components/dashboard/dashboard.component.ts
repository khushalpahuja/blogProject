import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Response } from '@angular/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user:User
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.user = this.authService.user;
    this.authService.dashboard(this.user._id).subscribe(
      (response:Response)=> {
        console.log(response.json().user);
        this.user = response.json().user;
        
      }
    )
  }

}
