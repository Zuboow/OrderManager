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

  head = [['Lp.', 'Odmiana', 'Wymiar (cm)', 'Pojemnik (l)', 'Ilość zamówionych roślin', 'Cena w zakupie powyżej 5000zł - rabat 20%']]

  plants = [];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.orderName = localStorage.getItem("orderName");
    this.plants = JSON.parse(localStorage.getItem("plantList"));
  }

  // SaveExcelFile(){
  //   let excelTable = document.getElementById('excelTable');
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(excelTable);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Zamówienie');

  //   XLSX.writeFile(wb, this.fileName + '.xlsx');
  // }

  SavePDFFile() {
    const options = {
      filename: localStorage.getItem("orderName").trim(),
      image: { type: 'jpeg' },
      html2canvas: {
        margin: 0,
        height: 4000,
        scale: 4,
        y: 0,
        scrollY: 0,
        dpi: 196
      },
      jsPDF: { orientation: 'portrait' },
      pagebreak: { mode: 'css', after: '.avoidThisRow' }

    };

    const content: Element = document.getElementById("excelTable");
    html2pdf().from(content).set(options).save();
  }



  removeByIndex(index) {
    this.plants.splice(index, 1);
    this.saveInLocalStorage();
  }

  edit(index, content) {
    localStorage.setItem("editedIndex", JSON.stringify(this.plants[index]));
    this.editedIndex = index;
    this.modalService.open(content);
  }

  add(content) {
    this.editedIndex = -1;
    this.modalService.open(content);
  }

  loadPlant() {
    var plant = JSON.parse(localStorage.getItem('plantInstance'));
    if (this.editedIndex > -1) {
      this.plants[this.editedIndex] = plant;
    } else {
      this.plants.push(plant);
    }
    this.modalService.dismissAll();
    localStorage.removeItem("plantInstance");
    this.saveInLocalStorage();
  }

  saveInLocalStorage() {
    localStorage.setItem("plantList", JSON.stringify(this.plants));
  }
}
