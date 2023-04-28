import { useReducer, createContext } from 'react';
import AppReducer from './app-reducer';

const INIT_STATE = {
	fileData: null,
	headers: ['employe id', 'project id', 'date from', 'date to'],
	headersResult: [
		'employee id 1',
		'employee id 2',
		'project id',
		'days worked',
	],
};

export const GlobalContext = createContext(INIT_STATE);

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, INIT_STATE);

	return (
		<GlobalContext.Provider
			value={{
				fileData: state.fileData,
				headers: state.headers,
				headersResult: state.headersResult,
				dispatch,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
