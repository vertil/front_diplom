import React, { useState } from 'react';
import $api from '../../../http';
import {
  Cameras,
  CamerasStatusResponse,
} from '../../../models/response/CamerasStatusResponse';
import styles from './CamerasStatus.module.css';
import TitleOfPages from '../../common/TitleOfPages/TitleOfPages';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Table from '../../common/Table/Table';

const CamerasStatus = () => {
  const tableColumn: string[] = [
    'Id камеры',
    'Модель камеры',
    'Ip адрес',
    'Id кабинета',
    'В кабинет',
    'Номер прохода',
    'Статус',
  ];
  const [cameras, setCameras] = useState<Cameras[]>([]);
  const [camerasId, setCamerasId] = useState<string>('');

  const GetCamerasAll = async () => {
    try {
      const response = await $api.get<CamerasStatusResponse>(
        '/cameras/get_all'
      );
      const resp = response.data[0];
      setCameras(resp);
    } catch (error) {
      console.log('GetCamerasAll', error);
    }
  };

  const GetCamerasStatus = async () => {
    try {
      const response = await $api.get<Cameras[]>(
        `/cameras/get_one?cam_id=${camerasId}`
      );

      if (response.data === null) {
        setCameras([]);
      } else {
        setCameras(response.data);
      }

      setCamerasId('');
    } catch (error) {
      console.log('GetCamerasStatus', error);
    }
  };

  return (
    <>
      <TitleOfPages title='Камеры' />

      <Button text='Получить все' onClick={GetCamerasAll} />

      <div className={styles.search}>
        <Input
          label='Введите id камеры'
          type='number'
          placeholder='Введите id камеры...'
          value={camerasId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCamerasId(e.target.value)
          }
        />

        <Button text='Получить камеру' onClick={GetCamerasStatus} />
      </div>

      {cameras.length > 0 && (
        <Table theadName={tableColumn}>
          {cameras.map((item: Cameras, index: number) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.cam_model}</td>
                <td>{item.addr}</td>
                <td>{item.cab_id}</td>
                <td>
                  <div
                    style={{
                      backgroundColor: item.in_pos ? 'green' : 'red',
                      width: '1rem',
                      height: '1rem',
                      margin: '0 auto',
                      borderRadius: '50%',
                    }}
                  ></div>
                </td>
                <td>{item.pass_num}</td>
                <td>
                  <div
                    style={{
                      backgroundColor: item.status ? 'green' : 'red',
                      width: '1rem',
                      height: '1rem',
                      margin: '0 auto',
                      borderRadius: '50%',
                    }}
                  ></div>
                </td>
              </tr>
            );
          })}
        </Table>
      )}
    </>
  );
};

export default CamerasStatus;
