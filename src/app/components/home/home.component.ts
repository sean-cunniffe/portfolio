import {Component, OnInit} from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import {ProfileService} from '../../services/profile.service';
import {Profile} from '../../common/Profile';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profile:Profile = new Profile();
  arrowDown = faAngleDown;
  cvLink: string = '';
  constructor(public profileService: ProfileService) {
    profileService.profile.subscribe(response =>{
      this.profile = response;
      this.cvLink = this.profileService.baseUrl+'cv/?id='+this.profile.id;
    });
  }


  ngOnInit(): void {
  }

  nextSection() {
    window.scroll({
      top:window.innerHeight-75,
      behavior: 'smooth'
    })
  }
}
