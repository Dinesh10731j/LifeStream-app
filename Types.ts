export interface LoginType {
  email: string;
  password: string;
}

export interface SignupType {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
}

export interface BloodRequestType<T extends string> {
  _id: string;
  fullName: string;
  urgency: string;
  email: string;
  quantity: string;
  message: string;
  bloodGroup: string;
  status: T;
  requestdate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type requestStatus = BloodRequestType<
  "Accepted" | "Rejected" | "Pending"
>;

export interface LifestreamUser<T extends string> {
  _id: string;
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
  role: T;
  __v: number;
}

export type userRole = LifestreamUser<"admin" | "donor" | "receiptant">;

export interface UserRoleData {
  role: string;
  _id: string;
}

export interface ScheduleDonationFormData<
  T extends string,
  U extends string,
  G extends string
> {
  fullName: string;
  email: string;
  phoneNumber: string;
  donationType: T;
  date: string;
  time: string;
  locationType: U;
  address: string;
  recentIllness: boolean; // For checkboxes
  recentTravel: boolean;
  medication: string;
  chronicDiseases: string;
  previousDonationDate: string; // Date string in 'YYYY-MM-DD' format
  notes: string;
  bloodQuantity: string; // Blood quantity in ml
  bloodGroup: G; //;
}

export type donationTypes = ScheduleDonationFormData<
  "Whole Blood" | "Plasma" | "Platelets",
  "Blood Bank" | "Donation Camp",
  "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
>;


export interface DonationItem {
  _id: string;
  fullName: string;
  email: string;
  donationType: string;
  phoneNumber: string;
  date: string;
  status: string;
}

export interface ViewHistoryProps {
  email: string;
}

