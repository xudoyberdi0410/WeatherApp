const apiKey = '47b391878b6c4ae3e94d7546bcb7ff95'
const inputPlace = document.querySelector('.wrapper__search input')
inputPlace.oninput = search
inputPlace.onblur = (event) => {
    if (event.target.value == '') document.querySelector('.search__searchResult').style.visibility = 'hidden'
}

function search(event) {
    document.querySelector('.search__searchResult').style.visibility = 'inherit'
    if (event.target.value == '') {
        document.querySelector('.search__searchResult').style.visibility = 'hidden'
        document.querySelector('.search__searchResult').innerHTML = ''
    } else{
        fetch('./city.list.json')
            .then(r => r.json())
            .then(r => {
                filtered = Array.from(r.filter(getId)).sort().slice(0, 100)
                let search_results = document.querySelector('.search__searchResult')
                search_results.innerHTML = ''
                for (let i in filtered) {
                    search_results.innerHTML += `<div onclick="getWeather(${filtered[i].coord.lat}, ${filtered[i].coord.lon})">${filtered[i].name}, ${filtered[i].country}</div>`
                }
    
        })
        function getId(data) {
            return  data.name.includes(event.target.value)
            
        }
    }

}
function getWeather(lat, lon){
    document.querySelector('.search__searchResult').style.visibility = 'hidden'
    document.querySelector('.search__searchResult').innerHTML = ''

    let cityName = document.querySelector('.wrapper__city-name span')
    let temp = document.querySelector('.wrapper__degree span')
    let descriptionImage = document.querySelector('.wrapper__description img')
    let descriptionText = document.querySelector('.wrapper__description span')
    let humidity = document.querySelector('.wrapper__hum span')
    let wind = document.querySelector('.wrapper__wind span')

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(r => r.json())
    .then(data => {
        cityName.innerHTML = data.name
        temp.innerHTML = data.main.temp
        descriptionImage.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        descriptionImage.alt = data.weather[0].description
        descriptionText.innerHTML = descriptionImage.alt[0].toUpperCase() + descriptionImage.alt.slice(1)
        humidity.innerHTML = data.main.humidity
        wind.innerHTML = data.wind.speed
    })
}

getWeather(35.689499, 139.691711)