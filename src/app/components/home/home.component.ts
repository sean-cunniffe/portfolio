import {Component, HostListener, OnInit} from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  arrowDown = faAngleDown;
  constructor() { }

  ngOnInit(): void {
  }

  nextSection() {
    window.scroll({
      top:window.innerHeight,
      behavior: 'smooth'
    })
    console.log(window.pageYOffset);
  }
}
