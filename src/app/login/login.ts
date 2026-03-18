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
  

  login(){

  if(this.loginForm.invalid){
    return;
  }

  const formValue = this.loginForm.value;

const data = {
  email: formValue.email,   // ✅ correct key
  password: formValue.password
};

  this.auth.login(data).subscribe({
    next: (res:any) => {

      console.log("SUCCESS:", res);

      if(!res || !res.role){
        alert("Invalid credentials");
        return;
      }

      this.auth.saveUser(res);

      if(res.role === 'ADMIN'){
  console.log("Navigating to ADMIN...");
  this.router.navigate(['/admin']).then(result => {
    console.log("Navigation result:", result);
  });
} else if(res.role === 'HR'){
        this.router.navigate(['/hr']);
      } else {
        this.router.navigate(['/panel']);
      }

    },
    error: (err) => {
      console.log("ERROR:", err);
      alert("Invalid credentials");
    }
  });
}
  togglePassword() {
    this.showPassword = !this.showPassword;
  }


}
