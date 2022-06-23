import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user || "{}")?.currentUser?.accessToken;
//const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2FkZjI3NDQ5ZDg1OTEwNjI1Mzg4YiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NDk2NDE4MSwiZXhwIjoxNjU1MjIzMzgxfQ.Arrgtoa3zCKBYaL58D0Zxa-Slb9jDlYMjivo45p0C-8"
export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${token}`}
})
