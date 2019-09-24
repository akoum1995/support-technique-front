import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }
  showNotification(from: any, align: any, type: any, msg: any) {
    this.toastr.info('<span class="now-ui-icons ui-1_bell-53"></span>' + msg, '', {
      timeOut: 3000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-' + type + ' alert-with-icon',
      positionClass: 'toast-' + from + '-' +  align
    });
  }
}
