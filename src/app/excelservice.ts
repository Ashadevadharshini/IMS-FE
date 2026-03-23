import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class Excelservice {

  http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/candidates';

  // 🔹 Upload Excel
  uploadExcel(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any[]>(`${this.apiUrl}/upload`, formData);
  }

  // 🔹 Get all candidates (IMPORTANT)
  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }
}