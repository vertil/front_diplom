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
  const [personal, setPersonal] = useState<any>([]);
  const [personId, setPersonId] = useState<string>('');
  const [personPhoto, setPersonPhoto] = useState<string>('');
  const [photo, setPhoto] = useState<any>([]);

  const GetPersonal = async () => {
    if (personId === '') {
      try {
        const response = await $api.get<PersonalInfoResponse[]>(
          '/personal/get_all'
        );
        setPersonal(response.data[0]);
      } catch (error) {
        console.log('personalAll', error);
      }
    } else {
      try {
        const response = await $api.get<PersonalInfoResponse[]>(
          `/personal/get_user?personal_id=${personId}`
        );

        if (response.data[0] === null) {
          setPersonal([]);
        } else {
          setPersonal(response.data);
        }
      } catch (error) {
        console.log('personalId', error);
      }
    }
  };

  const GetPhoto = async () => {
    try {
      const response = await $api.get<any>(
        `/personal/get_single_faces?face_id=${personPhoto}`
      );

      setPhoto(response.data);
      console.log(response);
    } catch (error) {
      console.log('personalPhoto', error);
    }
  };

  return (
    <>
      <TitleOfPages title='Personal info' />

      <div className={styles.search}>
        <Input
          label='Enter person id'
          type='number'
          placeholder='Show all'
          value={personId}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPersonId(e.target.value)
          }
        />

        <Button text='Get' onClick={GetPersonal} />
      </div>

      <div className={styles.search}>
        <Input
          label='Enter id'
          type='number'
          placeholder='Enter id...'
          value={personPhoto}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPersonPhoto(e.target.value)
          }
        />

        <Button text='Get photo' onClick={GetPhoto} />
      </div>

      {personal.length > 0 && (
        <Table theadName={tableColumn}>
          {personal.map((item: PersonalInfoResponse, index: number) => {
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

      {/* <img
        src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAATSURBVBhXY3gro/IfGRMSUPkPAJd1GhFv9aMbAAAAAElFTkSuQmCC`}
        alt=''
      />*/}
      <img src={`data:image/png;base64,${photo}`} alt='' />
    </>
  );
};

export default PersonalInfo;
