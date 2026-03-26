import { ChangeDetectorRef, Component, inject, OnInit } from "@angular/core";
import { AuthService } from "../core/services/auth";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.html",
  styleUrl: "./profile.css",
})
export class Profile implements OnInit {

   private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);  // 🔥 ADD THIS

  user: any = null;
  roleText: string = '';

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.getUser().subscribe({
      next: (res: any) => {
        this.user = res;

        this.roleText = (res.roles || [])
          .map((r: string) => r.replace('ROLE_', ''))
          .join(', ');

        this.cdr.detectChanges(); // 🔥 FORCE UI UPDATE
      },
      error: (err) => {
        console.error("Error fetching user:", err);
      }
    });
  }

}