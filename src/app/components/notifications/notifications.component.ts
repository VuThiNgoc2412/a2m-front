import { Component, OnInit, OnDestroy } from '@angular/core';
import { SseService } from 'app/_service/user/sse.service';
import { Subscription } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, OnDestroy {

  notifications: string[] = [];
  private subscription: Subscription;

  panelExpanded: Number;
  isRead: Boolean;

  constructor(private sseService: SseService) {}


  ngOnInit() {
    // this.sseService.connect()
    this.isRead = false;
  }

  changeShowDetail(index: number){
        if(this.panelExpanded === index){
      this.panelExpanded = -1;
    }
    else{
        this.panelExpanded = index;
    }
  }

  isHovered = false;

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }
  ngOnDestroy() {
    // this.sseService.disconnect();
    // this.subscription.unsubscribe();
  }
}