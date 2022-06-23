import {addUserFailure, addUserStart, addUserSuccess, loginFailure, loginStart, loginSucess,} from "./userRedux";
import {createWhislistFailure, createWhislistStart, createWhislistSuccess, iniciateLista, addWhislistProduct, removeWhislistProduct} from "./whislistRedux";
import {publicRequest, userRequest} from "../requestMethods";

export const login = async (dispatch, user, navigate) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSucess(res.data));
        await buscaLista(dispatch, user);
        navigate("/")
    } catch (err) {
        dispatch(loginFailure());
        console.log(err)
    }
};

//add Users
export const addUser = async (user, dispatch, navigate) => {
    dispatch(addUserStart());
    try {
        const res = await publicRequest.post(`/auth/register`, user);
        dispatch(addUserSuccess(res.data));
        alert("Usuário cadastrado com sucesso");
        await createWhislist(user, dispatch);
        await login(dispatch, user, navigate);
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
            username: user.username,
            products: [],
            //products: ['62b0b6c85f8be3777bb5f560', '62b0b6c85f8be3777bb5f550'],
        });
        dispatch(createWhislistSuccess(user.username))
    } catch (err) {
        dispatch(createWhislistFailure())
        console.log(err.response.data)
    }

}

export const buscaLista = async (dispatch, user) => {

    let products = [];

    try {
        const res = await publicRequest.get("/whislists/find/" + user.username);

        if(res.data.products.length > 0) {

            for(const item of res.data.products){
                products.push((await buscaProduto(item)).data);
            }

            dispatch(iniciateLista({products, user}));

        } else dispatch(iniciateLista({products, user}));

    } catch (err) {
        console.log(err)
    }
};

const buscaProduto = async (productoId) => {

    try {
        return await publicRequest.get("/products/find/" + productoId);
    } catch (err) {
        console.log(err.response.data)
    }

}

export const addWhislistProductBD = async (product, dispatch, username) => {

    try{

        const lista = await (await publicRequest.get("/whislists/find/" + username)).data;
        lista.products.push(product._id);
        console.log(lista)
        await publicRequest.put("/whislists/" + lista._id, {
            products : lista.products
        });
        dispatch(addWhislistProduct(product))

    } catch(erro){
        console.log(erro)
    }

}

export const removeWhislistProductBD = async (product, dispatch, username) => {

    try{
        const lista = await (await publicRequest.get("/whislists/find/" + username)).data;
        const listaRemovida = lista.products.filter((x) => x !== product._id);
        console.log(listaRemovida)
        await publicRequest.put("/whislists/" + lista._id, {
            products : listaRemovida
        });
        dispatch(removeWhislistProduct(product))

    } catch(erro){
        console.log(erro)
    }

}



