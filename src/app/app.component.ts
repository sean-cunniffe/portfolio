import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sean Cunniffe Portfolio';

  ngOnInit(): void {
    // const vh = window.innerHeight * 0.01;
    // console.log(vh);
    // document.documentElement.style.setProperty('--vh', `${vh}px`);
    // console.log(document.documentElement.style.getPropertyValue('--vh'));
  }
}
window.addEventListener('load', function () {
   document.getElementById("content").style.visibility = "visible";
  document.getElementById("loading-screen").style.visibility = "hidden";
});

// window.addEventListener('resize', () => {
//     const vh = window.innerHeight * 0.01;
//     console.log(vh);
//     document.documentElement.style.setProperty('--vh', `${vh}px`);
//     console.log(vh);
// });
