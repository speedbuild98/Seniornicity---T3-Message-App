import Link from 'next/link'
import { GiMagicHat } from 'react-icons/gi'
import { HOME } from '~/utils/routes'
import { Layout, Subtitle, Title } from './_components/General'
import { FaHome } from 'react-icons/fa'

export default function Error404Page() {
  return (
    <Layout>
      <GiMagicHat size={100} />
      <Title text='Error 404' />
      <Subtitle text='Page not found' />
      <Link
        href={HOME}
        className="btn btn-primary text-white"
      >
        <FaHome />
        Home
      </Link>
    </Layout>
  )
}
