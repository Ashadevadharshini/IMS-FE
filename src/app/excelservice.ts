import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Candidate } from "./candidate";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class Excelservice {

  http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/candidates';


  uploadExcel(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any[]>(`${this.apiUrl}/upload`, formData);
  }

 
  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateCandidates(id: number, data:Candidate):Observable<Candidate>{
    return this.http.put<Candidate>(`${this.apiUrl}/${id}`, data); 
  }
deleteCandidate(id: number): Observable<string> {
  return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }).pipe(
    catchError((error) => {
      console.error("Delete API error:", error);
      return throwError(() => error);
    })
  );
}


  updateLevel(id: number, level: String):Observable<Candidate>{
      return this.http.patch<Candidate>(`${this.apiUrl}/${id}/level?/level=${level}`,{});
  }
}