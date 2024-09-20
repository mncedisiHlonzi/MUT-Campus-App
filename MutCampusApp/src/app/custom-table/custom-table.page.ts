import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-custom-table',
  templateUrl: 'custom-table.page.html',
  styleUrls: ['custom-table.page.scss'],
})
export class CustomTablePage {
  @ViewChild('mainModal') mainModal: any;
  @ViewChild('editModal') editModal: any;
  
  selectedDay: string = 'Monday';
  events: { [key: string]: any[] } = {};
  taskName: string = '';
  taskDescription: string = '';
  selectedWeekdays: string[] = [];
  enableNotification: boolean = false;
  
  editEventDetails: any = {};
  editTaskName: string = '';
  editTaskDescription: string = '';
  editSelectedWeekdays: string[] = [];
  editEnableNotification: boolean = false;

  showStartTimePicker = false;
  showEndTimePicker = false;
  startTimeHour: string = '00';
  startTimeMinute: string = '00';
  endTimeHour: string = '00';
  endTimeMinute: string = '00';
  startAmPm: string = 'AM';
  endAmPm: string = 'AM';

  constructor(private modalController: ModalController) {}

  onSegmentChange(event: any) {
    this.selectedDay = event.detail.value;
  }

  openModal() {
    this.mainModal.present();
  }

  async createEvent() {
    if (!this.taskName || !this.selectedWeekdays.length) {
      // Add error handling for missing task name or selected weekdays
      return;
    }

    const startTime = `${this.startTimeHour}:${this.startTimeMinute} ${this.startAmPm}`;
    const endTime = `${this.endTimeHour}:${this.endTimeMinute} ${this.endAmPm}`;

    const newEvent = {
      time: `${startTime} - ${endTime}`,
      taskName: this.taskName,
      taskDescription: this.taskDescription,
    };

    this.selectedWeekdays.forEach(day => {
      if (!this.events[day]) {
        this.events[day] = [];
      }
      this.events[day].push(newEvent);
    });

    this.dismiss();
  }

  async editEvent(event: any, index: number) {
    this.editEventDetails = event;
    this.editTaskName = event.taskName;
    this.editTaskDescription = event.taskDescription;
    this.editEnableNotification = event.enableNotification || false;
    
    const [startTime, endTime] = event.time.split(' - ');
    const [startHour, startMinute] = startTime.split(':');
    const [startAmPm] = startHour.split(' ');

    const [endHour, endMinute] = endTime.split(':');
    const [endAmPm] = endHour.split(' ');

    this.startTimeHour = startHour;
    this.startTimeMinute = startMinute;
    this.startAmPm = startAmPm;

    this.endTimeHour = endHour;
    this.endTimeMinute = endMinute;
    this.endAmPm = endAmPm;

    this.editSelectedWeekdays = this.selectedWeekdays;

    this.editModal.present();
  }

  async updateEvent() {
    if (!this.editTaskName || !this.editSelectedWeekdays.length) {
      // Add error handling for missing task name or selected weekdays
      return;
    }

    const startTime = `${this.startTimeHour}:${this.startTimeMinute} ${this.startAmPm}`;
    const endTime = `${this.endTimeHour}:${this.endTimeMinute} ${this.endAmPm}`;

    const updatedEvent = {
      time: `${startTime} - ${endTime}`,
      taskName: this.editTaskName,
      taskDescription: this.editTaskDescription,
      enableNotification: this.editEnableNotification
    };

    this.editSelectedWeekdays.forEach(day => {
      if (this.events[day]) {
        this.events[day] = this.events[day].map(event =>
          event === this.editEventDetails ? updatedEvent : event
        );
      }
    });

    this.dismissEditModal();
  }

  dismiss() {
    this.taskName = '';
    this.taskDescription = '';
    this.selectedWeekdays = [];
    this.enableNotification = false;
    this.mainModal.dismiss();
  }

  dismissEditModal() {
    this.editTaskName = '';
    this.editTaskDescription = '';
    this.editSelectedWeekdays = [];
    this.editEnableNotification = false;
    this.editModal.dismiss();
  }

  openStartTimePicker() {
    this.showStartTimePicker = true;
  }

  openEndTimePicker() {
    this.showEndTimePicker = true;
  }

  openStartTimePickerForEdit() {
    this.showStartTimePicker = true;
  }

  openEndTimePickerForEdit() {
    this.showEndTimePicker = true;
  }

  closeStartTimePickerModal() {
    this.showStartTimePicker = false;
  }

  closeEndTimePickerModal() {
    this.showEndTimePicker = false;
  }

  setStartTime() {
    this.closeStartTimePickerModal();
  }

  setEndTime() {
    this.closeEndTimePickerModal();
  }

  setStartAmPm(amPm: string) {
    this.startAmPm = amPm;
  }

  setEndAmPm(amPm: string) {
    this.endAmPm = amPm;
  }

  validateTimeInput(event: any, type: string) {
    const value = event.target.value;
    if (type === 'hour' && (value < 1 || value > 12)) {
      event.target.value = type === 'hour' ? '01' : '00';
    }
    if (type === 'minute' && (value < 0 || value > 59)) {
      event.target.value = '00';
    }
  }

  selectDay(day: string) {
    const index = this.selectedWeekdays.indexOf(day);
    if (index === -1) {
      this.selectedWeekdays.push(day);
    } else {
      this.selectedWeekdays.splice(index, 1);
    }
  }

  selectDayForEdit(day: string) {
    const index = this.editSelectedWeekdays.indexOf(day);
    if (index === -1) {
      this.editSelectedWeekdays.push(day);
    } else {
      this.editSelectedWeekdays.splice(index, 1);
    }
  }

  deleteEvent(event: any) {
    Object.keys(this.events).forEach(day => {
      this.events[day] = this.events[day].filter(e => e !== event);
    });
  }
}
