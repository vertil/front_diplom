import React, { useEffect, useState } from 'react';
import $api from '../../../http';
import { InOutStatusResponse } from '../../../models/response/InOutStatus';
import { CabinetsStatusResponse } from '../../../models/response/CabinetsStatusResponse';
import styles from './InOutStatus.module.css';
import TitleOfPages from '../../common/TitleOfPages/TitleOfPages';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Table from '../../common/Table/Table';

const InOutStatus = () => {
  const tableColumn: string[] = [
    // 'id',
    'timedate',
    // 'direction',
    'per id',
    'cab id',
    // 'cam id',
  ];
  const [inOutStatus, setInOutStatus] = useState<any>([]);
  const [inOutStatusLimit, setInOutStatusLimit] = useState<any>('');
  const [cabinetsList, setCabinetsList] = useState<any>([]);

  const GetInOutStatus = async () => {
    if (inOutStatusLimit !== '') {
      try {
        const response = await $api.get<InOutStatusResponse[]>(
          `/in_out_status/get_limit?limit=${inOutStatusLimit}`
        );
        setInOutStatus(response.data[0]);
      } catch (error) {
        console.log('inOutStatus', error);
      }
    }

    // try {
    //   const response = await $api.get<CabinetsStatusResponse[]>(
    //     '/cabinets/get_all'
    //   );
    //   setCabinetsList(response.data[0]);
    // } catch (error) {
    //   console.log('cabinetsList', error);
    // }
  };

  return (
    <>
      <TitleOfPages title='In-out Status' />

      <div className={styles.search}>
        <Input
          label='Enter id'
          type='number'
          placeholder='Show all'
          value={inOutStatusLimit}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInOutStatusLimit(e.target.value)
          }
          error=''
        />

        <Button text='Get' onClick={GetInOutStatus} />
      </div>

      {/* <p>List of cabinets</p>
      {cabinetsList.map((item: any, index: number) => {
        return <p key={index}>{item.name}</p>;
      })} */}

      <Table theadName={tableColumn}>
        {inOutStatus.map((item: InOutStatusResponse, index: number) => {
          return (
            <tr key={index}>
              <td>{item.time.replace(/-/g, '.').replace(/[T]/g, ' ')}</td>
              <td>{item.per_id}</td>
              <td>{item.cam_id}</td>
            </tr>
          );
        })}
      </Table>
    </>
  );
};

export default InOutStatus;
