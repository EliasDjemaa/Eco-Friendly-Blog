import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {BiRecycle,BiMenu} from 'react-icons/bi';
import { Button } from './Button';
import "./Navbar.css"

function Navbar() {

const [click,setClick] = useState(false);
const [button,setButton] = useState(true);

const handleClick = () => setClick(!click);
const closeMobileMenu = () =>setClick(false);

useEffect( ()=>{
    showButton();
}, []);

const showButton =()=>{
    if(window.innerWidth <= 960){
        setButton(false);
    }else{
        setButton(true);
    }
}

window.addEventListener('resize',showButton)

    return(
        <div>
            <nav className = "navbar">

                <div className = "navbar-container">
                    <Link to = "/" className = "navbar-logo" onClick = {closeMobileMenu}>
                    <BiRecycle color ="green"/>GreenTopia<BiRecycle color="green"/>
                    </Link>


                    <div className = "menu-icon" onClick= {handleClick}>
                        <BiMenu color = "white"/>
                    </div>



                <ul className = {click ? 'nav-menu active' : 'nav-menu'}>
                    <li className = "nav-item carbon-footprint-calculator">
                        <Link to= '/CarbonFootprintCalculator' className ='nav-links' onClick={closeMobileMenu}>
                            Carbon Footprint Calculator
                        </Link>
                    </li>
                    <li id = "route-optimisation" className = "nav-item">
                        <Link to= '/RouteOptimisation' className ='nav-links' onClick={closeMobileMenu}>
                            Route Optimisation
                        </Link>
                    </li>
                    <li id = "transform-households" className = "nav-item">
                        <Link to= '/TransformHouseholds' className ='nav-links' onClick={closeMobileMenu}>
                            Transform Your Household
                        </Link>
                    </li>
                    <li id = "blogs" className = "nav-item blogs">
                        <Link to= '/blogs' className ='nav-links' onClick={closeMobileMenu}>
                            Blogs
                        </Link>
                    </li>
                    <li id = "sign-up" className = "nav-item sign-up">
                        <Link to= '/signUp' className ='nav-links-mobile' onClick={closeMobileMenu}>
                            SIGN UP
                        </Link>
                    </li>
                    <li id = "log-in" className = "nav-item log-in">
                        <Link to= '/logIn' className ='nav-links-mobile' onClick={closeMobileMenu}>
                            LOG IN
                        </Link>
                    </li>

                </ul>
                   {button && <Button buttonStyle ='btn--outline' linkTo="/signUp">SIGN UP</Button>}
                   {button && <Button buttonStyle ='btn--outline' linkTo="/logIn">LOG IN</Button>}
                </div>
            </nav>
        </div>
    )
}

export default Navbar;