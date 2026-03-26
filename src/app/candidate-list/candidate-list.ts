import { Component, inject, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Excelservice } from "../excelservice";
import { Candidate } from "../candidate";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-candidate-list",
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: "./candidate-list.html",
  styleUrls: ["./candidate-list.css"],
})
export class CandidateList implements OnInit {

   
  excelservice = inject(Excelservice);
  cdr = inject(ChangeDetectorRef);

  candidates: Candidate[] = [];
  selectedFileName: string = '';

  editCandidate: Candidate | null = null;
  editingId: number | null = null;

  loading = false;
  message = '';
  isSaving = false;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.loadCandidates();
  }

  showMessage(msg: string) {
    this.message = msg;
    setTimeout(() => this.message = '', 3000);
  }

  loadCandidates() {
    this.loading = true;

    this.excelservice.getAll().subscribe({
      next: (res) => {
        this.candidates = [...res];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.showMessage("Please select a file ❗");
      return;
    }

    const file = input.files[0];
    this.selectedFileName = file.name;

    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      this.showMessage("Only Excel files allowed ❗");
      return;
    }

    this.excelservice.uploadExcel(file).subscribe({
      next: () => {
        this.showMessage("Upload successful ✅");

        this.selectedFileName = '';
        this.fileInput.nativeElement.value = '';

        this.loadCandidates();
      },
      error: (err) => {
        console.error(err);
        this.showMessage("Upload failed ❌");
      }
    });
  }

  edit(c: Candidate) {
    this.editingId = c.id;
    this.editCandidate = { ...c };
  }

  updateCandidate() {
    if (!this.editCandidate) return;

    this.isSaving = true;

    this.excelservice.updateCandidates(this.editCandidate.id, this.editCandidate)
      .subscribe({
        next: () => {
          this.showMessage("Updated successfully ✅");
          this.editingId = null;
          this.editCandidate = null;
          this.isSaving = false;
          this.loadCandidates();
        },
        error: (err) => {
          console.error(err);
          this.isSaving = false;
        }
      });
  }

  deleteCandidates(id: number) {
    if (!confirm(`Delete candidate ${id}?`)) return;

    this.excelservice.deleteCandidate(id).subscribe({
      next: () => {
        this.showMessage("Deleted successfully 🗑");
        this.loadCandidates();
      },
      error: (err) => {
        console.error(err);
        this.showMessage("Delete failed ❌");
      }
    });
  }

  cancelEdit() {
    this.editingId = null;
    this.editCandidate = null;
  }


  trackById(index: number, item: Candidate) {
    return item.id;
  }
}