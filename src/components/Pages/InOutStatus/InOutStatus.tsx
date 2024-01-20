import React, { useState } from 'react';
import $api from '../../../http';
import {
  InOutStatusObj,
  InOutStatusResponse,
} from '../../../models/response/InOutStatus';
import styles from './InOutStatus.module.css';
import TitleOfPages from '../../common/TitleOfPages/TitleOfPages';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Table from '../../common/Table/Table';

const InOutStatus = () => {
  const tableColumn: string[] = [
    'Дата и время',
    'Id сотрудника',
    'Id кабинета',
  ];
  const [inOutStatus, setInOutStatus] = useState<InOutStatusObj[]>([]);
  const [inOutStatusLimit, setInOutStatusLimit] = useState<string>('');

  const GetInOutStatus = async () => {
    try {
      const response = await $api.get<InOutStatusResponse>(
        `/in_out_status/get_limit?limit=${inOutStatusLimit}`
      );
      setInOutStatus(response.data[0]);
      setInOutStatusLimit('');
    } catch (error) {
      console.log('inOutStatus', error);
    }
  };

  return (
    <>
      <TitleOfPages title='Посещения' />

      <div className={styles.search}>
        <Input
          label='Введите количество записей'
          type='number'
          placeholder='Введите количество записей...'
          value={inOutStatusLimit}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInOutStatusLimit(e.target.value)
          }
        />

        <Button text='Получить' onClick={GetInOutStatus} />
      </div>

      {inOutStatus.length > 0 && (
        <Table theadName={tableColumn}>
          {inOutStatus.map((item: InOutStatusObj, index: number) => {
            return (
              <tr key={index}>
                <td>{item.time.replace(/-/g, '.').replace(/[T]/g, ' ')}</td>
                <td>{item.per_id}</td>
                <td>{item.cam_id}</td>
              </tr>
            );
          })}
        </Table>
      )}
    </>
  );
};

export default InOutStatus;
