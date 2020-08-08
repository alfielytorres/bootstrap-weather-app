const express = require('express')
const getCoordinates = require('../src/utils/geocode')
const getWeather = require('../src/utils/weather')
const path = require('path')
const hbs = require('hbs')

const app = express()

const port = process.env.PORT || 3000

//paths 
const publicDirectoryPath = path.join(__dirname,'../public')  
const viewsPath = path.join(__dirname,'../templates/views')
const bootstrapPath = path.join(__dirname,'../node_modules/bootstrap/dist')  
const partialsPath = path.join(__dirname,'../templates/partials')

//set up handlebars
app.set('views', viewsPath) // views property assigned to viewsPath
app.set('view engine','hbs') // views engine property assigned to handlebars
hbs.registerPartials(partialsPath)

//set up static directory 
app.use(express.static(publicDirectoryPath))
app.use('/dist',express.static(bootstrapPath))

//index

//date 

let date = new Date()
let dateYear = date.getFullYear()

app.get('',(req,res)=>{
    res.render('index',{
        title:'Enter a location',
        author:'Alfie Torres',
        dateYear
    })
})

//about page
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        author:'Alfie Torres',
        dateYear
    })
})


//help page
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Get Help ',
        author:'Alfie Torres',
        helpText:'for any bugs email me at alfietorresbusiness@gmail.com',
        dateYear

    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'please provide an address='
        })
    }else{
        getCoordinates(req.query.address, (error, {latitude, longitude, place_name}={})=>{ //event loop 1 
            if(error){
                return res.send(error)
            }else{
                getWeather(latitude, longitude, (error, {description,temperature,feelslike,country}={})=>{
                    if(error){
                        return res.send(error)
                    }else{
                        return res.send({
                            country,
                            location:place_name,
                            description,
                            temperature,
                            feelslike

                        })
                    }
                }) 
                
            }
        })   

       
    }
    
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        author:'Alfie Torres',
        error:'Incorrect Help Article'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        author:'Alfie Torres',
        error:'Page not found'
    })
})


app.listen(port, ()=>{
    console.log(`app is at port ${port}`)
})



// if(!process.argv[2]){
//     console.log('Please provide an address')
// }else{
//     getCoordinates(process.argv[2], (error, {latitude, longitude}={})=>{ //event loop 1 
//         if(error){
//             console.log(error)
//         }else{
//             getWeather(latitude, longitude, (error, data)=>{
//                 if(error){
//                     console.log(error)
//                 }else{
//                     console.log(data)
//                 }
//             }) 
            
//         }
//     })    
// }
