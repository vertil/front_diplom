import React, { ChangeEvent, useEffect, useState } from 'react';
import $api from '../../../http';
import {
  PersonalInfoResponse,
  PersonalPhotoResponse,
} from '../../../models/response/PersonalInfoResponse';
import styles from './PersonalInfo.module.css';
import Table from '../../common/Table/Table';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import TitleOfPages from '../../common/TitleOfPages/TitleOfPages';

const PersonalInfo = () => {
  const tableColumn: string[] = ['id pers', 'name', 'dep id'];

  const [personalList, setPersonalList] = useState<any>([]);
  const [personId, setPersonId] = useState<string>('');

  const [personIdPhotoList, setPersonIdPhotoList] = useState<any>([]);
  const [personIdPhoto, setPersonIdPhoto] = useState<string>('');
  const [photoList, setPhotoList] = useState<any>([]);

  const [personPhoto, setPersonPhoto] = useState<string>('');
  const [photoId, setPhotoId] = useState<string>('');

  const GetPersonalAll = async () => {
    try {
      const response = await $api.get<PersonalInfoResponse[]>(
        '/personal/get_all'
      );
      setPersonalList(response.data[0]);
    } catch (error) {
      console.log('GetPersonalAll', error);
    }
  };

  const GetPersonal = async () => {
    try {
      const response = await $api.get<PersonalInfoResponse[]>(
        `/personal/get_user?personal_id=${personId}`
      );

      if (response.data[0] === null) {
        setPersonalList([]);
      } else {
        setPersonalList(response.data);
      }
    } catch (error) {
      console.log('GetPersonal', error);
    }
  };

  const GetListPhotos = async () => {
    try {
      const response = await $api.get<any>(
        `/personal/get_personal_faces_ids?personal_id=${personIdPhoto}`
      );

      setPersonIdPhotoList(response.data);
    } catch (error) {
      console.log('GetListPhotos', error);
    }
  };

  const GetPhotoAll = async () => {
    try {
      const newPhotoList: any = [];

      await Promise.all(
        personIdPhotoList?.image_id?.map(async (item: any, index: number) => {
          console.log(item);

          const response = await $api.get<any>(
            `/personal/get_single_faces?face_id=${item}`
          );
          console.log(response);
          newPhotoList.push(response.data);
        })
      );
      setPhotoList(newPhotoList);
    } catch (error) {
      console.log('GetPhotoAll', error);
    }
  };

  const GetPhoto = async () => {
    try {
      const response = await $api.get<any>(
        `/personal/get_single_faces?face_id=${photoId}`
      );

      setPersonPhoto(response.data);
    } catch (error) {
      console.log('GetPhoto', error);
    }
  };

  return (
    <>
      <TitleOfPages title='Personal info' />

      <Button text='Get personal all' onClick={GetPersonalAll} />

      <div className={styles.search}>
        <Input
          label='Enter person id'
          type='number'
          placeholder='Enter person id...'
          value={personId}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPersonId(e.target.value)
          }
        />

        <Button text='Get personal' onClick={GetPersonal} />
      </div>

      {personalList.length > 0 && (
        <Table theadName={tableColumn}>
          {personalList.map((item: PersonalInfoResponse, index: number) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>
                  {item.first_name} {item.last_name} {item.father_name}
                </td>
                <td>dep id {item.dep_id}</td>
              </tr>
            );
          })}
        </Table>
      )}

      <div className={styles.search}>
        <Input
          label='Enter personal id'
          type='number'
          placeholder='Enter personal id...'
          value={personIdPhoto}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPersonIdPhoto(e.target.value)
          }
        />

        <Button text='Get list photos' onClick={GetListPhotos} />

        {personIdPhotoList?.image_id && (
          <Button text='Get photos all' onClick={GetPhotoAll} />
        )}
      </div>

      {personIdPhotoList?.image_id?.map((item: any, index: number) => {
        return <p key={index}>{item} </p>;
      })}

      {photoList.map((item: any, index: number) => {
        return (
          <img key={index} src={`data:image/png;base64,${item}`} alt='img' />
        );
      })}

      <div className={styles.search}>
        <Input
          label='Enter photo id'
          type='number'
          placeholder='Show all photos or enter photo id...'
          value={photoId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPhotoId(e.target.value)
          }
        />

        <Button text='Get photo' onClick={GetPhoto} />
      </div>

      {personPhoto && (
        <img src={`data:image/png;base64,${personPhoto}`} alt='img' />
      )}
    </>
  );
};

export default PersonalInfo;
