const {exec,spawn} = require('child_process')

// Ejecuta un comando en consola
exec('ls -la',(err,stdout,sterr)=> {
  if(err) {
    console.error(err)
    return false
  }

  console.log(stdout)
})

let proceso = spawn('ls' , ['-la']);

console.log(proceso.pid);
console.log(proceso.connected);

proceso.stdout.on('data', (dato) => {
  console.log(dato)
})
