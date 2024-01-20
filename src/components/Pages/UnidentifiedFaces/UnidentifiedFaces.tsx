import React, { useState } from 'react';
import $api from '../../../http';
import styles from './UnidentifiedFaces.module.css';
import TitleOfPages from '../../common/TitleOfPages/TitleOfPages';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Table from '../../common/Table/Table';
import ModalWindow from '../../common/ModalWindow/ModalWindow';

const UnidentifiedFaces = () => {
  const tableColumn: string[] = ['Дата и время', 'Id камеры', 'Фото'];
  const [unidentifiedFaces, setUnidentifiedFaces] = useState<any>([]);
  const [unidentifiedFacesId, setUnidentifiedFacesId] = useState<string>('');
  const [unidentifiedFacesPhoto, setUnidentifiedFacesPhoto] =
    useState<string>('');

  const [modalWindowPhoto, setModalWindowPhoto] = useState<boolean>(false);

  const GetUnidentifiedFaces = async () => {
    try {
      const response = await $api.get<any>(
        `/un_def_faces/get_limit?limit=${unidentifiedFacesId}`
      );

      setUnidentifiedFaces(response.data);
      console.log(response);
    } catch (error) {
      console.log('camerasStatus', error);
    }
  };

  const GetUnidentifiedFacesPhoto = async (time: string) => {
    try {
      const response = await $api.get<any>(
        `/un_def_faces/get_by_timestamp?timestamp=${time}`
      );
      setUnidentifiedFacesPhoto(response.data);
      setModalWindowPhoto(true);
    } catch (error) {
      console.log('camerasStatus', error);
    }
  };

  return (
    <>
      <TitleOfPages title='Неопознанные лица' />

      <div className={styles.search}>
        <Input
          label='Введите количество'
          type='number'
          placeholder='Введите количество...'
          value={unidentifiedFacesId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUnidentifiedFacesId(e.target.value)
          }
        />

        <Button text='Получить' onClick={GetUnidentifiedFaces} />
      </div>

      {unidentifiedFaces.length > 0 && (
        <Table theadName={tableColumn}>
          {unidentifiedFaces.map((item: any, index: number) => {
            return (
              <tr key={index}>
                <td>{item.time}</td>
                <td>{item.cam_id}</td>
                <td>
                  <Button
                    text='Показать фото'
                    onClick={(e: any) => GetUnidentifiedFacesPhoto(item.time)}
                  />
                </td>
              </tr>
            );
          })}
        </Table>
      )}

      <ModalWindow
        active={modalWindowPhoto}
        setActive={() => setModalWindowPhoto(!modalWindowPhoto)}
      >
        <div className={styles.images}>
          <div>
            <img
              src={`data:image/png;base64,${unidentifiedFacesPhoto}`}
              alt='img'
            />
          </div>
        </div>
      </ModalWindow>
    </>
  );
};

export default UnidentifiedFaces;
