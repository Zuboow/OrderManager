import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as html2pdf from 'html2pdf.js';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
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

  head = [['Lp.', 'Odmiana', 'Wymiar (cm)', 'Pojemnik (l)', 'Ilość zamówionych roślin', 'Cena w zakupie powyżej 5000zł - rabat 20%']]

  plants = [
    ['Juniperus chinensis "Gold Fern"', '50-60', '7,5', 20, '28,00'],
    ['Juniperus chinensis "Stricta"', '55-60', '7,5', 20, '28,00'],
    ['Juniperus horizontalis "Prince of Wales"', '70-80', '7,5', 20, '28,00'],
    ['Juniperus squamata "Blue Carpet"', '60-70', '7,5', 10, '28,00'],
    ['Picea abies "Nidiformis"', '60-70', '15', 20, '64,00'],
  ];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
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
      filename: 'Zamówienie',
      image: { type: 'jpeg' },
      html2canvas: {
        scale: 4,
        dpi: 196
      },
      jsPDF: { orientation: 'portrait' },

    };

    const content: Element = document.getElementById("excelTable");
    html2pdf().from(content).set(options).save();
  }



  removeByIndex(index) {
    this.plants.splice(index, 1);
  }

  open(content) {
    const modalRef = this.modalService.open(content);
  }

  loadNewPlant() {
    var newPlant = JSON.parse(localStorage.getItem('newPlant'));
    console.log(newPlant);
    var addition = [newPlant.name, newPlant.size, newPlant.potCap, newPlant.quantity, newPlant.price];
    console.log(addition);
    this.plants.push(addition);
    this.modalService.dismissAll();

    localStorage.removeItem("newPlant");
  }
}
