import axios from 'axios'
import { SERVER_API } from '../env'

console.log(SERVER_API)
const AUTH_API = axios.create({
    baseURL: SERVER_API + "/auth"
})


export default AUTH_API;