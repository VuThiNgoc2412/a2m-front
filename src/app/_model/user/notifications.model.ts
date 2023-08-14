import { Book } from "./book.model";

export class Notifications {
   notification_id?: String;
   userUid?: String;
   isRead?: Boolean;
   about?: Number;  //0: đặt sách, 1: phiếu mượn
   content?: String;
}
