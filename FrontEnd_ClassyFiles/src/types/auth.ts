// types/auth.ts
import { Dispatch, SetStateAction } from 'react';

export type UserType = 'user' | 'company' | null;

export interface AuthProps {
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  setUserType: Dispatch<SetStateAction<UserType>>;
}