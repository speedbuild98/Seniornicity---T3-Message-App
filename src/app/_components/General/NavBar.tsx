'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { BsChatLeftHeart } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { CHATS, PROFILE } from '~/utils/routes';

const navLinks = [
  { href: CHATS, icon: <BsChatLeftHeart size={20} />, label: 'Chats' },
  { href: PROFILE, icon: <CgProfile size={20} />, label: 'Profile' }
];

export default function NavBar() {
  const active = usePathname().split("/")[1];

  if (active === "" || active !== "chats" && active !== "stats" && active !== "profile" && active !== "favorites") {
    return null;
  }

  return (
    <nav className="btm-nav max-w-screen">
      {navLinks.map((link, index) => (
        <Link href={link.href} key={index} className={active === link.label.toLowerCase() ? "active text-primary" : ""}>
          {link.icon}
          <span className="btm-nav-label">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}
