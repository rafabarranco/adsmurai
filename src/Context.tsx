import { createContext, ReactNode } from 'react';

export const DataContext = createContext({});

export const DataProvider = ({
  children,
  employee,
}: {
  children: ReactNode;
  employee: {
    id: number;
    picture: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    department: string;
    salary: number;
    hireDate: string;
    dismissalDate: string;
  };
}) => {
  return (
    <DataContext.Provider value={{ employee }}>{children}</DataContext.Provider>
  );
};
