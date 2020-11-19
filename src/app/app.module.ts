import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { LoadFormComponent } from './form/load-form/load-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPlantComponent } from './form/load-form/add-plant/add-plant.component';
import { SetOrderNameComponent } from './form/set-order-name/set-order-name.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    LoadFormComponent,
    AddPlantComponent,
    SetOrderNameComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FormBuilder, LoadFormComponent],
  bootstrap: [AppComponent],
  entryComponents: [
    AddPlantComponent
  ]
})
export class AppModule { }
