import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import { faAngular } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sean Cunniffe Portfolio';
  backgroundColor:string = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
  sideBarColor:string = getComputedStyle(document.documentElement).getPropertyValue('--side-bar-color');
// @HostListener('scroll', ['$event']) // for scroll events of the current element
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll() {
    //if top of element is at top 20% of screen set it as selected component
    let content = document.getElementById('content');
    for(let i=0;i<content.childElementCount;i++){
      let el = content.children[i];
      let rect = el.getBoundingClientRect();
      if(rect.top>=0 && rect.top <=200){
        let elId = el.id.substring(0,el.id.length-8);
        this.setSelected(elId);
      }
    }
  }
  ngOnInit(): void {
    this.setSelected('home');
    this.scrollTo('home-content');
  }

  setSelected(target: string){
    //if selected is home then hide side-bar image
    if(target === 'home'){
      document.getElementById('sideBarPicture').style.opacity = '0';
    }else{
      document.getElementById('sideBarPicture').style.opacity = '1';
    }
    //deselect all elements
    //get sidebar elements that are instance of heading
    let sideBar = document.getElementById('side-bar');
    for(let i=0;i<sideBar.childElementCount;i++){
      if(sideBar.children[i] instanceof HTMLHeadingElement){
        let child = <HTMLHeadingElement>sideBar.children[i];
        child.style.background = '';
      }
    }

    //set selected element
    let select = document.getElementById(target);
    select.style.background= 'linear-gradient(90deg,'+this.sideBarColor+' 97%, '+this.backgroundColor+' 97%)';

  }

  scrollTo(target: string){
    document.getElementById(target).scrollIntoView({behavior:'smooth',inline: 'start'});
  }
}
window.addEventListener('load', function () {
   document.getElementById("content").style.visibility = "visible";
   document.getElementById('side-bar').style.visibility = "visible";
  document.getElementById("loading-screen").style.visibility = "hidden";
});

