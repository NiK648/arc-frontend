export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    vendorId: number;
    vendorName: string;
    projectId: number;
    projectName: string;
    tradeId: number;
    tradeName: string;
    email: string;
    phone: string;
    type: EmployeeType;
}

export enum EmployeeType {
    Internal = 1,
    External = 2,
}

export enum EmployeeWorkStatus {
    Present = 1,
    Absent = 2,
    SickLeave = 3,
    AnnualLeave = 4,
    Holiday = 5,
}
