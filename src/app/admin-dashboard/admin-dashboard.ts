import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
http = inject(HttpClient)

  stats = {
  total: 0,
  scheduled: 0,
  pending: 0,
  completed: 0
};

ngOnInit(){
  this.loadStats();
}

loadStats(){
  this.http.get<any>('http://localhost:8080/api/dashboard')
  .subscribe(res => {
    this.stats = res;
  });
}
}
