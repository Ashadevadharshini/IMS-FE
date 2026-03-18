import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidate-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './candidate-dashboard.html',
  styleUrl: './candidate-dashboard.css'
})
export class CandidateDashboard implements OnInit {

  slotForm!: FormGroup;

  minDate!: string;
  maxDate!: string;

  timeSlots:string[] = [];

  constructor(private fb:FormBuilder){}

  ngOnInit(){

    this.slotForm = this.fb.group({
      date1:[''],
      time1:[''],
      date2:[''],
      time2:[''],
      date3:[''],
      time3:['']
    });

    this.setDateLimits();
    this.generateTimeSlots();

  }

  /* Disable dates before tomorrow and allow only 1 month */

  setDateLimits(){

    const today = new Date();

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const oneMonthLater = new Date(tomorrow);
    oneMonthLater.setMonth(tomorrow.getMonth() + 1);

    this.minDate = tomorrow.toISOString().split('T')[0];
    this.maxDate = oneMonthLater.toISOString().split('T')[0];

  }

  /* Generate 30 minute slots from 9AM to 7PM */

  generateTimeSlots(){

    let start = 9 * 60;
    let end = 19 * 60;

    while(start < end){

      let hour1 = Math.floor(start / 60);
      let min1 = start % 60;

      let next = start + 30;

      let hour2 = Math.floor(next / 60);
      let min2 = next % 60;

      const slot =
        this.formatTime(hour1,min1) +
        " - " +
        this.formatTime(hour2,min2);

      this.timeSlots.push(slot);

      start += 30;
    }

  }

  formatTime(hour:number,minute:number){

    let h = hour.toString().padStart(2,'0');
    let m = minute.toString().padStart(2,'0');

    return `${h}:${m}`;

  }

  reset(){
    this.slotForm.reset();
  }

  selectedSlots(){

    let count = 0;

    const v = this.slotForm.value;

    if(v.date1 && v.time1) count++;
    if(v.date2 && v.time2) count++;
    if(v.date3 && v.time3) count++;

    return count;

  }

}