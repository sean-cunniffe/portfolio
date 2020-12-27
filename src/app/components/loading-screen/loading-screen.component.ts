import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // const moving = 1;
    // let x=0;
    // let y=0;
    // let xDir = moving;
    // let yDir = moving;
    // const dot1:HTMLDivElement = <HTMLDivElement>document.getElementById('dot1');

    // setInterval(()=>{
    //   let width = window.innerWidth-50;
    //   let height = window.innerHeight-50;
    //   if(x<=0){
    //     xDir=moving;
    //     dot1.style.background =this.getRandomColor();
    //   }else if(x>=width){
    //     xDir=-moving;
    //     dot1.style.background=this.getRandomColor();
    //   }
    //   if(y<=0){
    //     yDir=moving;
    //     dot1.style.background=this.getRandomColor();
    //   }else if(y>=height){
    //     yDir=-moving;
    //     dot1.style.background=this.getRandomColor();
    //   }
    //   x+=xDir;
    //   y+=yDir;
    //   this.moveTitle(x,y,'dot1');
    // },10);
  }

  // getRandomColor(): string{
  //   let randomColor: string = '#';
  //   for(let i=0;i<6;i++){
  //     randomColor = randomColor+''+(this.hexArr[Math.floor(Math.random()*this.hexArr.length)]);
  //   }
  //   console.log(randomColor);
  //   return randomColor;
  // }
  //
  // moveTitle(toX:number,toY:number,elString:string){
  //   const el:HTMLDivElement = <HTMLDivElement>document.getElementById(elString);
  //   el.style.left=''+toX+'px';
  //   el.style.bottom=''+toY+'px';
  // }
}
