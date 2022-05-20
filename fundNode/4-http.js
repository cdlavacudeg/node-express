const http=require('http')

http.createServer((req,res)=>{
  console.log('Nueva petición!')
  console.log(req.url)
  
  switch (req.url) {
    case '/hola':
      res.write('Hola, mundo probando '+req.url)
      res.end()
      break;

    default:
      res.write('Error 404: No se encuentra la pagina')
      res.end()
      break;
  }
  //res.writeHead(201, { 'content-type': 'text/html; charset=utf-8'})
  
  //Respuesta al usuario
  //res.write('Hola, HTTP Node.js')

  //res.end()
}).listen(3000)

console.log('Escuchando en puerto:3000')
