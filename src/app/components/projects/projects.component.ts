import {Component, OnInit} from '@angular/core';
import {Profile} from '../../common/Profile';
import {ProfileService} from '../../services/profile.service';
import {Project} from '../../common/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  profile: Profile = new Profile();
  projects: Project[] = [];
  months: string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JULY', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];

  constructor(private profileService: ProfileService) {
  }

  ngOnInit(): void {

    this.profileService.profile.subscribe(response => {
      this.profile = response;
      this.projects = this.profile.projects;

      for (let project of this.projects) {
        if (project.startedDate == null) {
          project.startedDate = undefined;
        } else {
          project.startedDate = new Date(project.startedDate);
        }
        if (project.dateComplete == null) {
          project.dateComplete = undefined;
        } else {
          project.dateComplete = new Date(project.dateComplete);
        }
      }
    });

  }

}
