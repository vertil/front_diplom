import React, { useState } from 'react';
import $api from '../../../http';
import {
  CabinetsStatusResponse,
  CabinetsStatusPersonIdsResponse,
} from '../../../models/response/CabinetsStatusResponse';
import styles from './CabinetsStatus.module.css';
import TitleOfPages from '../../common/TitleOfPages/TitleOfPages';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Table from '../../common/Table/Table';

const CabinetsStatus = () => {
  const tableColumn: string[] = ['Id кабинета', 'ФИО', 'floor', 'dep id'];
  const [cabinets, setCabinets] = useState<CabinetsStatusResponse[]>([]);
  const [cabinetsId, setCabinetsId] = useState<string>('');
  const [cabinetPers, setCabinetPers] = useState<any>([]);
  const [cabinetPersId, setCabinetPersId] = useState<string>('');

  const GetCabinetsAll = async () => {
    try {
      const response = await $api.get<CabinetsStatusResponse[]>(
        '/cabinets/get_all'
      );
      setCabinets(response.data);
    } catch (error) {
      console.log('GetCabinetsAll', error);
    }
  };

  const GetCabinetsStatus = async () => {
    try {
      const response = await $api.get<CabinetsStatusResponse[]>(
        `/cabinets/get_cab?cabinet_id=${cabinetsId}`
      );

      if (response.data[0] === null) {
        setCabinets([]);
      } else {
        setCabinets(response.data);
      }
      setCabinetsId('');
    } catch (error) {
      console.log('GetCabinetsStatus', error);
    }
  };

  const GetCabinetPersId = async () => {
    try {
      const response = await $api.get<CabinetsStatusPersonIdsResponse[]>(
        `/cabinets/get_cabinet_per_ids?cabinet_id=${cabinetPersId}`
      );

      if (response.data === null) {
        setCabinetPers([]);
      } else {
        setCabinetPers(response.data);
        setCabinetPersId('');
      }

      setCabinetPersId('');
    } catch (error) {
      setCabinetPers([]);
      setCabinetPersId('');
      console.log('GetCabinetPersId', error);
    }
  };

  return (
    <>
      <TitleOfPages title='Cabinets Status' />

      <Button text='Получить всё' onClick={GetCabinetsAll} />

      <div className={styles.search}>
        <Input
          label='Введите id кибинета'
          type='number'
          placeholder='Введите id кибинета...'
          value={cabinetsId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCabinetsId(e.target.value)
          }
        />

        <Button text='Получить кабинет' onClick={GetCabinetsStatus} />
      </div>

      {cabinets.length > 0 && (
        <Table theadName={tableColumn}>
          {cabinets.map((item: CabinetsStatusResponse, index: number) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.floor}</td>
                <td>{item.dep_id}</td>
              </tr>
            );
          })}
        </Table>
      )}

      <div className={styles.search}>
        <Input
          label='Введите id персонала'
          type='number'
          placeholder='Введите id персонала...'
          value={cabinetPersId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCabinetPersId(e.target.value)
          }
        />

        <Button text='Получить' onClick={GetCabinetPersId} />
      </div>

      <div className={styles.list}>
        {cabinetPers?.pers_ids?.map((item: number, index: number) => {
          return <p key={index}>{item};</p>;
        })}
      </div>
    </>
  );
};

export default CabinetsStatus;
