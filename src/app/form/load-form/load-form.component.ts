import { Component, Input, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as html2pdf from 'html2pdf.js';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPlantComponent } from './add-plant/add-plant.component';

@Component({
  selector: 'app-load-form',
  templateUrl: './load-form.component.html',
  styleUrls: ['./load-form.component.css']
})
export class LoadFormComponent implements OnInit {

  fileName: string = "Zamówienie";
  icon = faTimes;
  icon2 = faEdit;
  editedIndex: -1;
  @Input() orderName = "";
  endPrice = 0;

  head = [['Lp.', 'Odmiana', 'Wysokość rośliny', 'Pojemność doniczki', 'Ilość zamówionych roślin', 'Cena hurtowa netto', 'Suma netto']]

  plants = [];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.orderName = localStorage.getItem("orderName");
    this.plants = JSON.parse(localStorage.getItem("plantList"));
    this.setNewEndPrice();
  }

  // SaveExcelFile(){
  //   let excelTable = document.getElementById('excelTable');
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(excelTable);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Zamówienie');

  //   XLSX.writeFile(wb, this.fileName + '.xlsx');
  // }

  SavePDFFile(content) {
    const options = {
      filename: localStorage.getItem("orderName").trim(),
      image: { type: 'jpeg' },
      html2canvas: {
        height: 400+(this.plants.length * 45)+((this.plants.length / 22) * 45),
        scale: 4,
        y: 0,
        scrollY: 0,
        dpi: 196
      },
      jsPDF: { orientation: 'portrait' },
      // pagebreak: { mode: 'css', after: '.avoidThisRow'}
      pagebreak: {mode: 'avoid-all'}

    };

    html2pdf().from(content.innerHTML).set(options).save();
  }



  removeByIndex(index) {
    this.plants.splice(index, 1);
    this.saveInLocalStorage();
    this.setNewEndPrice();
  }

  edit(index, content) {
    localStorage.setItem("editedIndex", JSON.stringify(this.plants[index]));
    this.editedIndex = index;
    localStorage.setItem("tableIndex", JSON.stringify(this.editedIndex));
    this.modalService.open(content);
  }

  add(content) {
    this.editedIndex = -1;
    this.modalService.open(content);
  }

  editName(content){
    this.modalService.open(content);
  }

  setNewOrderName(){
    this.orderName = localStorage.getItem("orderName");
    this.modalService.dismissAll();
  }

  loadPlant() {
    var plant = JSON.parse(localStorage.getItem('plantInstance'));
    if (this.editedIndex > -1) {
      this.plants[this.editedIndex] = plant;
    } else {
      this.plants.push(plant);
    }
    this.setNewEndPrice();
    this.modalService.dismissAll();
    localStorage.removeItem("plantInstance");

    this.saveInLocalStorage();
  }

  setNewEndPrice(){
    this.endPrice = 0;
    this.plants.forEach(element => {
      this.endPrice += element.fullPrice; 
    });
  }

  saveInLocalStorage() {
    localStorage.setItem("plantList", JSON.stringify(this.plants));
  }
}
