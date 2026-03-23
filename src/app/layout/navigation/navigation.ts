import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule,RouterOutlet,RouterModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {

  constructor(private router: Router) {}

 role: string | null = '';

ngOnInit() {
  this.role = localStorage.getItem('role');
}

hasRole(roles: string[]): boolean {
  return roles.includes(this.role!);
}

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

}