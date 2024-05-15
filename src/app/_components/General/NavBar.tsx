'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { BsChatLeftHeart } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaHeartCircleBolt } from 'react-icons/fa6';
import { ImStatsDots } from "react-icons/im";
import { CHATS, FAVORITES, PROFILE, STATS } from '~/utils/routes';

const navLinks = [
  { href: CHATS, icon: <BsChatLeftHeart size={20} />, label: 'Chats' },
  { href: FAVORITES, icon: <FaHeartCircleBolt size={20} />, label: 'Favorites' },
  { href: STATS, icon: <ImStatsDots size={20} />, label: 'Stats' },
  { href: PROFILE, icon: <CgProfile size={20} />, label: 'Profile' }
];

export default function NavBar() {
  const active = usePathname().split("/")[1];

  if (active === "" || active !== "chats" && active !== "stats" && active !== "profile" && active !== "favorites") {
    return null;
  }

  return (
    <nav className="btm-nav">
      {navLinks.map((link, index) => (
        <Link href={link.href} key={index} className={active === link.label.toLowerCase() ? "active text-primary" : ""}>
          {link.icon}
          <span className="btm-nav-label">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}
