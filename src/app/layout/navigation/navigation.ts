import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Profileview } from '../../profileview/profileview';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule,RouterOutlet,RouterModule,Profileview],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {

  constructor(private router: Router) {}

 role: string | null = '';
 isCollapsed = false;
ismobile = false;
ngOnInit() {
  this.role = localStorage.getItem('role');
  this.checkScreen();
}
@HostListener('window:resize')
checkScreen() {
  this.ismobile = window.innerWidth <= 768;

  if (!this.ismobile) {
    this.isCollapsed = false; // always open in desktop
  }}
closeSidebar() {
  if (this.ismobile) {
    this.isCollapsed = false;
  }
}
hasRole(roles: string[]): boolean {
  return roles.includes(this.role!);
}

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
  
toggleSidebar() {
  if (this.ismobile) {
    this.isCollapsed = !this.isCollapsed;
  }
}

}