import { useState, useEffect } from 'react';

export const useWidth = () => {
	const [width, setWidth] = useState(window.innerWidth);

	const handleWidthChange = (e) => {
		setWidth(e.currentTarget.innerWidth);
	};

	useEffect(() => {
		window.addEventListener('resize', handleWidthChange);

		return () => window.removeEventListener('resize', handleWidthChange);
	}, [width]);

	return width;
};
