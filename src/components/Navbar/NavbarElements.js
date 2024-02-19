// components/Navbar/navbarElements.js

import { FaSignOutAlt } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import colors from "styles/colors";

export const Nav = styled.nav`
  background: ${colors.backgroundLighter};
  border-radius: 16px;
  height: 85px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-shadow: 4px 4px 0px ${colors.bgShadowColor};
  /* padding: 0.2rem calc((100vw - 1000px) / 2);   */
  z-index: 12;
  /* Third Nav */
  /* justify-content: flex-start; */
  @media screen and (max-width: 768px) {
    flex-direction: row-reverse;
    flex-wrap: wrap;
    align-content: center;
  }
`;

export const NavLink = styled(Link)`
  color: ${colors.textColor};
  display: flex;
  font-weight: 600;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: ${colors.primary};
  }
`;
export const NavItem = styled.div`
  color: ${colors.textColor};
  display: flex;
  font-weight: 600;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  @media screen and (max-width: 768px) {
    display: none;
  }
  span {
    color: ${colors.primary};
    font-weight: bold;
    border-radius: 4px;
    padding: 0.2rem 0.4rem;
    transition: all 0.2s ease-in-out;
    &:hover {
      background: ${colors.primary};
      color: ${colors.backgroundDarker};
      text-decoration: none;
    }
  }
  &.active {
    color: ${colors.primary};
  }
`;

export const Bars = styled(FaSignOutAlt)`
  display: none;
  color: #808080;
  @media screen and (max-width: 768px) {
    display: block;
    display: flex;
    margin: 0 23px;
    width: 36px;
    height: 36px;
    /*  position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem; */
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
width: 100vw; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: ${colors.backgroundDarker};
  box-shadow: 4px 4px 0px ${colors.bgShadowColor};

  padding: 10px 22px;
  color: ${colors.primary};
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;
