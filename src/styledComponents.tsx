import styled from 'styled-components';

export const ControlButton = styled.button`
	cursor: pointer;
	display: inline-block;
	line-height: 1em;
	min-height: 1em;
	outline: 0;
	border: none;
	background: #e0e1e2 none;
	color: rgba(0, 0, 0, 0.6);
	margin: 0 0.25em 0 0;
	padding: 0em 1em 0.78571429em;
	border-radius: 0.28571429rem;
	vertical-align: bottom;
	max-height: 32px;
	-webkit-box-shadow: 0 0 0 1px transparent inset,
		0 0 0 0 rgba(34, 36, 38, 0.15) inset;
	box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34, 36, 38, 0.15) inset;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
  user-select: none;
  -webkit-transition: opacity .1s ease,background-color .1s ease,color .1s ease,background .1s ease,-webkit-box-shadow .1s ease;
  transition: opacity .1s ease,background-color .1s ease,color .1s ease,background .1s ease,-webkit-box-shadow .1s ease;
  transition: opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s ease;
  transition: opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s ease,-webkit-box-shadow .1s ease;
  -webkit-tap-highlight-color: transparent;
	&:hover {
		background-color: #cacbcd;
    background-image: none;
    -webkit-box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
    box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
    color: rgba(0,0,0,.8);
	}
`;

export const CustomTitle = styled.input`
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	position: relative;
	display: inline-block;
	height: 32px;
	padding: 4px 11px;
	color: rgba(0, 0, 0, 0.65);
	font-size: 14px;
	font-family: sans-serif;
	line-height: 1.5;
	background-color: #fff;
	border: 1px solid #d9d9d9;
  border-radius: 4px;
	border-top-right-radius: unset;
	border-bottom-right-radius: unset;
`;

export const EditableTitlePopover = styled.div`
	position: absolute;
	margin-top: -0.15em;
`;

export const EditableWrapper = styled.div`
	display: -webkit-inline-box;
`;
