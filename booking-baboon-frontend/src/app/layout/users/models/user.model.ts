import {NotificationType} from "./NotificationType.module";

enum UserStatus{
  Inactive= "Inactive",
  Active="Active",
  Blocked="Blocked"
}

enum Role{
  UNAUTHORIZED,
  GUEST,
  HOST,
  ADMIN
}
export interface User{
  id?: number;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  phoneNumber?: string;
  status?: UserStatus;
  role?: Role;
  ignoredNotifications?: NotificationType[]
}
