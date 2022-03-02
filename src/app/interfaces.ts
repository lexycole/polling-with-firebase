export interface EventResponse {
  event: EmergencyEvent;
  links: Links;
}

export interface EmergencyEvent {
  id: number;
  created: Date;
  caller: Caller;
  dialed: string;
}

export interface Caller {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: Address;
}

export interface Address {
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
}

export interface Acknowledgement {
  timestamp: Date;
  user: string;
  note: string;
}

export interface Links {
  self: string;
  next: string;
  acknowledgements: string;
}
