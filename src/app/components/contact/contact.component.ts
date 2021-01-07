import { Component, OnInit } from '@angular/core';
import {Profile} from '../../common/Profile';
import {ProfileService} from '../../services/profile.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  profile :Profile = new Profile();
  email:string = '';
  linkedin:string = '';
  phone:string = '';

  constructor(private profileService:ProfileService) { }

  ngOnInit(): void {
    this.profileService.profile.subscribe(response =>{
      this.profile = response;
      for(let contact of this.profile.contacts){
        switch(contact.type){

          case 'CONTACTTYPE_PHONE': this.phone = contact.contactInfo;break;
          case 'CONTACTTYPE_LINKEDIN': this.linkedin = contact.contactInfo;break;
          case 'CONTACTTYPE_EMAIL': this.email = contact.contactInfo;break;
        }
      }
    })
    // this.email = 'sean.cunniffe927@gmail.com';
    // this.linkedin = 'https://linkedin.com';
    // this.phone = '0873433395';

  }

}
