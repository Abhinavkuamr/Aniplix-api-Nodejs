import { ANIME,META } from '@consumet/extensions';
import axios from 'axios'

const gogoanime = new ANIME.Gogoanime();
const anilist = new META.Anilist();


export async function search_anime(name){
    try{
        const data = await gogoanime.search(name)
        return data
    }
    catch(err){
        throw err
    }
}


export async function top_air(){
    try{
        const data = await gogoanime.fetchTopAiring()
        return data
    }
    catch(err){
        throw err

    }
}


export async function anime_info(anime_id) {
    try {
      const data = await gogoanime.fetchAnimeInfo(anime_id);
  
      let cover = null;
      try {
        cover = await anilist.search(data.title);
        if (cover.status === 503) {
          cover = null; // Set cover to null if 503 response
        } else {
          cover = cover.results[0].cover;
        }
      } catch (anilistError) {
        console.error("Anilist API error:", anilistError);
      }
  
      data.cover = cover;
      //console.log("UPDATED", data);
      return data;
    } catch (err) {
      throw err;
    }
  }


export async function get_anime_server(anime_id){
    try{
        const data = await gogoanime.fetchEpisodeSources(anime_id)
       // const data = await axios.get(`https://api.consumet.org/anime/gogoanime/watch/${anime_id}`)
        //console.log("SERVER",data)
        return data
    }
    catch(err){
        throw err
    }
}

export async function get_recent_release(){
    try{
        const data = await gogoanime.fetchRecentEpisodes()
        return data
    }
    catch(err){
        throw err
    }
}

export async function get_popular() {
    try {
        //gogo-anime/popular
      const data = await axios.get("http://localhost:3003/popular");
      return data
    } 
    catch (error) {
      // Handle errors here
      console.error(error);
    }
  }


  export async function get_schedule(){


    try{
        const data = await anilist.fetchAiringSchedule(1,20,1696671600,1697243400);
        console.log("HERE")

        return data

    }
    catch(err)
    {
        console.log(err)

    }

  }

  export async function get_banner(name){

    try{

        const data = await anilist.search(name)
        const baner = data.results[0].cover
        return baner

    }
    catch(err)
    {
        return "ERROR"
    }

  }