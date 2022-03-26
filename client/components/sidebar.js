import Link from 'next/link';
import Logo from '../assets/images/logo/react-logo.png'
import Image from 'next/image'
import { FaBeer } from 'react-icons/fa';
import { ImHistory } from "react-icons/im";
import { BiPlusCircle } from "react-icons/bi";
import { IsHamburgerContext} from "../components/context/hamburgerContext"
import { useContext } from 'react'

export default ({ currentUser }) => {

    const { isHamburgerIcon } = useContext(IsHamburgerContext)

    const links = [
        currentUser && currentUser["rule"] === "Boss" && { label: 'Regisztráció', href: '/auth/signup', icon: <BiPlusCircle/> },
        !currentUser && { label: 'Bejelentkezés', href: '/auth/signin',icon:<FaBeer /> },
        currentUser && { label: 'Kijelentkezés', href: '/auth/signout',icon:<ImHistory  /> },
        currentUser && { label: 'Napi Beosztás', href: '/time/timetable',icon:<ImHistory  /> },
        currentUser && { label: 'Itt vagyok', href: '/time/checking',icon:<ImHistory  /> },
        currentUser && { label: 'Távozás', href: '/time/checkout',icon:<ImHistory  /> },
        currentUser && { label: 'Profil', href: '/auth/profile',icon:<ImHistory  /> },
        currentUser && { label: 'Beosztás', href: '/time/create',icon:<ImHistory  /> }
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
