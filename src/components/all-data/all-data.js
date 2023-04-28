import { useContext } from 'react';
import { GlobalContext } from '../../context/app-state';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';

const AllData = () => {
	const { headers, fileData } = useContext(GlobalContext);

	if (!fileData) {
		return (
			<Attention>
				...need a file first. go to the menu... and go home
				<FontAwesomeIcon icon={faFaceSmile} />
			</Attention>
		);
	}

	return (
		<AllDataContainer className='all-data-container'>
			<div className='all-data-inner'>
				<div className='header-wrapper'>
					{headers.map((el, i) => (
						<div key={i} className='header-item'>
							{el}
						</div>
					))}
				</div>

				<div className='all-data-body'>
					{fileData &&
						fileData.map((el, i) => {
							return (
								<div key={i} className='row'>
									{el.map((item, idx) => (
										<div className='col' key={idx}>
											{item}
										</div>
									))}
								</div>
							);
						})}
				</div>
			</div>
		</AllDataContainer>
	);
};

const Attention = styled.p`
	color: #777;
	text-align: center;
	margin: auto 0;
	padding: 3rem;
`;

const AllDataContainer = styled.div`
	margin-top: 2rem;
	flex-grow: 1;
	flex-direction: column;
	overflow-y: scroll;
	padding: 1rem;

	.all-data-inner {
		display: flex;
		flex-direction: column;
		overflow-y: scroll;
		flex-wrap: wrap;
		flex: 1;
	}

	.header-wrapper {
		display: flex;
		min-width: fit-content;
		flex: 1;
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
		border-right: 2px groove;
		color: #777;

		&:first-of-type {
			border-left: 2px groove;
		}
	}

	.col {
		text-align: center;
	}

	.all-data-body {
		overflow: scroll;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.row {
		display: flex;

		&:nth-child(odd) {
			background: var(--dark);
			color: #fff;
			box-shadow: inset 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
		}
	}
`;

export default AllData;
