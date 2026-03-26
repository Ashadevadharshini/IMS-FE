import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AssignCandidateService } from "../assign-candidate-service";
import { Excelservice } from "../excelservice";
import { InterviewerService } from "../interviewer-service";

@Component({
  selector: "app-assign-candidate",
  imports: [FormsModule,CommonModule],
  templateUrl: "./assign-candidate.html",
  styleUrl: "./assign-candidate.css",
})
export class AssignCandidate implements OnInit{
 candidates: any[] = [];
  interviewers: any[] = [];

  selectedCandidate: any = null;
  selectedInterviewerId: number | null = null;
  selectedDate: string = '';
  availableSlots: any[] = [];
availableDates: string[] = [];
  showPopup = false;

  constructor(
    private service: AssignCandidateService,
    private candidateService: Excelservice,
    private panel:InterviewerService
  ) {}

  ngOnInit() {
    this.loadCandidates();
  }

  // ✅ Fetch candidates from API
  loadCandidates() {
    this.candidateService.getAll().subscribe({
      next: (res: any) => {
              console.log("API Response:", res); // 👈 ADD THIS
        this.candidates = res;
      },
      error: (err) => {
        console.error("Candidate fetch error", err);
      }
    });
  }

  loadInterviewers() {
    this.panel.getAllInterviewers().subscribe({
      next: (res: any) => {
        this.interviewers = res;
              console.log("Interviewers:", this.interviewers);

      },
      error: (err) => {
        console.error("Interviewer fetch error", err);
      }
    });
  }

  openAssignPopup(candidate: any) {
    this.selectedCandidate = candidate;
    this.showPopup = true;
   
    this.selectedInterviewerId = null;
    this.selectedDate = '';
    this.availableSlots = [];
     this.availableDates = []; 
       this.loadInterviewers();

  }

  closePopup() {
    this.showPopup = false;
  }

  // ✅ When interviewer or date changes → fetch slots
  loadSlots() {
    if (!this.selectedInterviewerId || !this.selectedDate) return;

    this.service.getSlots(this.selectedInterviewerId, this.selectedDate)
      .subscribe({
        next: (res: any) => {
          this.availableSlots = res;
        },
        error: (err) => {
          console.error("Slots fetch error", err);
        }
      });
  }

selectDate(date: string) {
  this.selectedDate = date;
  this.loadSlots();
}


  onInterviewerChange() {
  if (!this.selectedInterviewerId) return;

  this.service.getAvailableDates(this.selectedInterviewerId)
    .subscribe({
      next: (res: any) => {
        this.availableDates = res;
        this.selectedDate = '';
        this.availableSlots = [];
      },
      error: (err) => {
        console.error("Date fetch error", err);
      }
    });
}

  assignInterview(slot: any) {
    const payload = {
      candidateId: this.selectedCandidate.id,
      slotId: slot.id, 
    interviewMode:'ONLINE'
    };

    this.service.assignInterview(payload).subscribe({
      next: () => {
        this.selectedCandidate.status = 'Scheduled';
        this.closePopup();
      },
      error: (err) => {
        console.error("Assign error", err);
      }
    });
  }
}
