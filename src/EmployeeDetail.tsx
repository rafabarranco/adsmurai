/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactNode, useContext, } from "react";
import { DataContext } from "./Context";

const EmployeeDetail = ({ handleGoToEmployeesPage }: { employee: number, handleGoToEmployeesPage: () => void }) => {
    const { employee } = useContext(DataContext) as any

    const { 
        id,
        picture,
        firstName,
        lastName,
        email,
        role,
        department,
        salary,
        hireDate,
        dismissalDate 
    } = employee as any || {}

    const dateOfHire = hireDate ? hireDate.substring(0, 10) : 'Unknown';
    const dateOfDismissal = dismissalDate ? dismissalDate.substring(0, 10) : 'Currently hired'

    const Tag = () => {
        if (role == 'user') {
            return <div className='tag user'>User</div>
        } else if (role == 'admin') {
            return <div className='tag admin'>Admin</div>
        } else if (role == 'superadmin') {
            return <div className='tag superadmin'>Superadmin</div>
        }
    }

    const DepartamentWithIcon = (): ReactNode => {
        console.log(department);
        if (department == 'customer success') {
            return <div className='departament'>
                <div className="material-icons">support_agent</div>
                Customer Success
            </div>
        } else if (department == 'engineering') {
            return <div className='departament'>
                <div className="material-icons">computer</div>
                IT
            </div>
        } else if (department == 'finance') {
            return <div className='departament'>
                <div className="material-icons">account_balance</div>
                Finance
            </div>
        }

        return <>{department}</>

    }
    return (
        <div>
            <div className="button" onClick={() => { handleGoToEmployeesPage() }}>Click here to go back</div>
            <div className="employee">
                <div>{id}</div>
                <div className='imageWrapper'><img src={picture} width={'250px'} height={'250px'} /></div>
                <div className='employeeDetailGroup'>
                    <div><div>Name:</div><div>{firstName}</div></div>
                    <div><div>Last name:</div><div>{lastName}</div></div>
                    <div><div>Email:</div><div>{email}</div></div>
                </div>
                <div className='employeeDetailGroup'>
                    <div><div>Role:</div><div>{Tag()}</div></div>
                    <div><div>Department:</div><div>{DepartamentWithIcon()}</div></div>
                    <div><div>Salary:</div><div>{salary} €</div></div>
                </div>
                <div className='employeeDetailGroup'>
                    <div><div>Hired on:</div><div>{dateOfHire}</div></div>
                    <div><div>Dismissal date:</div><div>{dateOfDismissal}</div></div>
                </div>
                {/* <div className='employeeDetailGroup'></div> */}
            </div>

        </div>
    )
}

export default EmployeeDetail