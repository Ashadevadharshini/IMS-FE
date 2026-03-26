import { Component } from "@angular/core";
import { InterviewerService } from "../interviewer-service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-interviewer-form",
  imports: [FormsModule],
  templateUrl: "./interviewer-form.html",
  styleUrl: "./interviewer-form.css",
})
export class InterviewerForm {
  interviewer = {
    name: '',
    email: '',
    techDomain: '',
    designation: '',
    meetingLink: ''
  };

  constructor(private interviewerService: InterviewerService) {}

  onSubmit() {
    this.interviewerService.saveInterviewer(this.interviewer).subscribe({
      next: (res) => {
        alert('Interviewer saved successfully!');
        this.resetForm();
      },
      error: (err) => {
        console.error(err);
        alert('Error saving interviewer');
      }
    });
  }

  resetForm() {
    this.interviewer = {
      name: '',
      email: '',
      techDomain: '',
      designation: '',
      meetingLink: ''
    };
  }
}
