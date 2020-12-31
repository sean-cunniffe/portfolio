import {Component, HostListener, OnInit} from '@angular/core';
import {Profile} from '../../common/Profile';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  title = 'Sean Cunniffe Portfolio';
  backgroundColor: string = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
  sideBarColor: string = getComputedStyle(document.documentElement).getPropertyValue('--side-bar-color');
  barHeight: number = 0;

  profile: Profile = new Profile();

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll() {
    //if top of element is at top 20% of screen set it as selected component
    let content = document.getElementById('content');
    for (let i = 0; i < content.childElementCount; i++) {
      let el = content.children[i];
      let rect = el.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= 200) {
        let elId = el.id.substring(0, el.id.length - 8);
        this.setSelected(elId);
      }
    }
  }

  @HostListener('window:resize')
  resize() {
    if (innerWidth <= 768) {
      this.barHeight = 75;
    } else {
      this.barHeight = 0;
      let el = document.getElementById('side-bar').style;
      el.animation = '';
    }
    let parentHeight = innerHeight - this.barHeight;
    document.documentElement.style.setProperty('--content-height', parentHeight + 'px');
  }

  loaded() {
    document.getElementById('content').style.visibility = 'visible';
    document.getElementById('side-bar').style.visibility = 'visible';
    document.getElementById('loading-screen').style.visibility = 'hidden';
    document.getElementById('top-bar').style.visibility = 'visible';
  };


  constructor(private profileService: ProfileService) {
  }

  ngOnInit(): void {

      this.profileService.profile.subscribe(response => {
        this.profile = response;
      });

    if (innerWidth <= 768) {
      this.barHeight = 75;
    } else {
      this.barHeight = 0;
    }
    document.documentElement.style.setProperty('--content-height', (innerHeight - this.barHeight) + 'px');

    this.setSelected('home');
    this.scrollTo('home-content');


  }


  setSelected(target: string) {
    //if selected is home then hide side-bar image
    if (target === 'home') {
      document.getElementById('sideBarPicture').style.opacity = '0';
    } else {
      document.getElementById('sideBarPicture').style.opacity = '1';
    }
    //deselect all elements
    //get sidebar elements that are instance of heading
    let sideBar = document.getElementById('side-bar');
    for (let i = 0; i < sideBar.childElementCount; i++) {
      if (sideBar.children[i] instanceof HTMLHeadingElement) {
        let child = <HTMLHeadingElement> sideBar.children[i];
        child.style.background = '';
      }
    }

    //set selected element
    let select = document.getElementById(target);
    select.style.background = 'linear-gradient(90deg,' + this.sideBarColor + ' 97%, ' + this.backgroundColor + ' 97%)';

  }

  scrollTo(target: string) {
    if (innerWidth <= 768) {
      // document.getElementById(target).scrollIntoView({behavior:'smooth',inline: 'start'});
      let el = document.getElementById(target).getBoundingClientRect();
      let top = el.top + window.pageYOffset - this.barHeight;
      window.scrollTo({top: top, behavior: 'smooth'});
    } else {
      document.getElementById(target).scrollIntoView({behavior: 'smooth', inline: 'start'});
    }
  }

  showSidebar() {
    let el = document.getElementById('side-bar').style;
    if (el.animation === '0.4s linear 0s 1 normal forwards running show-bar') {
      el.animation = 'hide-bar 0.4s forwards linear';
    } else {
      el.animation = 'show-bar 0.4s forwards linear';
    }
  }
}
