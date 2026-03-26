import { Component, HostListener, inject } from "@angular/core";
import { AuthService } from "../core/services/auth";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-profileview",
  imports: [CommonModule,RouterModule],
  templateUrl: "./profileview.html",
  styleUrl: "./profileview.css",
})
export class Profileview {
  showProfile = false;
user: any;
router = inject(Router)
authservice = inject(AuthService)


ngOnInit() {
  this.getUser();
}
@HostListener('document:click', ['$event'])
handleClick(event: Event) {
  const target = event.target as HTMLElement;
  if (!target.closest('.profile-wrapper')) {
    this.showProfile = false;
  }
}
closeprofile(){
  this.showProfile = false;
}

toggleProfile() {
  this.showProfile = !this.showProfile;
}

getUser() {
 this.authservice.getUser().subscribe((res:any)=>{
   this.user = res;
 })
}

goToProfile(){
  this.router.navigate(["profile"],{replaceUrl:true});
}

logout() {
  localStorage.removeItem('token');
  window.location.href = '/login';
}
}
