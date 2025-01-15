
import { Layout, Menu } from 'antd';
import { sidebarItemsGenerator } from '../../utils/sidebarItemsGenerator';
import { adminPaths } from '../../routes/admin.routes';
import { facultyPaths } from '../../routes/faculty.routes';
import { studentPaths } from '../../routes/student.routes';
import { useAppSelector } from '../../redux/hooks';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
// import { useState } from 'react';

const { Sider } = Layout;

const userRole = {
    ADMIN: 'admin',
    FACULTY: 'faculty',
    STUDENT: 'student',
};

const Sidebar = (
    // { collapsed, onCollapse }
) => {
    const user = useAppSelector(selectCurrentUser);

    // const [collapsed, setCollapsed] = useState(false);

    let sidebarItems;

    switch (user!.role) {
        case userRole.ADMIN:
            sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
            break;
        case userRole.FACULTY:
            sidebarItems = sidebarItemsGenerator(facultyPaths, userRole.FACULTY);
            break;
        case userRole.STUDENT:
            sidebarItems = sidebarItemsGenerator(studentPaths, userRole.STUDENT);
            break;

        default:
            break;
    }

    return (
        <div style={{ zIndex: 1000 }}>
            <Sider
                // collapsible
                // collapsed={collapsed}
                // onCollapse={onCollapse}
                breakpoint="lg" collapsedWidth="0" style={{
                    position: 'fixed',
                    height: '100%',
                    left: 0,
                    top: 0,
                    zIndex: 1000,
                }}>
                <div
                    style={{
                        color: 'white',
                        height: '4rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <h1> UM System</h1>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['4']}
                    items={sidebarItems}
                />
            </Sider>
        </div>
    );
};

export default Sidebar;