import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.css']
})
export class AddPlantComponent implements OnInit {

  plantForm: FormGroup;
  plants = [
    { id: 1, name: 'Abies balsamea "Abedebebe"', size: '60-70', potCap: '7,5', price: '28,00' },
    { id: 2, name: 'Picea omorica "Hugo Wraca do Polsatu"', size: '110-120', potCap: '12', price: '48,00' },
    { id: 3, name: 'Thuja plicata "Kukuryku w Słoiku"', size: '70-80', potCap: '7,5', price: '28,00' }];
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
        quantity: this.quantity
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
