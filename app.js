const express = require('express')
const app = express()
const path = require('path')
const {Router} = require('express')
app.set('views', path.join(__dirname , 'views'))
app.set('view engine' , 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
const file = require('fs')
PORT = 3000
const time = new Date()


const newMessageRoute = Router()

newMessageRoute.get("/", (req, res)=>{
    res.render('form')
   
})
// const messages = []
app.use((req, res, next)=>{
    console.log(req.method, req.url , time)
    next()
})

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res)=>{
    file.readFile('message.json', 'utf-8' , (err, data)=>{
        messages = JSON.parse(data)
        res.render('index', {links:messages})

    })

    })

app.use('/new', newMessageRoute)

app.post('/message', (req, res)=> {
    file.readFile('message.json', 'utf-8' , (err, data)=>{
        const newMessage = {
            title: req.body.title,
            message: req.body.message,
            sender: req.body.name,
            date: req.body.date
        }

        messages = JSON.parse(data)

        messages.push(newMessage)
        file.writeFile('./message.json', JSON.stringify(messages), (err)=>{
            console.log('Message Sent')
        })

    })




    res.redirect("/")
})

app.listen(PORT, ()=>{
    console.log(`The server started running on PORT: ${PORT}`)
})