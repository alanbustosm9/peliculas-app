import axios from 'axios'

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: 'f39f68ba0a611fd5a8ecf0bfb78d9a23',
        language: 'es-ES',
    },
})


export default movieDB;




