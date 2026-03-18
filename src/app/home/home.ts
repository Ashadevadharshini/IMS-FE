import { Component } from '@angular/core';
import { Navigation } from '../layout/navigation/navigation';

@Component({
  selector: 'app-home',
  imports: [Navigation],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
