import React, { useState } from 'react';
import $api from '../../../http';
import styles from './UnidentifiedFaces.module.css';
import TitleOfPages from '../../common/TitleOfPages/TitleOfPages';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Table from '../../common/Table/Table';

const UnidentifiedFaces = () => {
  const tableColumn: string[] = ['timedate', 'cam id', 'file'];

  const [unidentifiedFaces, setUnidentifiedFaces] = useState<any>([]);
  const [unidentifiedFacesId, setUnidentifiedFacesId] = useState<string>('');
  const [unidentifiedFacesPhoto, setUnidentifiedFacesPhoto] =
    useState<string>('');

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
    } catch (error) {
      console.log('camerasStatus', error);
    }
  };

  return (
    <>
      <TitleOfPages title='Unidentified faces' />

      <div className={styles.search}>
        <Input
          label='Enter id'
          type='number'
          placeholder='Show all'
          value={unidentifiedFacesId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUnidentifiedFacesId(e.target.value)
          }
        />

        <Button text='Get' onClick={GetUnidentifiedFaces} />
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
                    text='Get photo'
                    onClick={(e: any) => GetUnidentifiedFacesPhoto(item.time)}
                  />
                </td>
              </tr>
            );
          })}
        </Table>
      )}

      {unidentifiedFacesPhoto && (
        <img
          src={`data:image/png;base64,${unidentifiedFacesPhoto}`}
          alt='img'
        />
      )}
    </>
  );
};

export default UnidentifiedFaces;
