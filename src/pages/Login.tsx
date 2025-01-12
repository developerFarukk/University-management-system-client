/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm({
        defaultValues: {
            userId: 'A-0001',
            password: '123456',
        },
    });

    const [login] = useLoginMutation();

    const onSubmit = async (data: any) => {
        const userInfo = {
            id: data.userId,
            password: data.password,
        };

        console.log(userInfo);


        const res = await login(userInfo).unwrap();
        const user = verifyToken(res.data.accessToken);

        dispatch(setUser({ user: user, token: res.data.accessToken }));
        navigate(`/${user.role}/dashboard`);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="id">ID: </label>
                    <input type="text" id="id" {...register('userId')} />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="text" id="password" {...register('password')} />
                </div>
                <Button htmlType="submit">Login</Button>

            </form>

        </div>
    );
};

export default Login;