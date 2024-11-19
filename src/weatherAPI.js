const getWeather = async (location, unit) => {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=WQ7MZBM3JPFTFHSVJ6MGGQ84M `, {mode: 'cors'});

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }

        const data = await response.json();
        console.log(processData(data));
        const returnData = processData(data);
        return returnData;
    } catch (error) {
        return null;
    }
}

const processData = (data) => {
    return {
        location: data.resolvedAddress,
        time: data.currentConditions.datetime,
        temp: data.currentConditions.temp,
        tempUSA: Math.round(((data.currentConditions.temp * (9/5) + 32) * 10) / 10),
        feels: data.currentConditions.feelslike,
        feelsUSA: Math.round(((data.currentConditions.feelslike * (9/5) + 32))),
        precipprob: data.currentConditions.precipprob,
        humidity: data.currentConditions.humidity,
        wind: data.currentConditions.windspeed,
        windUSA: Math.round(data.currentConditions.windspeed * 0.62137),
        sunrise: data.currentConditions.sunrise,
        sunset: data.currentConditions.sunset,
        conditions: data.currentConditions.conditions,
        icon: data.currentConditions.icon
    }
}

export { getWeather }