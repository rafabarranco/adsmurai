import { FC, ReactElement } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { usePrompt } from '../../../utils/hooks/usePrompt/usePrompt';
import { TCreateEmployeeForm } from '../../../models/employees/types';

const EmployeeCreation: FC = (): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm<TCreateEmployeeForm>();

  const onSubmit: SubmitHandler<TCreateEmployeeForm> = (data) => {
    console.log('Datos enviados:', data);
    reset();
  };

  usePrompt(
    'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?',
    isDirty,
  );

  return (
    <div>
      <h2>Create new employee</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Picture:</label>
          <input {...register('picture', { required: true })} />
        </div>
        <div>
          <label>Name:</label>
          <input {...register('firstName', { required: true })} />
        </div>
        <div>
          <label>Surname:</label>
          <input {...register('lastName', { required: true })} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" {...register('email', { required: true })} />
        </div>
        <div>
          <label>Department:</label>
          <input {...register('department', { required: true })} />
        </div>
        <div>
          <label>Role:</label>
          <input {...register('role', { required: true })} />
        </div>
        <div>
          <label>Salary:</label>
          <input {...register('salary', { required: true })} />
        </div>
        <div>
          <label>Hire date:</label>
          <input {...register('hireDate', { required: true })} />
        </div>
        <div>
          <label>Dismissal date:</label>
          <input {...register('dismissalDate', { required: true })} />
        </div>
        <button type="submit">Add employee</button>
      </form>
    </div>
  );
};

export default EmployeeCreation;
