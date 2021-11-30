/*
export enum UserContextType{
   Employer,
   Employee
};


export enum UserType{
    Individual,
    Organization
}*/

export type UserContextType = "Employer" | "Employee";
export type UserType = "Individual" | "Organization";
export type DurationType = "Years" | "Months" | "Days" | "Weeks";

export let UserContextTypeMap:{ [index:string] : UserContextType } = {};
UserContextTypeMap['employee'] = 'Employee';
UserContextTypeMap['employer'] = 'Employer';

export let UserTypeMap:{[index:string]: UserType} = {};
UserTypeMap['individual'] = 'Individual';
UserTypeMap['organization'] = 'Organization';

export let DurationTypeMap:{[index:string] : DurationType} = {};
DurationTypeMap['yr'] = 'Years';
DurationTypeMap['mt'] = 'Months';
DurationTypeMap['d'] = 'Days';
DurationTypeMap['wk'] = 'Weeks';