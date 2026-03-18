import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './create-user.html',
  styleUrl: './create-user.css',
})
export class CreateUser {

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.userForm = this.fb.group({
  name: ['', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern(/^[a-zA-Z ]+$/)
  ]],

  employeeId: ['', [
    Validators.required,
    Validators.pattern(/^[0-9]{7}$/)
  ]],

  email: ['', [
    Validators.required,
    Validators.email
  ]],

  phoneNumber: ['', [
    Validators.required,
    Validators.pattern(/^[6-9][0-9]{9}$/) // Indian format
  ]],

  password: ['', [
    Validators.required,
    Validators.minLength(6)
  ]],

  role: ['', Validators.required]
});
  }

  createUser() {

  if (this.userForm.invalid) {
    this.userForm.markAllAsTouched(); // show validation
    return;
  }

  const formValue = this.userForm.value;

  const payload = {
    name: formValue.name,
    employeeId: Number(formValue.employeeId),
    email: formValue.email,
    phoneNumber: Number(formValue.phoneNumber),
    password: formValue.password,
    role: [`ROLE_${formValue.role}`]   // ✅ FIX HERE
  };

  console.log("PAYLOAD:", payload);

  this.auth.createUser(payload).subscribe({
    next: (res) => {
      console.log("User Created:", res);
      alert("User created successfully");
      this.userForm.reset(); // optional reset
    },
    error: (err) => {
      console.error(err);
      alert("Error creating user");
    }
  });
}
resetForm() {
  this.userForm.reset();

  // Reset role manually (important for dropdown UI)
  this.userForm.patchValue({
    role: ''
  });

  // Optional: mark form as untouched again
  this.userForm.markAsPristine();
  this.userForm.markAsUntouched();
}
}
