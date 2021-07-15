import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MapsModule } from '@syncfusion/ej2-angular-maps';
import { LegendService, MarkerService, MapsTooltipService, DataLabelService, BubbleService, NavigationLineService, SelectionService, AnnotationsService, ZoomService } from '@syncfusion/ej2-angular-maps';
import { HttpClientModule } from '@angular/common/http';
// import { LocationService } from 'src/service/location.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MapsModule,
    HttpClientModule
  ],
  providers: [LegendService, MarkerService, MapsTooltipService,
     DataLabelService, BubbleService, NavigationLineService , SelectionService,
     AnnotationsService, ZoomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
