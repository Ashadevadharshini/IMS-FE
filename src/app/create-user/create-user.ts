import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-user.html',
  styleUrl: './create-user.css',
})
export class CreateUser {

  userForm: FormGroup;
  loading = false;
  message = '';

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
        Validators.pattern(/^[6-9][0-9]{9}$/)
      ]],

      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],

      role: ['', Validators.required]
    });
  }

  showMessage(msg: string) {
    this.message = msg;
    setTimeout(() => this.message = '', 3000);
  }

  createUser() {

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const formValue = this.userForm.value;

    const payload = {
      name: formValue.name,
      employeeId: Number(formValue.employeeId),
      email: formValue.email,
      phoneNumber: Number(formValue.phoneNumber),
      password: formValue.password,
      roles: [`ROLE_${formValue.role}`]
    };

    this.auth.createUser(payload).subscribe({
      next: () => {
        this.showMessage("User created successfully ✅");
        this.userForm.reset();
        this.userForm.patchValue({ role: '' });
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.showMessage("Error creating user ❌");
        this.loading = false;
      }
    });
  }

  resetForm() {
    this.userForm.reset();
    this.userForm.patchValue({ role: '' });
    this.userForm.markAsPristine();
    this.userForm.markAsUntouched();
  }
}