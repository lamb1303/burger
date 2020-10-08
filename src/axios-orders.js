import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-17b98.firebaseio.com/'
})

export default instance