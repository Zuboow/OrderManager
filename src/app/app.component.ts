import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OrderManager';
  currentYear: number;

  ngOnInit(){
    var date = new Date();
    this.currentYear = date.getFullYear();
  }

  reload(){
    location.reload();
  }

}
