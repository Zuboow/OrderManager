import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  modeSelected: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  selectMode(newNumber){
    this.modeSelected = newNumber;  
  }

}