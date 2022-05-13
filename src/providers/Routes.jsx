import React from 'react';

import CalibrationPage from "../pages/calibration";
import LoginPage from "../pages/login";
import Layout from "../pages/layout";

const routes = [
	{
		path: '/',
		title: 'Entrar',
		component: () => (<LoginPage />),
		privated: false,
	}, {
		path: 'calibration',
		title: 'CalibrationPage',
		component: () => (<CalibrationPage />),
		privated: true,
	}, {
		path: 'layout',
		title: 'Layout',
		component: () => (<Layout />),
		privated: true,
	},
];


export default routes;