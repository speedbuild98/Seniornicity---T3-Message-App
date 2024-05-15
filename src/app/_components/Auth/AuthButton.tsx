import Link from 'next/link'
import React from 'react'
import { CiLogin, CiLogout } from 'react-icons/ci';
import { getServerAuthSession } from '~/server/auth';
import { SIGNIN, SIGNOUT } from '~/utils/routes';

export default async function AuthButton() {
  const session = await getServerAuthSession();

  return (
    <Link
      href={session ? SIGNOUT : SIGNIN}
      className="btn btn-primary"
    >
      {session ? 'Sign Out' : 'Sign In'}
      {session ? <CiLogout size={20} /> : <CiLogin size={20} />}
    </Link>
  )
}
