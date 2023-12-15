import Navbar from './NavBar/Navbar'
import { Outlet } from 'react-router-dom'

type Props = {}

const Layout = (props: Props) => {
  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Layout