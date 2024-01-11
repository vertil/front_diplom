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
  const tableColumn: string[] = [
    'id cab',
    'name',
    'floor',
    'dep id',
    // 'in pos',
    // 'pass num',
    // 'status',
  ];
  const [cabinets, setCabinets] = useState<CabinetsStatusResponse[]>([]);
  const [cabinetsId, setCabinetsId] = useState<string>('');
  const [cabinetPers, setCabinetPers] =
    useState<CabinetsStatusPersonIdsResponse>();
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
    } catch (error) {
      console.log('GetCabinetsStatus', error);
    }
  };

  const GetCabinetPersId = async () => {
    try {
      const response = await $api.get<CabinetsStatusPersonIdsResponse>(
        `/cabinets/get_cabinet_per_ids?cabinet_id=${cabinetPersId}`
      );

      setCabinetPers(response.data);
    } catch (error) {
      console.log('GetCabinetPersId', error);
    }
  };

  return (
    <>
      <TitleOfPages title='Cabinets Status' />

      <Button text='Get all' onClick={GetCabinetsAll} />

      <div className={styles.search}>
        <Input
          label='Enter cabinet id'
          type='number'
          placeholder='Enter cabinet id'
          value={cabinetsId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCabinetsId(e.target.value)
          }
        />

        <Button text='Get Cabinets Status' onClick={GetCabinetsStatus} />
      </div>

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

      <div className={styles.search}>
        <Input
          label='Enter personal id'
          type='number'
          placeholder='Show all personal id'
          value={cabinetPersId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCabinetPersId(e.target.value)
          }
        />

        <Button text='GetCabinetPersId' onClick={GetCabinetPersId} />
      </div>

      {cabinetPers?.pers_ids.map((item: number, index: number) => {
        return <p key={index}>{item}</p>;
      })}
    </>
  );
};

export default CabinetsStatus;
