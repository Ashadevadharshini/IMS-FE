import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class InterviewerService {
  private baseUrl = 'http://localhost:8080/panel';

  constructor(private http:HttpClient){

  }
 
  saveInterviewer(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  getAllInterviewers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }


}
