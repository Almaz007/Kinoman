import { Outlet } from 'react-router-dom'
import { authState } from '../../store/store'

import Header from '../UI/header/Header'
import '../../styles/main.css'
import AdminLayout from './adminLayout/AdminLayout'
import DefaultLayout from './defaultLayout/DefaultLayout'

const Layout = () => {
	const isAuth = authState(state => state.isAuth)
	const { roleId } = authState(state => state.userData)

	return isAuth && roleId === 2 ? <AdminLayout /> : <DefaultLayout />
}

export default Layout
