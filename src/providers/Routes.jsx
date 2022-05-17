import React from 'react';

import LoginPage from "../pages/login";
import Layout from "../pages/layout";
import CalibrationHistoryPage from '../pages/calibration-history';
import DevicesPage from '../pages/devices';
import PageNotFound from '../pages/pageNotFound';

const routes = [
	{
		path: '/',
		title: 'Entrar',
		component: () => (<LoginPage />),
		privated: false,
	}, {
		path: 'calibracao/historico',
		title: 'Historico de calibracao',
		component: () => (<CalibrationHistoryPage />),
		privated: true,
	}, {
		path: 'calibracao/instrumentos',
		title: 'Dispositivos calibrados',
		component: () => (<DevicesPage />),
		privated: true,
	}, {
		path: 'layout',
		title: 'Layout',
		component: () => (<Layout />),
		privated: true,
	}, {
		path: '*',
		title: 'Pagina não encontrada',
		component: () => (<PageNotFound />),
		privated: true,
	}
];


export default routes;