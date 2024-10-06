import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  ngOnInit(): void {
  }
  email: string = '';
  password_hash: string = '';

    constructor(private router: Router,private loginService:LoginService){

    }
    
    onSubmit() {
      if (this.email && this.password_hash) {
        console.log('Email:', this.email);
        console.log('Password:', this.password_hash);
    
        this.loginService.login({
          email: this.email,
          password_hash: this.password_hash
        }).subscribe({
          next: (response) => {
            console.log('Login successful:', response);
            localStorage.setItem('username', response.username); 
            localStorage.setItem('user_id', JSON.stringify(response.id));
            localStorage.setItem('userData', JSON.stringify(response));

            this.router.navigate(['/session']);
          },
          error: (error) => {
            console.error('Login failed:', error);
            alert('Login failed. Please try again.');
          },
          complete: () => {
            console.log('Login request completed.');
          }
        });
      } else {
        alert('Please enter both email and password');
      }
    }
    

  goToSignup() {
    this.router.navigate(['/signup']);
  }

}
