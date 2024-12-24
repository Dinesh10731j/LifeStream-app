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