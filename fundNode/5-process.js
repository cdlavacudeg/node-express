//const process=require('process')

process.on('beforeExit', ()=>{
  console.log('El proceso va a terminar')
})

process.on('exit',()=>{
  console.log('El proceso ha finalizado')
})

process.on('uncaughtException',(err,origen)=>{
  console.error('Se ha olvidado capturar un error')
  console.error(err)
})

//process.on('unhandledRejection') // Promesas 
random_func()
