import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Outlet, Link } from 'react-router-dom';
import { useWidth } from '../../hooks/useWidth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const menuItems = [
	{ label: 'home', url: '/' },
	{ label: 'original data', url: 'all-data' },
	{ label: 'sorted result', url: 'result' },
];

const Navigation = () => {
	const [menuClick, setMenuClick] = useState(false);
	const [visibleMenuHeight, setVisibleMenuHeight] = useState(null);

	const visibleMobileMenuRef = useRef(null);
	const mobile = 375;
	const layout = useWidth();

	const handleMenuClick = () => {
		setMenuClick((prev) => !prev);
	};

	const handleOutsideMenuClick = (e) => {
		setMenuClick(false);
	};

	const handleMenuItemClick = (e) => {
		setMenuClick(false);
	};

	useEffect(() => {
		setVisibleMenuHeight(visibleMobileMenuRef.current.offsetHeight);
	}, []);

	return (
		<NavigationContainer
			className='navigation-container'
			menuHeight={visibleMenuHeight}
		>
			{menuClick && (
				<div
					className='on-outside-click'
					onClick={handleOutsideMenuClick}
				></div>
			)}

			<div className='menu-header-mobile' ref={visibleMobileMenuRef}>
				<div className='company-name-wrapper'>
					<span className='logo'>sirma</span>
					<span>solutions</span>
				</div>
				<div className='icon' onClick={handleMenuClick}>
					{menuClick ? (
						<FontAwesomeIcon icon={faXmark} />
					) : (
						<FontAwesomeIcon icon={faBars} />
					)}
				</div>
				<ul
					className={`${
						menuClick ? 'menu-links-container' : 'no-show'
					}`}
				>
					{menuItems.map((el, i) => (
						<li className='menu-link' key={i}>
							<Link to={el.url} onClick={handleMenuItemClick}>
								{el.label}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<Outlet />
		</NavigationContainer>
	);
};

const NavigationContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;

	.on-outside-click {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
	}

	.menu-header-mobile {
		display: flex;
		background: var(--main-color);
		padding: 2rem;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 101;
		color: #fff;

		.company-name-wrapper {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 3rem;
			text-transform: capitalize;
			gap: 0.5rem;
		}

		.icon {
			font-size: 2.5rem;
			min-width: 3rem;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			cursor: pointer;
		}

		span:not(.logo) {
			font-weight: 300;
		}

		.logo {
			font-weight: bold;
		}
	}

	.menu-links-container {
		position: absolute;
		width: 100%;
		top: ${({ menuHeight }) => `${menuHeight}px`};
		background: var(--main-color);
		box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.2);

		.menu-link {
			border-top: 1px groove;
			text-align: center;
			text-transform: uppercase;
			font-size: 16px;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all 0.5s ease-in-out;

			&:hover {
				background-color: var(--dark);
			}

			a {
				flex: 1;
				padding: 15px;
			}
		}
	}

	.no-show {
		display: none;
	}
`;

export default Navigation;
