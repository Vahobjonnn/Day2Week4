import axios from "axios";
export let api = "https://test-swagger-2ph6.onrender.com"


async function loginRequest(obj) {
    try {
        let { data } = await axios.post(api + "/auth/login", obj)
        let token = data.token ?? data.accessToken ?? data.data?.token
        if (token) {
            localStorage.setItem("token", token)
        }
        return token
    } catch (error) {
        console.error(error);

    }
}
export default loginRequest