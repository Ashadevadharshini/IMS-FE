import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AssignCandidateService {
    private baseUrl = 'http://localhost:8080';

      constructor(private http: HttpClient) {}

        getInterviewers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/panel`);
  }


   assignInterview(payload: { candidateId: number, slotId: number, interviewMode: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/interview/assign`, payload);
  }

addSlot(payload: { interviewerId: number, date: string, startTime: string, endTime: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/interview/slot`, payload);
  }

    getSlots(interviewerId: number, date: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/interview/slots`, {
      params: {
        interviewerId: interviewerId.toString(),
        date: date
      }
    });
  }

   getAvailableDates(interviewerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/interview/dates/${interviewerId}`);
  }

}
