import React from 'react';

import LoginPage from "../pages/login";
import SignUp from "../pages/signUp";
import Layout from "../pages/layout";
import CalibrationHistoryPage from '../pages/calibration-history';
import DevicesPage from '../pages/devices';
import PageNotFound from '../pages/pageNotFound';

export const pathRoutes = {
	LOGIN: '/',
	SIGN_UP: '/signUp',
	HISTORICAL_CALIBRATION: '/calibracao/historico',
	CALIBRATION_INSTRUMENTS: '/calibracao/instrumentos',
	LAYOUT: '/layout',
}


const routes = [{
	path: pathRoutes.LOGIN,
	title: 'Entrar',
	component: () => (<LoginPage />),
	privated: false,
}, {
	path: pathRoutes.SIGN_UP,
	title: 'Registrar-se',
	component: () => (<SignUp />),
	privated: false,
}, {
	path: pathRoutes.HISTORICAL_CALIBRATION,
	title: 'Historico de calibracao',
	component: () => (<CalibrationHistoryPage />),
	privated: true,
}, {
	path: pathRoutes.CALIBRATION_INSTRUMENTS,
	title: 'Dispositivos calibrados',
	component: () => (<DevicesPage />),
	privated: true,
}, {
	path: pathRoutes.LAYOUT,
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