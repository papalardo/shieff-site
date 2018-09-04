import axios from 'axios'

export default () => {
	return axios.create({
		baseUrl: 'http://api.shieff.local/api',
		withCredentials: false,
		headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
	})
}