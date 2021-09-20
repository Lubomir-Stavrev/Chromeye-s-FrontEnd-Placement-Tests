let apiUrl = "http://apis.chromeye.com:9191/people";

export default function getPeople() {
	return fetch(apiUrl)
		.then((res) => res.json())
		.then((data) => {
			return data;
		});
}
