import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import PersonalInfo from '../components/Pages/PersonalInfo/PersonalInfo';
import InOutStatus from '../components/Pages/InOutStatus/InOutStatus';
import CamerasStatus from '../components/Pages/CamerasStatus/CamerasStatus';
import CabinetsStatus from '../components/Pages/CabinetsStatus/CabinetsStatus';
import Departments from '../components/Pages/Departments';
import UnidentifiedFaces from '../components/Pages/UnidentifiedFaces/UnidentifiedFaces';
import Filter from '../components/Pages/Filter/Filter';

const RoutesList = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='personal-info' element={<PersonalInfo />} />
        <Route path='in-out-status' element={<InOutStatus />} />
        <Route path='cabinets-status' element={<CabinetsStatus />} />
        <Route path='camera-status' element={<CamerasStatus />} />
        <Route path='departments' element={<Departments />} />
        <Route path='unidentified-faces' element={<UnidentifiedFaces />} />
        <Route path='filter' element={<Filter />} />
      </Route>
    </Routes>
  );
};

export default RoutesList;
