import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OrderManager';
  currentYear: number;
  fileToUpload: File = null;
  arrayBuffer: any;

  ngOnInit() {
    var date = new Date();
    this.currentYear = date.getFullYear();
  }

  reload() {
    location.reload();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    if (this.fileToUpload.name.split(".")[1] == "xlsx" || this.fileToUpload.name.split(".")[1] == "ods") {
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(this.fileToUpload);
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];

        var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });

        console.log(arraylist);

        var plantList = [];
        for(var x = 9; x<arraylist.length;x++){
          if (arraylist[x]['Szkółka Roślin Ozdobnych'] != "Rośliny szczepione" && arraylist[x]['__EMPTY_5'] >= 1){
            plantList.push({
              id: arraylist[x]['__EMPTY'], 
              name: arraylist[x]['Szkółka Roślin Ozdobnych'], 
              potCap: arraylist[x]['__EMPTY_2'], 
              price: arraylist[x]['__EMPTY_5'],
              size: arraylist[x]['__EMPTY_1']});
          }
        }
        console.log(plantList);
        localStorage.setItem('plantCatalogue', JSON.stringify(plantList));
        alert("Importowanie zakończone pomyślnie");
      }
    } else {
      alert("Nieprawidłowy typ pliku");
    }
  }

}
