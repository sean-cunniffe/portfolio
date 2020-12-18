import {Component, OnInit} from '@angular/core';
import {Profile} from '../../common/Profile';
import {ProfileService} from '../../services/profile.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {Project} from '../../common/project';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  profile: Profile = new Profile;
  todayDate: Date = new Date();
  cvLink: string = '';
  projectFormGroup: FormGroup;
  private deleteList: number[] = [];

  constructor(public profileService: ProfileService, private authenticationService: AuthenticationService
    , private router: Router, private formBuilder: FormBuilder) {
    this.profile.dob = this.todayDate;
    this.profile.contacts = [];
    this.profile.projects = [];
    this.profile.aboutParagraph = '';
  }

  ngOnInit(): void {
    if (!this.authenticationService.auth) {
      this.router.navigate(['login']);
    } else {
      this.buildForm();
      this.profileService.profile.subscribe(response => {
        this.profile = response;
        this.profile.dob = new Date(this.profile.dob);
        this.cvLink = this.profileService.baseUrl + 'cv/?id=' + this.profile.id;
        let replaceString: string = this.profile.aboutParagraph.replace('/br/', '\n');
        while (this.profile.aboutParagraph !== replaceString) {
          this.profile.aboutParagraph = replaceString;
          replaceString = this.profile.aboutParagraph.replace('/br/', '\n');
        }
        for (let project of this.profile.projects) {
          project.startedDate = new Date(project.startedDate);
          if (project.dateComplete !== null) {
            project.dateComplete = new Date(project.dateComplete);
          }
        }
      });
    }

  }

  /**
   * make compatible with input date
   * @private
   */
  public stringifyDate(date: Date): string {

    let dateString: string = '';
    if (date === undefined || date === null) {
      return dateString;
    }
    dateString = `${date.getFullYear()}-`;
    if (date.getMonth() + 1 <= 9) {
      dateString += (`0${date.getMonth() + 1}-`);
    } else {
      dateString += (`${date.getMonth() + 1}-`);
    }
    if (date.getDate() <= 9) {
      dateString += (`0${date.getDate()}`);
    } else {
      dateString += (`${date.getDate()}`);
    }
    return dateString;
  }

  saveProfilePicFile(element: any) {
    let file = element.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      this.profile.imageUrl = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }

  saveProjectPicFile(element: any, id: number) {
    let file = element.files[0];
    let reader = new FileReader();
    let project: Project = this.profile.projects[id];
    reader.onloadend = () => {
      project.imageUrl = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }


  changeCV(element: any) {
    let file: File = element.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      this.profile.cv = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }

  onSave() {
    this.profileService.saveProfile(this.profile);
    if (this.deleteList.length > 0) {
      this.profileService.deleteProjects(this.deleteList);
    }
    this.router.navigate(['']);
  }


  updateMinDate(project: Project, element: HTMLInputElement, index: number) {
    let date = <HTMLInputElement> document.getElementById(index + 'finishDate');
    date.min = element.value;
    project.startedDate = new Date(element.value);
  }

  updateMaxDate(project: Project, element: HTMLInputElement, index: number) {
    let date = <HTMLInputElement> document.getElementById(index + 'startDate');
    date.max = element.value;
    project.dateComplete = new Date(element.value);
  }

  stringToDate(value: any): Date {
    let date: Date = new Date(value);
    return date;
  }

  addProject() {
    let project: Project = new Project();
    this.profile.projects.push(project);
  }

  private buildForm() {
    this.projectFormGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      skills: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required])
    });
  }

  removeProject(project: Project, index: number) {
    if (project.id !== undefined) {
      this.deleteList.push(project.id);
      this.profile.projects.splice(index, 1);
    }

  }
}
