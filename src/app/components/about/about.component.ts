import { Component, OnInit } from '@angular/core';
import {Profile} from '../../common/Profile';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  age: number;
  profile:Profile = new Profile();

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    //initialize empty profile to avoid errors
    this.profile.dob = new Date();
    this.profile.aboutParagraphs = [];
    this.age = 0;

    this.profileService.profile.subscribe(response =>{
      this.profile = response;
      this.profile.aboutParagraphs = response.aboutParagraph.split('/br/');
      this.age = this.age = (+new Date()- +new Date(this.profile.dob))/31536000000;
      this.age = Math.floor(+this.age);
    });
  }

}
