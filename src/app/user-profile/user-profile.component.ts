import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  constructor(private router : Router){

  }
  user = {
    profilePicture: 'https://via.placeholder.com/80', // Placeholder image
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'January 2021',
    lastActive: 'October 2024'
  };

  logout() {
    this.router.navigate(['/login']); // Redirect to login page after logout
  }

}
