const NUMBER_OF_DAYS_TO_SHOW = 4;

const weatherData = [
    // 8
    {
        date: 1549569600000,
        temperature: {
            night: -12,
            day: -5
        },
        cloudiness: false,
        snow: true,
        rain: false
    },
    //9
    {
        date: 1549656000000,
        temperature: {
            night: -10,
            day: -6
        },
        cloudiness: true,
        snow: false,
        rain: false
    },
    // 10
    {
        date: 1549742400000,
        temperature: {
            night: -12,
            day: -8
        },
        cloudiness: false,
        snow: true,
        rain: false
    },
    // 11
    {
        date: 1549828800000,
        temperature: {
            night: -14,
            day: -9
        },
        cloudiness: false,
        snow: true,
        rain: false
    },
    // 12
    {
        date: 1549915200000,
        temperature: {
            night: -16,
            day: -9
        },
        cloudiness: false,
        snow: true,
        rain: false
    },
    // 13
    {
        date: 1550001600000,
        temperature: {
            night: -11,
            day: -9
        },
        cloudiness: false,
        snow: false,
        rain: false
    },
    // 14
    {
        date: 1550088000000,
        temperature: {
            night: -12,
            day: -7
        },
        cloudiness: false,
        snow: true,
        rain: true
    },
    //15
    {
        date: 1550174400000,
        temperature: {
            night: -7,
            day: -6
        },
        cloudiness: false,
        snow: false,
        rain: true
    }
];

const getAdditionalInfo = ({ snow, rain }) => {
    return (
        (snow && rain && "дождь со снегом") ||
        (snow && "снег") ||
        (rain && "дождь") ||
        "без осадков"
    );
};

const getWeatherIcon = ({ snow, rain, cloudiness }) => {
    return (
        (snow && rain && "sleet") ||
        (snow && "snow") ||
        (rain && "rain") ||
        (cloudiness && "cloudy") ||
        "sunny"
    );
};

const areDatesEqual = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth();

const getDate = dateInMilliSeconds => {
    const date = new Date(dateInMilliSeconds);
    const days = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота"
    ];
    const isToday = areDatesEqual(date, new Date());
    console.log("isT", isToday);
    const months = [
        "январь",
        "февраль",
        "март",
        "апрель",
        "май",
        "июнь",
        "июль",
        "август",
        "сентябрь",
        "октябрь",
        "ноябрь",
        "декабря"
    ];
    return {
        day: isToday ? "Сегодня" : days[date.getDay()],
        date: date.getDate(),
        month: months[date.getMonth()]
    };
};

const addWeatherToList = weather => {
    const list = document.querySelector(".container");
    const forecast = document.createElement("div");

    const dayClass = document.createAttribute("class");
    dayClass.value = `day ${getWeatherIcon(weather)}`;

    forecast.setAttributeNode(dayClass);
    const date = getDate(weather.date);
    forecast.innerHTML = `
        <p class="day-of-the-week">${date.day}</p>
        <p class="date">${date.date} ${date.month}</p>
        <p class="temperature-day">днем ${weather.temperature.day}&deg;</p>
        <p class="temperature-night">ночью ${weather.temperature.night}&deg;</p>
        <p class="additional-info">${getAdditionalInfo(weather)}</p>
    `;
    list.appendChild(forecast);
};

let displayStartPosition = 3;

const getDataForDisplay = (data, startIndex) => {
    if (!data) return;
    return data.slice(startIndex, startIndex + NUMBER_OF_DAYS_TO_SHOW);
};

const handleArrowClick = (rightDirection = true) => {
    displayStartPosition = rightDirection
        ? displayStartPosition + 1
        : displayStartPosition - 1;
    getDataForDisplay(weatherData, displayStartPosition);
    renderForecast();
};

const renderForecast = () => {
    const container = document.querySelector(".container");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    const data = getDataForDisplay(weatherData, displayStartPosition);

    if (weatherData.length <= displayStartPosition + NUMBER_OF_DAYS_TO_SHOW) {
        document
            .getElementById("right-nav-arrow")
            .setAttribute("class", "right disabled");
    } else if (displayStartPosition - 1 < 0) {
        document
            .getElementById("left-nav-arrow")
            .setAttribute("class", "left disabled");
    } else {
        document.getElementById("right-nav-arrow").setAttribute("class", "right");
        document.getElementById("left-nav-arrow").setAttribute("class", "left");
    }

    return data.forEach(weatherData => addWeatherToList(weatherData));
};

document
    .querySelector("#right-nav-arrow")
    .addEventListener("click", handleArrowClick);
document
    .querySelector("#left-nav-arrow")
    .addEventListener("click", () => handleArrowClick(false));
window.addEventListener("DOMContentLoaded", renderForecast);
