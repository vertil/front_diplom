import React, { useState } from 'react';
import $api from '../../http';
import {
  DepartmentsResponse,
  Department,
} from '../../models/response/DepartmentsResponse';
import TitleOfPages from '../common/TitleOfPages/TitleOfPages';
import Button from '../common/Button/Button';
import Table from '../common/Table/Table';

const Departments = () => {
  const tableColumn: string[] = ['Id кабинета', 'ФИО'];
  const [departments, setDepartments] = useState<Department[]>([]);

  const GetDepartments = async () => {
    try {
      const response = await $api.get<DepartmentsResponse>(
        '/departments/all_deps'
      );
      const resp = response.data[0];
      setDepartments(resp);
    } catch (error) {
      console.log('GetDepartments', error);
    }
  };

  return (
    <>
      <TitleOfPages title='Departments' />

      <Button text='Получить всё' onClick={GetDepartments} />

      {departments.length > 0 && (
        <Table theadName={tableColumn}>
          {departments.map((item: Department, index: number) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
              </tr>
            );
          })}
        </Table>
      )}
    </>
  );
};

export default Departments;
