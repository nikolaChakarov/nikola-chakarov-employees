import styled from 'styled-components';

const Footer = () => {
	return (
		<FooterContainer>
			<span>Nikola Chakarov</span>
		</FooterContainer>
	);
};

const FooterContainer = styled.footer`
	text-align: center;
	color: #777;
	padding: 2rem;
	border-top: 2px groove;
	margin-top: auto;
`;

export default Footer;
