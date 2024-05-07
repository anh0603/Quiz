import { useNavigate } from "react-router-dom";
import { checkExit, login, register } from "../../services/userServices";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from 'react-redux';
import { checkLogin } from "../../Action/login";
import { generateToken } from '../../helpers/generateToken'

function Register() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const checkExitEmail = await checkExit("email", email);

        if (checkExitEmail.length  > 0) {
            alert("Tài khoản đã tồn tại")
        } else {
            const option = {
                fullName: fullName,
                email: email,
                password: password,
                token: generateToken(),
            }
            const response = await register(option);
            if (response) {

                navigate('/login')
            }
            else {
                alert("Đăng ký không thành công")
            }
        }

    }
    return (
        <>
            <form className="center" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div>
                    <input type="fullName" placeholder="Nhập họ tên" required />
                </div>
                <div>
                    <input type="email" placeholder="Nhập email" required />
                </div>
                <div>
                    <input type="password" placeholder="Nhập password" />
                </div>
                <button className="send" type="submit">Đăng ký</button>
            </form>
        </>
    )
}
export default Register;