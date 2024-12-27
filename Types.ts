export interface LoginType{
    email:string,
    password:string
}


export interface SignupType{
    name:string,
    email:string,
    password:string,
    confirmpassword:string
}


export interface BloodRequestType{
    _id: string;
    fullName: string;
    urgency: string;
    email: string;
    quantity: string;
    message: string;
    bloodGroup: string;
    status: 'Accepted' | 'Rejected' | 'Pending';  
    requestdate: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface LifestreamUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    confirmpassword: string;
    role: 'admin' | 'donor' | 'recipient';  
    __v: number;
  }

  export interface UserRoleData {
    role: string;
    _id: string;
  }


  export interface ScheduleDonationFormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    donationType: 'Whole Blood' | 'Plasma' | 'Platelets';
    date: string;
    time: string; 
    locationType: 'Blood Bank' | 'Donation Camp';
    address: string;
    recentIllness: boolean; // For checkboxes
    recentTravel: boolean; 
    medication: string;
    chronicDiseases: string;
    previousDonationDate: string; // Date string in 'YYYY-MM-DD' format
    notes: string;
    bloodQuantity: string; // Blood quantity in ml
    bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  }
  