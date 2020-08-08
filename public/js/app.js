


const form = document.querySelector('#location-form')
const search = document.querySelector('input')
const output = document.querySelector('#output')

const getWeather = (country) =>{
    url = `/weather?address=${country}`
    fetch(url).then((response)=>{
        if(response.status ===200){
            return response.json()
        }else{
            throw new Error('No country found')
        }
    }).then(({description,country, feelslike,location,temperature})=>{

        createCard(description,country,feelslike,location,temperature)
        
    }).catch((error)=>{
        createCard('No Country Found','Try Again!',undefined,undefined,undefined)
    })
}




form.addEventListener('submit',(e)=>{
    output.textContent=''
    const loader = document.createElement('div')
    loader.setAttribute('class','spinner-border text-primary')
    loader.setAttribute('role','status')
    output.appendChild(loader)
    
    e.preventDefault()
    getWeather(search.value)
} )



const createCard = (description, country, feelslike, location, temperature) => {
    const card = document.createElement('div')
    card.setAttribute('class','card')

    const cardHeader = document.createElement('h5')
    cardHeader.setAttribute('class','card-header')

    const cardBody = document.createElement('div')
    cardBody.setAttribute('class','card-body')
    
    const cardTitle = document.createElement('h5')
    cardTitle.setAttribute('class','card-title')

    const cardText = document.createElement('p')
    cardText.setAttribute('class','card-text')

    if(description && country && feelslike && location && temperature){
        cardHeader.textContent=description
        cardTitle.textContent=country
        cardText.textContent = `Feels like ${feelslike} °C, but temperature is actually ${temperature} °C  @ ${location}`
        
    }else{
        cardHeader.textContent=description
        cardTitle.textContent=country
    }
    output.textContent=''
    output.appendChild(card)
    card.appendChild(cardHeader)
    card.appendChild(cardBody)
    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardText)
}