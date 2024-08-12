import axios from 'axios'
import { SERVER_API } from '../env'
import { GET_SESSIONSTORAGE_VALUE } from '../utils/handle-sessionstorage'
const FLASHCARD_API = axios.create({
    baseURL: SERVER_API + "/flashcard", headers: {
        'access-token': GET_SESSIONSTORAGE_VALUE('token')
    }
})


export default FLASHCARD_API;