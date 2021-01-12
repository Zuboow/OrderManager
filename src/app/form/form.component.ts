import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  modeSelected: number = 0;
  orderName = "";
  orderExists: boolean;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.orderExists = localStorage.getItem("orderName") != null ? true : false;
  }

  selectMode(newNumber, content) {
    switch (newNumber) {
      case 1:
        localStorage.setItem("plantList", JSON.stringify([]));
        localStorage.removeItem("orderName");
        this.modalService.open(content);
        break;
      case 2:
        this.modeSelected = newNumber;
        break;
    }

  }
  setName() {
    this.orderName = localStorage.getItem("orderName");
    this.modalService.dismissAll();
    this.modeSelected = 1;
  }

}