import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
     showPassword = false;
     email = null;
     password = null;


  loginForm:any;
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
     this.loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  }
  
login() {

  if(this.loginForm.invalid){
    return;
  }

  const data = this.loginForm.value;

  this.auth.login(data).subscribe({
    next: (res:any) => {

      console.log("SUCCESS:", res);

      this.auth.saveUser(res);

      const role = res.role;

      if(role === 'ADMIN'){
        this.router.navigate(['/admin']);
      } 
      else if(role === 'HR'){
        this.router.navigate(['/hr']);
      } 
      else if(role === 'CANDIDATE'){
        this.router.navigate(['/candidate']);
      } 
      else {
        this.router.navigate(['/login']);
      }

    },
    error: () => {
      alert("Invalid credentials");
    }
  });
}
  togglePassword() {
    this.showPassword = !this.showPassword;
  }


}
