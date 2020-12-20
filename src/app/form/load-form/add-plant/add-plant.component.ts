import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.css']
})
export class AddPlantComponent implements OnInit {

  plantForm: FormGroup;
  plants = [];

  quantity: number = 0;
  plantPriceZl: number = 0;
  plantPriceGr: number = 0;
  plantHeight: string = "";
  potCapacity: string = "";
  customNameText: string = "";

  index: number = null;
  formError: boolean = false;

  
  errorMessage = '';
  @Output() loadPlant = new EventEmitter();
  @Input() editedIndex = -1;
  @Input() customName = false;

  constructor(private plantFormBuilder: FormBuilder) {
    this.plantForm = new FormGroup({
      plant: new FormControl(null)
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem("plantCatalogue") != null){
      this.plants = JSON.parse(localStorage.getItem("plantCatalogue"));
    }
    if (this.editedIndex > -1) {
      if (!this.customName){
        var ind = JSON.parse(localStorage.getItem("editedIndex"));
        this.quantity = ind.quantity;
        this.plantForm.setValue({ plant: ind.id });
        this.loadEditedPlantValues();
        localStorage.removeItem("editedIndex");
      } else {
        var ind = JSON.parse(localStorage.getItem("editedIndex"));
        this.quantity = ind.quantity;
        this.loadEditedPlantValues();
        localStorage.removeItem("editedIndex");
      }
    } else {
      this.plantForm.setValue({ plant: null });
    }
  }

  loadEditedPlantValues(){
    var index = JSON.parse(localStorage.getItem("tableIndex"));
    var editedPlant = JSON.parse(localStorage.getItem("plantList"))[index];
    console.log(editedPlant);
    this.plantHeight = editedPlant.size;
    this.potCapacity = editedPlant.potCap;
    this.customNameText = this.customName ? editedPlant.customName : null;
    var y = editedPlant.price.toString().split(".")[0];
    this.plantPriceZl = Number(y);
    if (editedPlant.price.toString().split(".")[1] != null){
      var x = parseFloat(editedPlant.price);
      this.plantPriceGr = Math.round((x - this.plantPriceZl) * 100);
    } else {
      this.plantPriceGr = 0;
    }
  }

  loadSelectedPlantIntoForm(plant){
    this.plants.forEach((element, index) => {
      if (element.id == plant) {
        this.index = index;
      }
    });
    this.plantHeight = this.plants[this.index].size + "cm";
    var y = this.plants[this.index].price.toString().split(".")[0];
    this.plantPriceZl = Number(y);
    if (this.plants[this.index].price.toString().split(".")[1] != null){
      var x = parseFloat(this.plants[this.index].price);
      this.plantPriceGr = Math.round((x - this.plantPriceZl) * 100);
    } else {
      this.plantPriceGr = 0;
    }
    this.potCapacity = this.plants[this.index].potCap;
  }

  confirm() {
    this.plants.forEach((element, index) => {
      if (element.id == this.plantForm.get('plant').value) {
        this.index = index;
      }
    });
    if (((this.index != null && !this.customName) || (this.customName && this.customNameText.trim().length > 0)) 
      && this.quantity > 0 && this.plantPriceZl >= 0 && this.plantPriceGr >= 0 
      && this.plantPriceGr < 100 && this.plantHeight.trim().length > 0 && this.potCapacity.trim().length > 0 
      && this.plantPriceGr != null && this.plantPriceZl != null) {
      var newPlant = {
        id: !this.customName ? this.plants[this.index].id : null,
        name: !this.customName ? this.plants[this.index].name : null,
        size: this.plantHeight,
        potCap: this.potCapacity,
        price: this.plantPriceZl + (this.plantPriceGr * 0.01),
        quantity: this.quantity,
        fullPrice: this.quantity * (this.plantPriceZl + (this.plantPriceGr * 0.01)),
        customName: this.customName ? this.customNameText : null
      };

      this.formError = false;
      localStorage.setItem('plantInstance', JSON.stringify(newPlant));
      localStorage.removeItem("tableIndex");
      this.loadPlant.emit(null);
    } else {
      this.formError = true;
      this.errorMessage = "Uzupełnij prawidłowo wszystkie pola";
    }
  }
}
