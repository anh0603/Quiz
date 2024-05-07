import { useSelector } from 'react-redux';
import { getCookie } from '../helpers/cookie';
import './LayoutDefault.css';
import { NavLink, Outlet } from 'react-router-dom';
function LayoutDefault() {
    const token = getCookie("token");
    const isLogin = useSelector(state => state.loginReducers);


    console.log(isLogin);

    return (
        <>
            <div className="layout-default">
                <header className="header">
                    <div className="logo">Quiz</div>
                    <div className="menu">
                        <ul>
                            <li>
                                <NavLink className="a" to="/">Home</NavLink>
                            </li>
                            {token && (
                                <>
                                    <li>
                                        <NavLink className="a" to="/topic">Topic</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="a" to="/answers">Answers</NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                    <div className='account'>
                        {token ? (<>
                            <NavLink className="a" to="/logout">
                                Đăng xuất
                            </NavLink>
                        </>) : (
                            <>
                                <NavLink className="a b" to="/login">
                                    Đăng nhập
                                </NavLink>
                                <NavLink className="a " to="/register">
                                    Đăng ký
                                </NavLink>
                            </>
                        )}

                    </div>
                </header>
                <main className="main">
                    <Outlet />
                </main>
                <footer className="footer">
                    Copyright @ 2024 Anh Tran
                </footer>
            </div>
        </>
    )
}
export default LayoutDefault;