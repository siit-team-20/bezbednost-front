import {User} from "../../../layout/users/models/user.model";

export interface Notification{
  id: number;
  message: string;
  isRead: boolean;
  timeCreated: string;
  user: User;
}
