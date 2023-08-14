import { UserInfo } from "app/_model/auth/user-info";
import { DauSach } from "../book.model";

export class phieumuonDto {
    idPhieuMuon?: number;
    userUid?: number;
    createdDate?: Date;
    borrowDate?: Date;
    returnDateEstimate?: Date;
    returnUpdateReal?: Date;
    status?: number;
    extended_times?: number;
    book?: DauSach[];
    UserInfo?: UserInfo;
    countBook?: number;
}
