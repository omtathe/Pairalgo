import express from "express";
import path from "path"
import { ENV } from "./lib/env.js";

const app = express();

const __dirname = path.resolve()


app.get("/health",(req,res) => {
    res.status(200).json({msg:"api is running"})
} );

app.get("/books",(req,res) => {
    res.status(200).json({msg:"this is the books endpoint"})
} );


// make our app ready for deployment
if (ENV.NODE_ENV ="production")
{   
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
   
    app.get("*",(req,res) => {
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
    });

}

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});

fetch(import.meta.env.VITE_API_URL + "/api/data")
  .then(res => res.json())
  .then(data => console.log(data));

