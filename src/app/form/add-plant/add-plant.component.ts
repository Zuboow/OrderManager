import { Component, OnInit } from '@angular/core';
import { LoadFormComponent } from '../load-form/load-form.component';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.css']
})
export class AddPlantComponent implements OnInit {
  plants = [
    {name:'Abies balsamea "Abedebebe"', size: '60-70', potCap: '7,5', price: '28,00'},
    {name:'Picea omorica "Hugo Wraca do Polsatu"', size: '110-120', potCap: '12', price: '48,00'}, 
    {name:'Thuja plicata "Kukuryku w Słoiku"', size: '70-80', potCap: '7,5', price: '28,00'}];
  quantity: number = 0;
  type = '';
  index: number;

  constructor(private loadForm: LoadFormComponent) { 
  }

  ngOnInit(): void {
  }

  confirm(){
    this.index = parseInt(this.type.split(".")[0]);
    console.log("index: " + this.index + "\nquantity: " + this.quantity);
    var newPlant = {
      name: this.plants[this.index - 1].name,
      size: this.plants[this.index - 1].size,
      potCap: this.plants[this.index - 1].potCap,
      price: this.plants[this.index - 1].price,
      quantity: this.quantity
    }
    localStorage.setItem('newPlant', JSON.stringify(newPlant));
    this.loadForm.loadNewPlant();
  }

}
