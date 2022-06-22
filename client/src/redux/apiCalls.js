import {addUserFailure, addUserStart, addUserSuccess, loginFailure, loginStart, loginSucess,} from "./userRedux";
import {createWhislistStart, createWhislistSuccess, createWhislistFailure} from "./whislistRedux";
import {publicRequest, userRequest} from "../requestMethods";

export const login = async (dispatch, user, navigate) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSucess(res.data));
        navigate("/")
    } catch (err) {
        dispatch(loginFailure());
    }
};

//add Users
export const addUser = async (user, dispatch, navigate) => {
    dispatch(addUserStart());
    try {
        const res = await publicRequest.post(`/auth/register`, user);
        dispatch(addUserSuccess(res.data));
        alert("Usuário cadastrado com sucesso");
        await login(dispatch, user, navigate);
        await createWhislist(user, dispatch);
    } catch (err) {
        dispatch(addUserFailure());
        if(err.response.data.code === 11000 && err.response.data.keyValue.email === user.email) alert("E-mail já cadastrado");
        else if (err.response.data.code === 11000 && err.response.data.keyValue.username === user.username) alert("Nome de usuário indisponível");
    }

};

const createWhislist = async (user, dispatch) => {

    dispatch(createWhislistStart());
    try{
        await userRequest.post("/whislists", {
            userId: user.username,
            products: [],
        });
        dispatch(createWhislistSuccess())
    } catch (err) {
        dispatch(createWhislistFailure())
    }

}



