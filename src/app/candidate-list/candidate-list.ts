import { Component, inject, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Excelservice } from "../excelservice";

@Component({
  selector: "app-candidate-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./candidate-list.html",
  styleUrls: ["./candidate-list.css"],
})
export class CandidateList implements OnInit {

  excelservice = inject(Excelservice);
  cdr = inject(ChangeDetectorRef);

  candidates: any[] = [];

  ngOnInit() {
    this.loadCandidates();
  }

  loadCandidates() {
    this.excelservice.getAll().subscribe({
      next: (res) => {
        console.log("DATA:", res);

        this.candidates = [...res];
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files) {
      alert("Please upload one file only");
      return;
    }

    const file = input.files[0];

    this.excelservice.uploadExcel(file).subscribe({
      next: () => {
        this.loadCandidates();
      },
      error: (err) => {
        console.error(err);
        alert("Upload failed");
      }
    });
  }
}