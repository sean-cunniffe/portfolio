import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Profile} from '../common/Profile';
import {Observable} from 'rxjs';
import {EnvironmentService} from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl: string = '';
  profile: Observable<Profile> = undefined;

  constructor(private http: HttpClient, private environment: EnvironmentService) {
    this.baseUrl = this.environment.baseUrl;
    this.getUser(1);
  }

  private getUser(id: number) {
    this.profile = this.http.get<Profile>(this.baseUrl + 'users?id=' + id);
  }

  saveProfile(profile: Profile) {
    this.http.post(this.baseUrl + 'users', profile);
  }

  deleteProjects(deleteList: number[]) {
    for (let projectId of deleteList) {
      this.http.delete(this.baseUrl + 'project?id=' + projectId);
    }
  }
}
