export enum UserRole {
  NEW_HIRE = 'NEW_HIRE',
  HR_ADMIN = 'HR_ADMIN',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}