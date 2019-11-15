import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, MonthService, WorkWeekService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ScheduleModule, RecurrenceEditorModule
  ],
  providers: [DayService, WeekService, MonthService, WorkWeekService, MonthAgendaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
