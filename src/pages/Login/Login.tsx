import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearLocalStorage } from '@/utilities';
import { getMorty } from '@/services';
import { PrivateRoutes, PublicRoutes, Roles } from '@/models';
import { UserKey, createUser, resetUser } from '@/redux/states/user';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        clearLocalStorage(UserKey);
        dispatch(resetUser());
        navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
    }, []);

    const login = async () => {
        try {
            const result = await getMorty();
            dispatch(createUser({ ...result, rol: Roles.USER }));
            navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
        } catch (error) {}
    };
    return (
        <div>
            <h2>LOGIN</h2>
            <button onClick={login}>LOGIN</button>
        </div>
    );
}
export default Login;
