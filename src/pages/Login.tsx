/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from 'antd';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { setUser, TUser } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FieldValues, useForm } from 'react-hook-form';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { register, handleSubmit } = useForm({
      defaultValues: {
        userId: 'A-0001',
        password: '123456',
      },
    });

    // const defaultValues = {
    //     userId: 'A-0002',
    //     password: 'admin123',
    // };

    const [login] = useLoginMutation();

    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        const toastId = toast.loading('Logging in');

        try {
            const userInfo = {
                id: data.userId,
                password: data.password,
            };
            const res = await login(userInfo).unwrap();
            const user = verifyToken(res.data.accessToken) as TUser;
            dispatch(setUser({ user: user, token: res.data.accessToken }));
            toast.success('Logged in', { id: toastId, duration: 2000 });
            navigate(`/${user.role}/dashboard`);
        } catch (err) {
            toast.error('Something went wrong', { id: toastId, duration: 2000 });
        }
    };

    return (
        <div>
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

        </div>
    );
};

export default Login;