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
  index: number = null;
  formError: boolean = false;
  errorMessage = '';
  @Output() loadPlant = new EventEmitter();
  @Input() editedIndex = -1;

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
      var ind = JSON.parse(localStorage.getItem("editedIndex"));
      this.quantity = ind.quantity;
      this.plantForm.setValue({ plant: ind.id });
      console.log(this.plantForm);
      localStorage.removeItem("editedIndex");
    } else {
      this.plantForm.setValue({ plant: null });
    }
  }

  confirm() {
    this.plants.forEach((element, index) => {
      if (element.id == this.plantForm.get('plant').value) {
        this.index = index;
      }
    });
    if (this.index != null && this.quantity > 0) {
      var newPlant = {
        id: this.plants[this.index].id,
        name: this.plants[this.index].name,
        size: this.plants[this.index].size,
        potCap: this.plants[this.index].potCap,
        price: this.plants[this.index].price,
        quantity: this.quantity,
        fullPrice: this.quantity * this.plants[this.index].price
      };

      this.formError = false;
      localStorage.setItem('plantInstance', JSON.stringify(newPlant));
      this.loadPlant.emit(null);
    } else if (this.index != null){
      this.formError = true;
      this.errorMessage = "Nieprawidłowa ilość";
    } else if (this.quantity > 0){
      this.formError = true;
      this.errorMessage = "Brak wybranej odmiany";
    }
     else {
      this.formError = true;
      this.errorMessage = "Uzupełnij wszystkie pola";
    }
  }
}
