import snowIcon from "../assets/icons/snow.png";
import rainIcon from "../assets/icons/rain.png";
import fogIcon from "../assets/icons/fog.png";
import windIcon from "../assets/icons/wind.png";
import cloudyIcon from "../assets/icons/cloudy.png";
import pcdIcon from "../assets/icons/partly-cloudy-day.png";
import pcnIcon from "../assets/icons/partly-cloudy-night.png";
import cldIcon from "../assets/icons/clear-day.png";
import clnIcon from "../assets/icons/clear-night.png";
import "./style.css";

import { getWeather } from "./weatherAPI";

const weatherForm = document.getElementById("search-box");
let currentUnit = "C";

weatherForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const place = document.getElementById("search-value").value;
    createResults(place);
    weatherForm.reset();
})

const createResults = async (location) => {
    const resultsContainer = document.querySelector("#results");
    resultsContainer.innerHTML = "";

    try {
        const results = await getWeather(location, "uk");

        const resultHeader = document.createElement("div");
        resultHeader.id = "result-header";
        const resultMain = document.createElement("div");
        resultMain.id = "result-main";
        const resultExtra = document.createElement("div");
        resultExtra.id = "result-extra";

        const resultLocation = document.createElement("div");
        resultLocation.id = "result-location";
        resultLocation.innerText = results.location;

        const resultTime = document.createElement("div");
        resultTime.id = "result-time";
        resultTime.innerText = "Last updated at " + results.time + " (local time)";

        resultHeader.appendChild(resultLocation);
        resultHeader.appendChild(resultTime);
        
        const resultIcon = document.createElement("img");
        resultIcon.id = "result-icon";
        resultIcon.src = getIcon(results.icon);

        const resultTemp = document.createElement("div");
        resultTemp.id = "result-temp";
        resultTemp.innerHTML = results.temp + "<span class='degree'>°C</span> | <span class='secondary'>°F</span>";

        const resultConditions = document.createElement("div");
        resultConditions.id = "result-conditions";
        resultConditions.innerText = results.conditions;

        const resultFeels = document.createElement("div");
        resultFeels.id = "result-feels";
        resultFeels.innerHTML = "Feels like " + results.feels + "<span class='degree'>°C</span>";

        const resultPOP = document.createElement("div");
        resultPOP.id = "result-pop";
        resultPOP.innerHTML = "Precipitation: " + results.precipprob + "%";

        const resultHumidity = document.createElement("div");
        resultHumidity.id = "result-humidity";
        resultHumidity.innerHTML = "Humidity: " + results.humidity + "%";

        const resultWind = document.createElement("div");
        resultWind.id = "result-wind";
        resultWind.innerHTML = "Wind: " + results.wind + "km/h";

        resultExtra.appendChild(resultConditions);
        resultExtra.appendChild(resultFeels);
        resultExtra.appendChild(resultPOP);
        resultExtra.appendChild(resultHumidity);
        resultExtra.appendChild(resultWind);

        resultMain.appendChild(resultIcon);
        resultMain.appendChild(resultTemp);
        resultMain.appendChild(resultExtra);

        resultsContainer.appendChild(resultHeader);
        resultsContainer.appendChild(resultMain);
        document.querySelector(".secondary").addEventListener("click", () => switchUnits(results));
    } catch (error) {
        return null;
    }
}

const getIcon = (icon) => {
    switch(icon) {
        case "snowy":
            return snowIcon;
        case "rain":
            return rainIcon;
        case "fog":
            return fogIcon;
        case "wind":
            return windIcon;
        case "cloudy":
            return cloudyIcon;
        case "partly-cloudy-day":
            return pcdIcon;
        case "partly-cloudy-night":
            return pcnIcon;
        case "clear-day":
            return cldIcon;
        case "clear-night":
            return clnIcon;
    }
}

const switchUnits = (results) => {
    let resultTemp = document.getElementById("result-temp");
    let resultFeels = document.getElementById("result-feels");
    let resultWind = document.getElementById("result-wind");

    if (currentUnit === "C") {
        resultTemp.innerHTML = results.tempUSA + "<span class='degree'>°F</span> | <span class='secondary'>°C</span>";
        resultFeels.innerHTML = "Feels like " + results.feelsUSA + "<span class='degree'>°F</span>";
        resultWind.innerHTML = "Wind: " + results.windUSA + "mph";
        currentUnit = "F";
    } else if (currentUnit === "F") {
        resultTemp.innerHTML = results.temp + "<span class='degree'>°C</span> | <span class='secondary'>°F</span>";
        resultFeels.innerHTML = "Feels like " + results.feels + "<span class='degree'>°C</span>";
        resultWind.innerHTML = "Wind: " + results.wind + "km/h";
        currentUnit = "C";
    }

    document.querySelector(".secondary").addEventListener("click", () => switchUnits(results));
}