// signup.component.ts
import { Component } from '@angular/core';
import { SignUpService } from '../services/signup/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
   constructor(private signupService:SignUpService,private router:Router){

   }
  onSubmit() {
    // Handle sign-up logic here
    console.log('Sign Up:', {
      username: this.username,
      email: this.email,
      password_hash: this.password,
    });
    this.signupService.signUp({
      username: this.username,
      email: this.email,
      password_hash: this.password,
    }).subscribe({
      next: (response) => {
        console.log(response);

        },
        error: (error) => {
          console.error('Signup failed:', error);
        },
        complete: () => {
          console.log('Signup  request completed.');
          this.router.navigate(['/session']); // Navigate to user profile

        }
    })
  }
}
