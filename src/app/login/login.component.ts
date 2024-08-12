import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin() {
    console.log('Attempting to login');
    if (this.username === 'admin' && this.password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      console.log('Login successful, redirecting...');
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid credentials');
      console.log('Login failed');
    }
  }
  
}
