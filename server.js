import express from 'express'
import {search_anime, top_air, anime_info, get_anime_server,get_recent_release,get_popular,get_schedule,get_banner} from './api.js'
import path from 'path'
import {fileURLToPath } from "url"
import cors from 'cors'

const app = express()
const port = 3001
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from http://localhost:3001  };
}
app.use(cors(corsOptions));



app.get('/api/search', async (req, res) => {
    try{
        const name = req.query["id"]
        const data = await search_anime(name)
        res.json(data)
    }
    catch (err){
        throw err
    }

})
app.get('/api', (req, res) => {
    res.send("API WORKING")
})

app.get('/api/top-airing' , async (req,res) => {

    const data = await top_air()
    res.json(data.results)


})


app.get('/api/info', async(req, res) => {

    //console.log(req.query)

    const data = await anime_info(req.query.id)
    //console.log(data)
    res.json(data)
})

// /api/stream-link

app.get('/api/eplink', async(req,res) => {

    const data = await get_anime_server(req.query.id) //?id=anime-ep-id
    res.json(data)
})

app.get('/api/recent', async(req,res) => {

    const data = await get_recent_release()
    //console.log(data)
    res.json(data)
})

app.get('/api/popular',async(req,res) => {

    const data = await get_popular()
    //console.log(data.data)
    const resultobject ={results: data.data}
    res.json(resultobject)
})




app.get('/api/schedule', async(req, res) => {

    const data = await get_schedule()
    //console.log(data)
    res.json(data)
})


app.get('/api/banner', async(req,res) => {

    //console.log(req.query.id)

    const link = await get_banner(req.query.id)
    //console.log(link)

    res.json(link)
})














app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})