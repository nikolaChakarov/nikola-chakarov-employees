import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/app-state';
import { getResult } from './helper';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';

const Result = () => {
	const { fileData, headersResult } = useContext(GlobalContext);
	const [sortedEmployees, setSortedEmployees] = useState(null);

	useEffect(() => {
		if (fileData) {
			const result = getResult(fileData);
			setSortedEmployees(result);
		}
	}, [fileData]);

	if (!fileData) {
		return (
			<Attention>
				...need a file first. go to the menu... and go home
				<FontAwesomeIcon icon={faFaceSmile} />
			</Attention>
		);
	}

	return (
		<ResultContainer className='result-container'>
			<div className='result-inner'>
				<div className='header-wrapper'>
					{headersResult.map((el, i) => (
						<div key={i} className='header-item'>
							{el}
						</div>
					))}
				</div>

				<div className='result-body'>
					{sortedEmployees &&
						sortedEmployees.map((el, i) => {
							return (
								<div key={i} className='row'>
									<div className='col'>{el.id1}</div>
									<div className='col'>{el.id2}</div>
									<div className='col'>{el.projectId}</div>
									<div className='col'>{el.overlapDays}</div>
								</div>
							);
						})}
				</div>
			</div>
		</ResultContainer>
	);
};

const Attention = styled.p`
	color: #777;
	text-align: center;
	margin: auto 0;
	padding: 3rem;
`;

const ResultContainer = styled.div`
	margin-top: 2rem;
	overflow-y: scroll;
	padding: 1rem;

	.result-inner {
		display: flex;
		flex-direction: column;
		overflow-y: scroll;
		flex-wrap: wrap;
		flex: 1;
		box-shadow: inset 0px 0px 5px 3px rgba(0, 0, 0, 0.3);
		border-radius: 0.5rem;
	}

	.header-wrapper {
		display: flex;
		min-width: fit-content;
		flex: 1;
		border-bottom: 0.2rem groove;
	}

	.header-item,
	.col {
		min-width: 15rem;
		padding: 1.5rem;
	}

	.header-item {
		font-weight: bold;
		text-transform: uppercase;
		text-align: center;
		color: #777;
	}

	.col {
		text-align: center;
	}

	.result-body {
		overflow: scroll;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.row {
		display: flex;
	}
`;

export default Result;
