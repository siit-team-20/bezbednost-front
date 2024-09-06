import {Host} from "../../layout/users/models/host.model";
import {Guest} from "../../layout/users/models/guest.model";

const mockHost: Host = {

  address: "Host Address",
  email: "host@email.com",
  firstName: "Host First Name",
  lastName: "Host Last Name",
  password: "hostspass",
  phoneNumber: "+38123457689",
  role: 2
}

const mockGuest: Guest = {
  address: "Guest Address",
  email: "guest@email.com",
  firstName: "Guest First Name",
  lastName: "Guest Last Name",
  password: "guestspass",
  phoneNumber: "+381234567689",
  role: 1
}

export {mockGuest, mockHost}
