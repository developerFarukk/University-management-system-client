

import { Button, Layout } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/features/auth/authSlice';
// import { useState } from 'react';
const { Header, Content } = Layout;

const MainLayout = () => {

    const dispatch = useAppDispatch();
    // const toastId = toast.loading('Log Out');

    // const [collapsed, setCollapsed] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        // toast.success('Log Out', { id: toastId, duration: 2000 });
    };

    return (
        <Layout className='main-layout' >
            <Sidebar
            //  collapsed={collapsed} onCollapse={setCollapsed} 
            />
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1000, width: '100%' }} >
                    <NavLink to='/login'><Button onClick={handleLogout}>Logout</Button>{' '}</NavLink>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: '100vh',
                            zIndex: 0,
                            marginTop: '24px',
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;