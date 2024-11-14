import { ReactNode } from "react";

export interface User {
  id: number;
  fullName: string;
  email: string;
  password?: string;
  createdAt?: ReactNode;
  updatedAt?: ReactNode;
  authorities?: string[];
  username?: string;
  accountNonExpired?: boolean;
  credentialsNonExpired?: boolean;
  accountNonLocked?: boolean;
  enabled?: boolean;
}
