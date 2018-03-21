import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Response } from '@angular/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users:any[];
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.getAdminPanel().subscribe(
      (response:Response)=> {
        console.log(response);
        this.users = response.json();
      }
    )
  }

  activation(userId:string){
    this.authService.activateUser(userId).subscribe(
      (response:Response)=> {
        console.log(response.json());
        var index = this.users.findIndex(user=> user._id === userId);
        console.log(index);
        this.users[index].isActive = !this.users[index].isActive;
      }
    )
  }

}

