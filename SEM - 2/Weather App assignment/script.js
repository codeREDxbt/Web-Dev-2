const API_KEY = "e6c3f230daae6f1bb70ab6a76d145bd6";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const HISTORY_KEY = "async-weather-history";
const MAX_HISTORY = 6;

const form = document.getElementById("weatherform");
const cityInput = document.getElementById("city");
const weatherContent = document.getElementById("weather-content");
const weatherError = document.getElementById("weather-error");
const historyContainer = document.getElementById("history");
const consolePanel = document.getElementById("console-panel");

let logCounter = 0;
let searchHistory = loadSearchHistory();

renderSearchHistory();

form.addEventListener("submit", async function onSubmit(event) {
	event.preventDefault();

	const city = cityInput.value.trim();

	clearLogPanel();
	logEvent("Sync Start");
	logEvent("Sync End");

	Promise.resolve().then(function microtaskLog() {
		logEvent("Promise.then (Microtask)");
	});

	setTimeout(function macrotaskLog() {
		logEvent("setTimeout (Macrotask)");
	}, 0);

	await performWeatherSearch(city);
});

historyContainer.addEventListener("click", async function onHistoryClick(event) {
	if (!event.target.matches("button[data-city]")) {
		return;
	}

	const city = event.target.getAttribute("data-city") || "";
	cityInput.value = city;

	clearLogPanel();
	logEvent("Sync Start");
	logEvent("Sync End");

	Promise.resolve().then(function microtaskLog() {
		logEvent("Promise.then (Microtask)");
	});

	setTimeout(function macrotaskLog() {
		logEvent("setTimeout (Macrotask)");
	}, 0);

	await performWeatherSearch(city);
});

async function performWeatherSearch(city) {
	if (!city) {
		renderWeatherError("Please enter a city name");
		return;
	}

	if (!API_KEY || API_KEY === "YOUR_OPENWEATHERMAP_API_KEY") {
		renderWeatherError("Add your OpenWeatherMap API key in script.js");
		return;
	}

	clearWeatherUI();
	logEvent("[ASYNC] Start fetching");

	try {
		const data = await fetchWeather(city)
			.then(function onPromiseResolve(payload) {
				logEvent("Promise resolved (.then())");
				return payload;
			})
			.catch(function onPromiseReject(error) {
				logEvent("Promise rejected (.catch())");
				throw error;
			});

		renderWeatherData(data);
		addCityToHistory(data.name);
		logEvent("[ASYNC] Data received");
	} catch (error) {
		renderWeatherError(getFriendlyError(error));
		logEvent("[ASYNC] Error received");
	}
}

function fetchWeather(city) {
	const query = encodeURIComponent(city);
	const endpoint = API_URL + "?q=" + query + "&units=metric&appid=" + API_KEY;

	return fetch(endpoint)
		.then(function onResponse(response) {
			if (!response.ok) {
				if (response.status === 404) {
					throw new Error("CITY_NOT_FOUND");
				}

				if (response.status === 401) {
					throw new Error("INVALID_API_KEY");
				}

				throw new Error("API_RESPONSE_ERROR");
			}

			return response.json();
		})
		.then(function onJson(payload) {
			if (!payload || !payload.main || !payload.weather || !payload.weather[0] || !payload.wind) {
				throw new Error("INVALID_API_RESPONSE");
			}

			return payload;
		})
		.catch(function onFetchFail(error) {
			if (error.message) {
				throw error;
			}

			throw new Error("NETWORK_ERROR");
		});
}

function renderWeatherData(data) {
	const rows = [
		["City", data.name + ", " + data.sys.country],
		["Temp", data.main.temp.toFixed(1) + " \u00B0C"],
		["Weather", data.weather[0].main],
		["Humidity", data.main.humidity + "%"],
		["Wind", data.wind.speed.toFixed(2) + " m/s"]
	];

	weatherContent.innerHTML = rows
		.map(function toRow(entry) {
			return "<div class=\"weather-row\"><span>" + escapeHtml(entry[0]) + "</span><span>" + escapeHtml(entry[1]) + "</span></div>";
		})
		.join("");
}

function renderWeatherError(message) {
	weatherContent.innerHTML = "";
	weatherError.hidden = false;
	weatherError.textContent = message;
}

function clearWeatherUI() {
	weatherError.hidden = true;
	weatherError.textContent = "";
	weatherContent.innerHTML = "";
}

function getFriendlyError(error) {
	if (error.message === "CITY_NOT_FOUND") {
		return "City not found";
	}

	if (error.message === "INVALID_API_KEY") {
		return "Invalid API key. Update script.js";
	}

	if (error.message === "API_RESPONSE_ERROR" || error.message === "INVALID_API_RESPONSE") {
		return "Invalid API response. Please try again";
	}

	if (error.name === "TypeError" || error.message === "NETWORK_ERROR") {
		return "Network error. Please check your internet connection";
	}

	return "Something went wrong. Please try again";
}

function loadSearchHistory() {
	try {
		const saved = localStorage.getItem(HISTORY_KEY);
		const parsed = JSON.parse(saved || "[]");
		if (!Array.isArray(parsed)) {
			return [];
		}

		return parsed;
	} catch (_error) {
		return [];
	}
}

function saveSearchHistory() {
	localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistory));
}

function addCityToHistory(city) {
	const normalized = city.toLowerCase();
	searchHistory = searchHistory.filter(function removeDuplicate(existingCity) {
		return existingCity.toLowerCase() !== normalized;
	});

	searchHistory.unshift(city);

	if (searchHistory.length > MAX_HISTORY) {
		searchHistory = searchHistory.slice(0, MAX_HISTORY);
	}

	saveSearchHistory();
	renderSearchHistory();
}

function renderSearchHistory() {
	if (!searchHistory.length) {
		historyContainer.innerHTML = "";
		return;
	}

	historyContainer.innerHTML = searchHistory
		.map(function toChip(city) {
			return "<button type=\"button\" data-city=\"" + escapeHtml(city) + "\">" + escapeHtml(city) + "</button>";
		})
		.join("");
}

function clearLogPanel() {
	logCounter = 0;
	consolePanel.innerHTML = "";
}

function logEvent(message) {
	logCounter += 1;
	console.log(logCounter, message);

	const line = document.createElement("div");
	line.className = "log-line";

	const index = document.createElement("span");
	index.className = "log-index";
	index.textContent = String(logCounter);

	const text = document.createElement("span");
	text.textContent = message;

	line.appendChild(index);
	line.appendChild(text);
	consolePanel.appendChild(line);
}

function escapeHtml(value) {
	return String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/\"/g, "&quot;")
		.replace(/'/g, "&#39;");
}
