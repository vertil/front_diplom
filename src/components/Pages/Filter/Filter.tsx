import React, { useState } from 'react';
import $api from '../../../http';
import styles from './Filter.module.css';
import TitleOfPages from '../../common/TitleOfPages/TitleOfPages';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Table from '../../common/Table/Table';

const Filter = () => {
  const workerDayVisitsColumn = ['Datetime', 'Cabinet number', 'Direction'];
  const workerDayVisitsColumn2 = ['Cabinet id', 'Total time'];
  const workerDayVisitsColumn3 = ['Time', 'Total'];
  const [workerDayVisits, setWorkerDayVisits] = useState<any>([]);
  const [workerDayVisitsDate, setWorkerDayVisitsDate] = useState('');
  const [workerDayVisitsNumber, setWorkerDayVisitsNumber] = useState('');

  const workerDayVisitsPosColumn = ['Datetime', 'Cabinet id'];
  const [workerDayVisitsPos, setWorkerDayVisitsPos] = useState([]);
  const [workerDayVisitsPosDate, setWorkerDayVisitsPosDate] = useState('');
  const [workerDayVisitsPosNumber, setWorkerDayVisitsPosNumber] = useState('');
  const [workerDayVisitsPosBool, setWorkerDayVisitsPosBool] = useState('');

  const cabVisitsColumn = ['Datetime', 'Name', 'direction'];
  const cabVisitsColumn2 = ['Name', 'Time'];
  const [cabVisits, setCabVisits] = useState<any>([]);
  const [cabVisitsDate, setCabVisitsDate] = useState('');
  const [cabVisitsNumber, setCabVisitsNumber] = useState('');

  const cabVisitsPosColumn = ['Datetime', 'Personal id'];
  const [cabVisitsPos, setCabVisitsPos] = useState([]);
  const [cabVisitsPosDate, setCabVisitsPosDate] = useState('');
  const [cabVisitsPosNumber, setCabVisitsPosNumber] = useState('');
  const [cabVisitsPosBool, setCabVisitsPosBool] = useState('');

  const passVisitsColumn = ['Datetime', 'Personal id', 'direction'];
  const [passVisits, setPassVisits] = useState([]);
  const [passVisitsDate, setPassVisitsDate] = useState('');
  const [passVisitsNumber, setPassVisitsNumber] = useState('');
  const [passVisitsPass, setPassVisitsPass] = useState('');

  const passVisitsPosColumn = ['Datetime', 'Personal id'];
  const [passVisitsPos, setPassVisitsPos] = useState([]);
  const [passVisitsPosDate, setPassVisitsPosDate] = useState('');
  const [passVisitsPosNumber, setPassVisitsPosNumber] = useState('');
  const [passVisitsPosPass, setPassVisitsPosPass] = useState('');
  const [passVisitsPosBool, setPassVisitsPosBool] = useState('');

  const formatDuration = (seconds: any) => {
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = `${hours} ч ${minutes} м ${remainingSeconds} с`;

    return formattedTime;
  };

  const GetWorkerDayVisits = async () => {
    setWorkerDayVisitsPos([]);
    setCabVisits([]);
    setCabVisitsPos([]);
    setPassVisits([]);
    setPassVisitsPos([]);

    setWorkerDayVisitsDate(workerDayVisitsDate.split('-').reverse().join(''));

    try {
      const response = await $api.get<any>(
        `/personal/worker_day_visits?personal_id=${workerDayVisitsNumber}&date=${workerDayVisitsDate}`
      );

      setWorkerDayVisits(response.data);
    } catch (error) {
      console.log('GetWorkerDayVisits', error);
    }
  };

  const GetWorkerDayVisitsPos = async () => {
    setWorkerDayVisits([]);
    setCabVisits([]);
    setCabVisitsPos([]);
    setPassVisits([]);
    setPassVisitsPos([]);

    setWorkerDayVisitsPosDate(
      workerDayVisitsPosDate.split('-').reverse().join('')
    );

    try {
      const response = await $api.get<any>(
        `/personal/worker_day_visits_pos?personal_id=${workerDayVisitsPosNumber}&date=${workerDayVisitsPosDate}&pos_boolean=${workerDayVisitsPosBool}`
      );

      setWorkerDayVisitsPos(response.data);
    } catch (error) {
      console.log('GetWorkerDayVisitsPos', error);
    }
  };

  const GetCabVisits = async () => {
    setWorkerDayVisits([]);
    setWorkerDayVisitsPos([]);
    setCabVisitsPos([]);
    setPassVisits([]);
    setPassVisitsPos([]);

    setCabVisitsDate(cabVisitsDate.split('-').reverse().join(''));

    try {
      const response = await $api.get<any>(
        `/cabinets/cab_visits?cab_id=${cabVisitsNumber}&date=${cabVisitsDate}`
      );

      setCabVisits(response.data);
      console.log(response);
    } catch (error) {
      console.log('GetCabVisits', error);
    }
  };

  const GetCabVisitsPos = async () => {
    setWorkerDayVisits([]);
    setWorkerDayVisitsPos([]);
    setCabVisits([]);
    setPassVisits([]);
    setPassVisitsPos([]);

    setCabVisitsPosDate(cabVisitsPosDate.split('-').reverse().join(''));

    try {
      const response = await $api.get<any>(
        `/cabinets/cab_visits_pos?cab_id=${cabVisitsPosNumber}&date=${cabVisitsPosDate}&pos_boolean=${cabVisitsPosBool}`
      );

      setCabVisitsPos(response.data);
    } catch (error) {
      console.log('GetCabVisitsPos', error);
    }
  };

  const GetPassVisits = async () => {
    setWorkerDayVisits([]);
    setWorkerDayVisitsPos([]);
    setCabVisits([]);
    setCabVisitsPos([]);
    setPassVisitsPos([]);
    setPassVisitsDate(passVisitsDate.split('-').reverse().join(''));

    try {
      const response = await $api.get<any>(
        `/cabinets/pass_visits?date=${passVisitsDate}&cab_id=${passVisitsNumber}&pass_num=${passVisitsPass}`
      );

      setPassVisits(response.data);
    } catch (error) {
      console.log('GetPassVisits', error);
    }
  };

  const GetPassVisitsPos = async () => {
    setWorkerDayVisits([]);
    setWorkerDayVisitsPos([]);
    setCabVisits([]);
    setCabVisitsPos([]);
    setPassVisits([]);

    setPassVisitsPosDate(passVisitsPosDate.split('-').reverse().join(''));

    try {
      const response = await $api.get<any>(
        `/cabinets/pass_visits_pos?date=${passVisitsPosDate}&cab_id=${passVisitsPosNumber}&pass_num=${passVisitsPosPass}&pos_boolean=${passVisitsPosBool}`
      );

      setPassVisitsPos(response.data);
    } catch (error) {
      console.log('GetPassVisitsPos', error);
    }
  };

  return (
    <>
      <TitleOfPages title='Filter' />

      <div className={styles.search}>
        <Input
          label='Enter date'
          type='date'
          placeholder='Enter date'
          value={workerDayVisitsDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWorkerDayVisitsDate(e.target.value)
          }
        />

        <Input
          label='Enter person id'
          type='number'
          placeholder='Enter person id'
          value={workerDayVisitsNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWorkerDayVisitsNumber(e.target.value)
          }
        />

        <Button text='Get worker day visits' onClick={GetWorkerDayVisits} />
      </div>

      <div className={styles.search}>
        <Input
          label='Enter date'
          type='date'
          placeholder='Enter date'
          value={workerDayVisitsPosDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWorkerDayVisitsPosDate(e.target.value)
          }
        />

        <Input
          label='Enter person id'
          type='number'
          placeholder='Enter person id'
          value={workerDayVisitsPosNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWorkerDayVisitsPosNumber(e.target.value)
          }
        />

        <select
          value={workerDayVisitsPosBool}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setWorkerDayVisitsPosBool(e.target.value)
          }
        >
          <option value=''>Выберите значение</option>
          <option value='true'>True</option>
          <option value='false'>False</option>
        </select>

        <Button
          text='Get worker day visits pos'
          onClick={GetWorkerDayVisitsPos}
        />
      </div>

      <div className={styles.search}>
        <Input
          label='Enter date'
          type='date'
          placeholder='Enter date'
          value={cabVisitsDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCabVisitsDate(e.target.value)
          }
        />

        <Input
          label='Enter cab id'
          type='number'
          placeholder='Enter cab id'
          value={cabVisitsNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCabVisitsNumber(e.target.value)
          }
        />

        <Button text='Get cab visits' onClick={GetCabVisits} />
      </div>

      <div className={styles.search}>
        <Input
          label='Enter date'
          type='date'
          placeholder='Enter date'
          value={cabVisitsPosDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCabVisitsPosDate(e.target.value)
          }
        />

        <Input
          label='Enter cab id'
          type='number'
          placeholder='Enter cab id'
          value={cabVisitsPosNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCabVisitsPosNumber(e.target.value)
          }
        />

        <select
          value={cabVisitsPosBool}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCabVisitsPosBool(e.target.value)
          }
        >
          <option value=''>Выберите значение</option>
          <option value='true'>True</option>
          <option value='false'>False</option>
        </select>

        <Button text='Get cab visits pos' onClick={GetCabVisitsPos} />
      </div>

      <div className={styles.search}>
        <Input
          label='Enter date'
          type='date'
          placeholder='Enter date'
          value={passVisitsDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassVisitsDate(e.target.value)
          }
        />

        <Input
          label='Enter cab id'
          type='number'
          placeholder='Enter cab id'
          value={passVisitsNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassVisitsNumber(e.target.value)
          }
        />

        <Input
          label='Enter pass'
          type='number'
          placeholder='Enter pass'
          value={passVisitsPass}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassVisitsPass(e.target.value)
          }
        />

        <Button text='Get pass visits' onClick={GetPassVisits} />
      </div>

      <div className={styles.search}>
        <Input
          label='Enter date'
          type='date'
          placeholder='Enter date'
          value={passVisitsPosDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassVisitsPosDate(e.target.value)
          }
        />

        <Input
          label='Enter cab id'
          type='number'
          placeholder='Enter cab id'
          value={passVisitsPosNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassVisitsPosNumber(e.target.value)
          }
        />

        <Input
          label='Enter pass'
          type='number'
          placeholder='Enter pass'
          value={passVisitsPosPass}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassVisitsPosPass(e.target.value)
          }
        />

        <select
          value={passVisitsPosBool}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPassVisitsPosBool(e.target.value)
          }
        >
          <option value=''>Выберите значение</option>
          <option value='true'>True</option>
          <option value='false'>False</option>
        </select>

        <Button text='Get pass visits pos' onClick={GetPassVisitsPos} />
      </div>

      {workerDayVisits.full && (
        <>
          <Table theadName={workerDayVisitsColumn2}>
            {workerDayVisits.short.map((item: any, index: any) => {
              const [number, value] = Object.entries<any>(item)[0];
              return (
                <tr key={index}>
                  <td>{number}</td>
                  <td>{formatDuration(value)}</td>
                </tr>
              );
            })}
          </Table>

          <Table theadName={workerDayVisitsColumn3}>
            {Object.entries<any>(workerDayVisits.times).map(
              ([category, time], index) => (
                <tr key={index}>
                  <td>{category}</td>
                  <td>{formatDuration(time)}</td>
                </tr>
              )
            )}
          </Table>

          <Table theadName={workerDayVisitsColumn}>
            {workerDayVisits.full.map((item: any, index: number) => {
              return (
                <tr key={index}>
                  <td>
                    {item.datetime
                      .replace(/-/g, '.')
                      .replace(/[T]/g, ' ')
                      .replace(/"/g, '')}
                  </td>
                  <td>{item.cab_id}</td>
                  <td>
                    <div
                      style={{
                        backgroundColor: item.direction ? 'green' : 'red',
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
        </>
      )}

      {workerDayVisitsPos.length > 0 && (
        <Table theadName={workerDayVisitsPosColumn}>
          {workerDayVisitsPos.map((item: any, index: number) => {
            return (
              <tr key={index}>
                <td>
                  {item.datetime
                    .replace(/-/g, '.')
                    .replace(/[T]/g, ' ')
                    .replace(/"/g, '')}
                </td>
                <td>{item.cab_id}</td>
              </tr>
            );
          })}
        </Table>
      )}

      {cabVisits.full && (
        <>
          <Table theadName={cabVisitsColumn2}>
            {cabVisits.pers_times.map((item: any, index: any) => {
              const [string, value] = Object.entries<any>(item)[0];
              return (
                <tr key={index}>
                  <td>{string}</td>
                  <td>{formatDuration(value)}</td>
                </tr>
              );
            })}
          </Table>

          <Table theadName={cabVisitsColumn}>
            {cabVisits.full.map((item: any, index: number) => {
              return (
                <tr key={index}>
                  <td>
                    {item.datetime
                      .replace(/-/g, '.')
                      .replace(/[T]/g, ' ')
                      .replace(/"/g, '')}
                  </td>
                  <td>{item.name}</td>
                  <td>
                    <div
                      style={{
                        backgroundColor: item.direction ? 'green' : 'red',
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


        </>
      )}

      {cabVisitsPos.length > 0 && (
        <Table theadName={cabVisitsPosColumn}>
          {cabVisitsPos.map((item: any, index: number) => {
            return (
              <tr key={index}>
                <td>
                  {item.datetime
                    .replace(/-/g, '.')
                    .replace(/[T]/g, ' ')
                    .replace(/"/g, '')}
                </td>
                <td>{item.per_id}</td>
              </tr>
            );
          })}
        </Table>
      )}

      {passVisits.length > 0 && (
        <Table theadName={passVisitsColumn}>
          {passVisits.map((item: any, index: number) => {
            return (
              <tr key={index}>
                <td>
                  {item.datetime
                    .replace(/-/g, '.')
                    .replace(/[T]/g, ' ')
                    .replace(/"/g, '')}
                </td>
                <td>{item.per_id}</td>
                <td>
                  <div
                    style={{
                      backgroundColor: item.direction ? 'green' : 'red',
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

      {passVisitsPos.length > 0 && (
        <Table theadName={passVisitsPosColumn}>
          {passVisitsPos.map((item: any, index: number) => {
            return (
              <tr key={index}>
                <td>
                  {item.datetime
                    .replace(/-/g, '.')
                    .replace(/[T]/g, ' ')
                    .replace(/"/g, '')}
                </td>
                <td>{item.per_id}</td>
              </tr>
            );
          })}
        </Table>
      )}
    </>
  );
};

export default Filter;
