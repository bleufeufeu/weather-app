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
        feels: data.currentConditions.feelslike,
        precipprob: data.currentConditions.precipprob,
        humidity: data.currentConditions.humidity,
        wind: data.currentConditions.windspeed,
        sunrise: data.currentConditions.sunrise,
        sunset: data.currentConditions.sunset,
        conditions: data.currentConditions.conditions,
        icon: data.currentConditions.icon
    }
}

export { getWeather }