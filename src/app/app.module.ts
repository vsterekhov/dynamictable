import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutComponent } from './component/main-layout/main-layout.component';
import { DynamicTableComponent } from './component/dynamic-table/dynamic-table.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    DynamicTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
