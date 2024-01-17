import React, { useEffect, useState } from 'react';
import $api from '../../../http';
import styles from './Filter.module.css';
import TitleOfPages from '../../common/TitleOfPages/TitleOfPages';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Table from '../../common/Table/Table';

const Filter = () => {
  const workerDayVisitsColumn = ['Время', 'Помещение', 'Направление'];
  const workerDayVisitsColumn2 = [
    'Номер кабинета',
    'проведённое время за день',
  ];
  const workerDayVisitsColumn3 = ['Тип времени', 'время'];
  const [workerDayVisits, setWorkerDayVisits] = useState<any>([]);
  const [workerDayVisits2, setWorkerDayVisits2] = useState<any>([]);
  const [workerDayVisitsDate, setWorkerDayVisitsDate] = useState('');
  const [workerDayVisitsNumber, setWorkerDayVisitsNumber] = useState('');

  const workerDayVisitsPosColumn = ['Время', 'Помещение'];
  const [workerDayVisitsPos, setWorkerDayVisitsPos] = useState([]);
  const [workerDayVisitsPosDate, setWorkerDayVisitsPosDate] = useState('');
  const [workerDayVisitsPosNumber, setWorkerDayVisitsPosNumber] = useState('');
  const [workerDayVisitsPosBool, setWorkerDayVisitsPosBool] = useState('');

  const cabVisitsColumn = ['Время', 'ФИО', 'Направление'];
  const cabVisitsColumn2 = ['ФИО', 'общее время'];
  const [cabVisits, setCabVisits] = useState<any>([]);
  const [cabVisits2, setCabVisits2] = useState<any>([]);
  const [cabVisitsDate, setCabVisitsDate] = useState('');
  const [cabVisitsNumber, setCabVisitsNumber] = useState('');

  const cabVisitsPosColumn = ['Время', 'ФИО'];
  const [cabVisitsPos, setCabVisitsPos] = useState([]);
  const [cabVisitsPosDate, setCabVisitsPosDate] = useState('');
  const [cabVisitsPosNumber, setCabVisitsPosNumber] = useState('');
  const [cabVisitsPosBool, setCabVisitsPosBool] = useState('');

  const passVisitsColumn = ['Время', 'ФИО', 'Направление'];
  const [passVisits, setPassVisits] = useState([]);
  const [passVisits2, setPassVisits2] = useState([]);
  const [passVisitsDate, setPassVisitsDate] = useState('');
  const [passVisitsNumber, setPassVisitsNumber] = useState('');
  const [passVisitsPass, setPassVisitsPass] = useState('');

  const passVisitsPosColumn = ['Время', 'ФИО'];
  const [passVisitsPos, setPassVisitsPos] = useState([]);
  const [passVisitsPosDate, setPassVisitsPosDate] = useState('');
  const [passVisitsPosNumber, setPassVisitsPosNumber] = useState('');
  const [passVisitsPosPass, setPassVisitsPosPass] = useState('');
  const [passVisitsPosBool, setPassVisitsPosBool] = useState('');

  useEffect(() => {
    const GetWorkerDayVisits2 = async () => {
      try {
        const response = await $api.get<any>(`/personal/get_pers_names`);

        setWorkerDayVisits2(response.data);
      } catch (error) {
        console.log('GetWorkerDayVisits', error);
      }
    };
    GetWorkerDayVisits2();

    const GetCabsNames = async () => {
      try {
        const response = await $api.get<any>(`/cabinets/get_cabs_names`);

        setCabVisits2(response.data);
      } catch (error) {
        console.log('GetCabsNames', error);
      }
    };
    GetCabsNames();

    const GetCabsPas = async () => {
      try {
        const response = await $api.get<any>(`/cabinets/get_cabs_passages`);

        setPassVisits2(response.data);
      } catch (error) {
        console.log('GetCabsPas', error);
      }
    };
    GetCabsPas();
  }, []);

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

      <p>Отчёты по работникам</p>
      <br></br>

      <pre>Отчёт по посещениям работником кабинетов</pre>

      <div className={styles.search}>
        <Input
          label='Выберите дату'
          type='date'
          placeholder='Enter date'
          value={workerDayVisitsDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWorkerDayVisitsDate(e.target.value)
          }
        />

        <select
          value={workerDayVisitsNumber}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setWorkerDayVisitsNumber(e.target.value)
          }
        >
          <option value=''>Выберите id персонала</option>
          {Object.entries<any>(workerDayVisits2).map(([id, fullName]) => {
            return (
              <option key={id} value={id}>
                {fullName}
              </option>
            );
          })}
        </select>
        {/* <Input
          label='Enter person id'
          type='number'
          placeholder='Enter person id'
          value={workerDayVisitsNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWorkerDayVisitsNumber(e.target.value)
          }
        /> */}
        {/* <label>
            Выберите работника
            <br></br>
            <input list="browsers" name="myBrowser"  size={50}/>  
        </label>   
        <datalist id="browsers">
            <option value="Вертинский Кирилл Геннадьевич" />
            <option value="Иванов Иван Иваныч" />
            <option value="Петров Пётр Петрович" />            
          
        </datalist>
        
        <br></br> */}

        <Button text='Получить отчёт' onClick={GetWorkerDayVisits} />
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <br></br>
      <pre>
        Отчёт по посещениям работником кабинетов в зависимости от направления
      </pre>

      <div className={styles.search}>
        <Input
          label='Выберите дату'
          type='date'
          placeholder='Enter date'
          value={workerDayVisitsPosDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWorkerDayVisitsPosDate(e.target.value)
          }
        />

        {/* <label>
            Выберите работника
            <br></br>
            <input list="browsers" name="myBrowser"  size={50}/>  
        </label>   
        <datalist id="browsers">
            <option value="Вертинский Кирилл Геннадьевич" />
            <option value="Иванов Иван Иваныч" />
            <option value="Петров Пётр Петрович" />            
          
        </datalist>       
        <br></br> */}

        {/* <Input
          label='Enter person id'
          type='number'
          placeholder='Enter person id'
          value={workerDayVisitsPosNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWorkerDayVisitsPosNumber(e.target.value)
          }
        /> */}

        <select
          value={workerDayVisitsPosNumber}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setWorkerDayVisitsPosNumber(e.target.value)
          }
        >
          <option value=''>Выберите id персонала</option>
          {Object.entries<any>(workerDayVisits2).map(([id, fullName]) => {
            return (
              <option key={id} value={id}>
                {fullName}
              </option>
            );
          })}
        </select>

        <select
          value={workerDayVisitsPosBool}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setWorkerDayVisitsPosBool(e.target.value)
          }
        >
          <option value=''>Выберите значение</option>
          <option value='true'>В помещение</option>
          <option value='false'>Из помещения</option>
        </select>

        <br></br>

        <Button text='Получить отчёт' onClick={GetWorkerDayVisitsPos} />
      </div>
      <br></br>
      <hr></hr>
      <p>Отчёты по кабинетам</p>
      <br></br>
      <pre>Отчёт по посещениям кабинета</pre>

      <div className={styles.search}>
        <Input
          label='Выберите дату'
          type='date'
          placeholder='Enter date'
          value={cabVisitsDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCabVisitsDate(e.target.value)
          }
        />

        <select
          value={cabVisitsNumber}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCabVisitsNumber(e.target.value)
          }
        >
          <option value=''>Выберите каб</option>
          {Object.entries<any>(cabVisits2).map(([id, fullName]) => {
            return (
              <option key={id} value={id}>
                {fullName}
              </option>
            );
          })}
        </select>

        <Button text='Получить отчёт' onClick={GetCabVisits} />
      </div>

      <br></br>

      <pre>
        Отчёт по посещению кабинета в зависимости от направления движения
      </pre>

      <div className={styles.search}>
        <Input
          label='Выберите дату'
          type='date'
          placeholder='Enter date'
          value={cabVisitsPosDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCabVisitsPosDate(e.target.value)
          }
        />

        <select
          value={cabVisitsPosNumber}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCabVisitsPosNumber(e.target.value)
          }
        >
          <option value=''>Выберите каб</option>
          {Object.entries<any>(cabVisits2).map(([id, fullName]) => {
            return (
              <option key={id} value={id}>
                {fullName}
              </option>
            );
          })}
        </select>

        <select
          value={cabVisitsPosBool}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCabVisitsPosBool(e.target.value)
          }
        >
          <option value=''>Выберите значение</option>
          <option value='true'>В помещение</option>
          <option value='false'>Из помещения</option>
        </select>
        <br></br>
        <Button text='Получить отчёт' onClick={GetCabVisitsPos} />
      </div>

      <br></br>
      <hr></hr>
      <p>Отчёты по проходам</p>
      <br></br>
      <pre>Отчёт по прохождению через проход кабинета</pre>

      <div className={styles.search}>
        <Input
          label='Выберите дату'
          type='date'
          placeholder='Enter date'
          value={passVisitsDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassVisitsDate(e.target.value)
          }
        />

        {/* <Input
          label='Введите номер кабинета'
          type='number'
          placeholder='Введите номер кабинета'
          value={passVisitsNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassVisitsNumber(e.target.value)
          }
        /> */}

        <select
          value={passVisitsNumber}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPassVisitsNumber(e.target.value)
          }
        >
          <option value=''>Выберите каб</option>
          {Object.entries<any>(passVisits2).map(([id, fullName]) => {
            return (
              <option key={id} value={id}>
                {id}
              </option>
            );
          })}
        </select>

        <select
          value={passVisitsPass}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPassVisitsPass(e.target.value)
          }
        >
          <option value=''>Выберите проход</option>

          {Object.entries<Record<string, any>>(passVisits2).map(
            ([id, fullName]) => {
              if (id === passVisitsNumber) {
                const arr = [];
                for (let index: any = 1; index <= fullName; index++) {
                  arr.push(index);
                }
                return arr.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ));
              }
              return null;
            }
          )}
        </select>

        <Button text='Получить отчёт' onClick={GetPassVisits} />
      </div>

      <br></br>
      <pre>
        Отчёт по прохождению через проход кабинета в зависимости от направления
      </pre>

      <div className={styles.search}>
        <Input
          label='Выберите дату'
          type='date'
          placeholder='Enter date'
          value={passVisitsPosDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassVisitsPosDate(e.target.value)
          }
        />
        <select
          value={passVisitsPosNumber}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPassVisitsPosNumber(e.target.value)
          }
        >
          <option value=''>Выберите каб</option>
          {Object.entries<any>(passVisits2).map(([id, fullName]) => {
            return (
              <option key={id} value={id}>
                {id}
              </option>
            );
          })}
        </select>

        <select
          value={passVisitsPosPass}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPassVisitsPosPass(e.target.value)
          }
        >
          <option value=''>Выберите проход</option>

          {Object.entries<Record<string, any>>(passVisits2).map(
            ([id, fullName]) => {
              if (id === passVisitsPosNumber) {
                const arr = [];
                for (let index: any = 1; index <= fullName; index++) {
                  arr.push(index);
                }
                return arr.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ));
              }
              return null;
            }
          )}
        </select>
        {/* <Input
          label='Введите номер кабинета'
          type='number'
          placeholder='Введите номер кабинета'
          value={passVisitsPosNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassVisitsPosNumber(e.target.value)
          }
        /> */}
        {/* <Input
          label='Введите номер прохода'
          type='number'
          placeholder='Введите номер прохода'
          value={passVisitsPosPass}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassVisitsPosPass(e.target.value)
          }
        /> */}
        <select
          value={passVisitsPosBool}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPassVisitsPosBool(e.target.value)
          }
        >
          <option value=''>Выберите значение</option>
          <option value='true'>В помещение</option>
          <option value='false'>Из помещения</option>
        </select>
        <br></br>
        <Button text='Получить отчёт' onClick={GetPassVisitsPos} />
      </div>

      <br></br>
      <br></br>
      <br></br>

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
          {cabVisitsPos.map((item: any, index: any) => {
            return (
              <tr key={index}>
                <td>
                  {item.datetime
                    .replace(/-/g, '.')
                    .replace(/[T]/g, ' ')
                    .replace(/"/g, '')}
                </td>
                <td>{item.name}</td>
              </tr>
            );
          })}
        </Table>
      )}

      {passVisits.length > 0 && (
        <Table theadName={passVisitsColumn}>
          {passVisits.map((item: any, index: any) => {
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
                <td>{item.name}</td>
              </tr>
            );
          })}
        </Table>
      )}
    </>
  );
};

export default Filter;
