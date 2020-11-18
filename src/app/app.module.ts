import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { NewFormComponent } from './form/new-form/new-form.component';
import { LoadFormComponent } from './form/load-form/load-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormsModule } from '@angular/forms';
import { AddPlantComponent } from './form/load-form/add-plant/add-plant.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    NewFormComponent,
    LoadFormComponent,
    AddPlantComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [FormBuilder, LoadFormComponent],
  bootstrap: [AppComponent],
  entryComponents: [
    AddPlantComponent
  ]
})
export class AppModule { }
