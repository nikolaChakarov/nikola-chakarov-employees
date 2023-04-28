import { useContext } from 'react';
import { GlobalContext } from '../../context/app-state';
import styled from 'styled-components';
import Papa from 'papaparse';

const Home = () => {
	const { dispatch, fileData } = useContext(GlobalContext);

	const handleFileChange = (ev) => {
		const currentFile = ev.target.files[0];

		Papa.parse(currentFile, {
			skipEmptyLines: true,
			complete: (res) => updateFileInfo(res),
		});
	};

	const updateFileInfo = (fileInfo) => {
		dispatch({
			type: 'UPDATE_INFO',
			payload: fileInfo.data,
		});
	};

	return (
		<HomeContainer className='home-container'>
			<label className='custom-file-upload'>
				<input type='file' accept='.csv' onChange={handleFileChange} />
				Upload Your File
			</label>

			{fileData && (
				<div>
					<p className='ready'>
						...the <span>result</span> and the <span>data</span> are
						ready... <span>open the menu and have a look</span>
					</p>

					<div className='clear-btn'>
						<button onClick={() => dispatch({ type: 'CLEAR' })}>
							clear data
						</button>
					</div>
				</div>
			)}
		</HomeContainer>
	);
};

const HomeContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	input[type='file'] {
		display: none;
	}

	.custom-file-upload {
		border-radius: 0.3rem;
		display: inline-block;
		padding: 1.5rem 2.5rem;
		background: var(--main-color);
		color: #fff;
		text-transform: uppercase;
		cursor: pointer;
		&:hover {
			transform: scale(1.05);
		}
	}

	.clear-btn {
		display: flex;
		justify-content: center;

		button {
			padding: 0.5rem 1rem;
			border: 0.1rem solid var(--main-color);
			border-radius: 0.3rem;
			background: transparent;
			color: #777;
			text-transform: uppercase;
			font-size: 1.2rem;

			&:hover {
				transform: scale(1.05);
			}
		}
	}

	.ready {
		padding: 3rem;
		text-align: center;
		line-height: 1.5;
		animation: myAnim 2s ease 0s infinite normal backwards;

		span {
			font-weight: bold;
		}
	}

	@keyframes myAnim {
		0% {
			opacity: 1;
		}

		50% {
			opacity: 0.2;
		}

		100% {
			opacity: 1;
		}
	}
`;

export default Home;
