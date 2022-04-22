import Link from 'next/link';
import Logo from '../assets/images/logo/react-logo.png'
import Image from 'next/image'
import { FaBeer } from 'react-icons/fa';
import { ImHistory } from "react-icons/im";
import { BiPlusCircle } from "react-icons/bi";
import {AiOutlinePieChart} from "react-icons/ai"
import { IsHamburgerContext} from "../components/context/hamburgerContext"
import { useContext } from 'react'
import { MdAlarmAdd } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { AiOutlineTeam } from "react-icons/ai";
import { AiOutlineLogin} from "react-icons/ai";
import { AiOutlineLogout} from "react-icons/ai";

export default ({ currentUser }) => {

    const { isHamburgerIcon } = useContext(IsHamburgerContext)

    const links = [
       
        !currentUser && { label: 'Bejelentkezés', href: '/auth/signin',icon:<FaBeer /> },
        ((currentUser) && (currentUser.job === "manager" || currentUser.job === "tulajdonos")) && { label: 'Beosztás készítő', href: '/time/create',icon:<MdAlarmAdd  /> },
        currentUser && { label: 'Beosztás', href: '/time/timetable',icon:<IoCalendarOutline  /> },
        ((currentUser) && (currentUser.job === "manager" || currentUser.job === "tulajdonos")) && { label: 'Jelenlévők & késők', href: '/time/active',icon:<AiOutlinePieChart  /> },
        currentUser && { label: 'Felhasználók', href: '/auth/profile',icon:<AiOutlineTeam  /> },
        currentUser && { label: 'Itt vagyok', href: '/time/checking',icon:<AiOutlineLogin  /> },
        currentUser && { label: 'Távozás', href: '/time/checkout',icon:<AiOutlineLogout  /> },     
        currentUser && { label: 'Kijelentkezés', href: '/auth/signout',icon:<ImHistory  /> }
    ]
        .filter(linkConfig => linkConfig)
        .map(({ label, href, icon}) => {
            return (
                <li key={href} className="nav-item">               
                        <a className="nav-link" href={href}>
                        {icon}
                        <p>{label}</p>
                        </a>
                    
                </li>
            );
        });

    return (

        <div className={`sidebar ${isHamburgerIcon ? isHamburgerIcon["actual"] ? isHamburgerIcon["actual"] : isHamburgerIcon : "closed"}`}>
            <div className='sidebar-wrapper'>
                <div className='logo'>
                    <Link href={'/'}>
                        <a className='simple-text logo-mini'>
                            <div className='logo-img'>
                                <Image
                                    src={Logo}
                                    alt="logo-img"
                                    className='logo-img-class'
                                />
                            </div>
                        </a>
                    </Link>
                    <Link href={"/"}>
                        <a className='simple-text logo-normal'>TIMEMANAGER</a>
                    </Link>

                </div>
                <ul className="nav">{links}</ul>
            </div>
        </div>
    );
};
