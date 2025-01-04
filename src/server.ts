import app from "./app";
import config from "./config/config";




const server = app.listen(Number(config.server.port), () => {
  console.log(`Server running on http://localhost:${config.server.port}`);
});

process.on('SIGNINT',()=>{
  server.close(()=>console.log(`Exit Server`))
})



