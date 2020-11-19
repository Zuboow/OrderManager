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
        this.modalService.open(content);
        // localStorage.setItem("plantList", JSON.stringify([
        //   {id: 1, name:'Abies balsamea "Abedebebe"', size: '60-70', potCap: '7,5', price: '28,00', quantity: 30},
        //   {id: 2, name:'Picea omorica "Hugo Wraca do Polsatu"', size: '110-120', potCap: '12', price: '48,00', quantity: 40}, 
        //   {id: 3, name:'Thuja plicata "Kukuryku w Słoiku"', size: '70-80', potCap: '7,5', price: '28,00', quantity: 20},
        // ]))
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