import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-candidate-list",
  imports: [CommonModule,FormsModule],
  templateUrl: "./candidate-list.html",
  styleUrl: "./candidate-list.css",
})
export class CandidateList {
   candidates = [
    { id: 1, name: 'Priya', email: 'priya@gmail.com', status: 'Pending' },
    { id: 2, name: 'Arun', email: 'arun@gmail.com', status: 'Scheduled' }
  ];

  interviewers = [
    { id: 1, name: 'John' },
    { id: 2, name: 'David' }
  ];

  slotsData: any = {
    1: ['10:00 AM', '11:00 AM'],
    2: ['2:00 PM', '3:00 PM']
  };
  availableDates: string[] = [];
selectedDate: string | null = null;

slotsByDate: any = {
  1: {
    '2026-03-20': ['10:00 AM', '11:00 AM'],
    '2026-03-21': ['2:00 PM', '3:00 PM']
  },
  2: {
    '2026-03-20': ['9:00 AM', '12:00 PM'],
    '2026-03-22': ['4:00 PM']
  }
};

  selectedCandidate: any = null;
  selectedInterviewerId: number | null = null;
  availableSlots: string[] = [];

  showPopup = false;

  openAssignPopup(candidate: any) {
    this.selectedCandidate = candidate;
    this.showPopup = true;
    this.availableSlots = [];
    this.selectedInterviewerId = null;
  }

  closePopup() {
    this.showPopup = false;
  }

  
  onInterviewerChange() {
  this.selectedDate = null;
  this.availableSlots = [];

  const data = this.slotsByDate[this.selectedInterviewerId!];
  this.availableDates = data ? Object.keys(data) : [];
}

selectDate(date: string) {
  this.selectedDate = date;
  this.availableSlots =
    this.slotsByDate[this.selectedInterviewerId!][date] || [];
}

  assignInterview(slot: string) {
    console.log('Assigned:', {
      candidate: this.selectedCandidate,
      interviewerId: this.selectedInterviewerId,
      slot: slot
    });

    this.selectedCandidate.status = 'Scheduled';
    this.closePopup();
  }

}
