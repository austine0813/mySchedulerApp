// import { Component } from '@angular/core';
// import { View } from '@syncfusion/ej2-angular-schedule'
 
// @Component({
//   selector: 'app-root',
//   template:'<ejs-schedule height="650px" width="100%" [currentView]="setView"></ejs-schedule>',
//   // templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'mySchedulerApp';
//   public setView:View = 'Month';
// }



import { Component } from '@angular/core';
import { EventSettingsModel, View, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
@Component({
  selector: 'app-root',
  // template: '<ejs-schedule width='100%' height='650px' [currentView]="setView"></ejs-schedule>', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService]
})
export class AppComponent {
  public selectedDate: Date = new Date(2018, 10, 14);
  public readonly: boolean = true;
  private calendarId: string = '5105trob9dasha31vuqek6qgp0@group.calendar.google.com';
  private publicKey: string = 'AIzaSyD76zjMDsL_jkenM5AAnNsORypS1Icuqxg';
  private dataManger: DataManager = new DataManager({
      url: 'https://www.googleapis.com/calendar/v3/calendars/' + this.calendarId + '/events?key=' + this.publicKey,
      adaptor: new WebApiAdaptor,
      crossDomain: true
  })
  public eventSettings: EventSettingsModel = { dataSource: this.dataManger };
  onDataBinding(e: { [key: string]: Object }): void {
      let items: { [key: string]: Object }[] = (e.result as { [key: string]: Object }).items as { [key: string]: Object }[];
      let scheduleData: Object[] = [];
      if (items.length > 0) {
          for (let i: number = 0; i < items.length; i++) {
              let event: { [key: string]: Object } = items[i];
              let when: string = (event.start as { [key: string]: Object }).dateTime as string;
              let start: string = (event.start as { [key: string]: Object }).dateTime as string;
              let end: string = (event.end as { [key: string]: Object }).dateTime as string;
              if (!when) {
                  when = (event.start as { [key: string]: Object }).date as string;
                  start = (event.start as { [key: string]: Object }).date as string;
                  end = (event.end as { [key: string]: Object }).date as string;
              }
              scheduleData.push({
                  Id: event.id,
                  Subject: event.summary,
                  StartTime: new Date(start),
                  EndTime: new Date(end),
                  IsAllDay: !(event.start as { [key: string]: Object }).dateTime
              });
          }
      }
      e.result = scheduleData;
  }
};