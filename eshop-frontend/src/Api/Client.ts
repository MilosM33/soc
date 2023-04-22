import axios from "axios";

const Client = axios.create({
	baseURL: `http://everydayessentials.tech:8000/api`,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

Client.interceptors.request.use(
	(config) => {
		const json = localStorage.getItem("user");
		if (json) {
			const user = JSON.parse(json);
			if (user && config.headers !== undefined) {
				config.headers.Authorization = `Bearer ${user.token}`;
			}
		}
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);


export default Client;

export const { get, post, put, delete: destroy } = Client;
