import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-set-order-name',
  templateUrl: './set-order-name.component.html',
  styleUrls: ['./set-order-name.component.css']
})
export class SetOrderNameComponent implements OnInit {

  @Output() nameSaved = new EventEmitter();
  name: string = "Zestawienie roślin";
  formError: boolean = false;
  errorMessage = "Pole nie może być puste";

  constructor() { }

  ngOnInit(): void {
  }

  confirm(){
    if (this.name.trim().length > 0){
      localStorage.setItem("orderName", this.name.trim());
      this.formError = false;
      this.nameSaved.emit(null);
    } else {
      this.formError = true;
    }
  }

}
