import axios from 'axios'

export const api = new axios.create({
    baseURL: "https://my-personal-trainer-webapp.herokuapp.com/"
    // baseURL: "http://localhost:3001"
})