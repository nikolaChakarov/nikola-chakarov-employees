import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../src/components/navigation/navigation';
import Home from './components/home/home';
import AllData from './components/all-data/all-data';
import Result from './components/result/result';
import Footer from '../src/components/footer/Footer';

const App = () => {
	return (
		<AppContainer className='app-container'>
			<Routes>
				<Route path='/' element={<Navigation />}>
					<Route index element={<Home />} />
					<Route path='all-data' element={<AllData />} />
					<Route path='result' element={<Result />} />
				</Route>
			</Routes>

			<Footer />
		</AppContainer>
	);
};

const AppContainer = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
`;

export default App;
