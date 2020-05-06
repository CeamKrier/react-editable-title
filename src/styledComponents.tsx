import styled from 'styled-components';

export const ControlButton = styled.button`
  cursor: pointer;
  display: inline-block;
  min-height: 1em;
  outline: 0;
  border: none;
  background: #e0e1e2 none;
  color: rgba(0,0,0,.6);
  margin: 0 .25em 0 0;
  padding: .0em 1em .78571429em;
  border-radius: .28571429rem;
  vertical-align: bottom;
  max-height: 32px;
  &:hover {
    background-color: #cacbcd;
  } `

export const CustomTitle = styled.input`
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  height: 32px;
  padding: 4px 11px;
  color: rgba(0,0,0,0.65);
  font-size: 14px;
  font-family: sans-serif;
  line-height: 1.5;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  border-top-right-radius: unset;
  border-bottom-right-radius: unset; `

  export const EditableTitlePopover = styled.div`
  position: absolute;
  margin-top: -0.15em; `

  export const EditableWrapper = styled.div`
  display: -webkit-inline-box; `