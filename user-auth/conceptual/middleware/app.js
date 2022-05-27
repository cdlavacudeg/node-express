const express=require('express')

const app = express()

app.use(middleware1)// initilize middleware1 adign to the chain in all of the requests
app.use(middleware3)
app.use(middleware2)// order matters

function middleware1(req,res,next) {
    console.log('I am a middleware')

    const errObj=new Error('I am an error')
    next(errObj)
}

function middleware2(req,res,next) {
    console.log('I am a second middleware')
    next()
}

function middleware3(req,res,next) {
    console.log('I am a third middleware')
    next()
}

function middleware4(req,res,next) {
    console.log('I am a fourth middleware')
    next()
}

// Error handling

function errorHandler(err,req,res,next){
    if(err){
        res.send('<h1> There was an error, please try again</h1>')
    }
}

app.get('/',middleware4,(req,res,next)=>{
    console.log('I am the standard Express function')
    res.send('<h1>Hello World</h1>')
})

app.get('/no4',(req,res,next)=>{
    console.log('I am the standard Express function')
    res.send('<h1>Hello World</h1>')
})


app.use(errorHandler)
app.listen(3000)
