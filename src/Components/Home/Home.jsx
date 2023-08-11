import React,{useEffect, useState} from 'react'
import "./Home.scss"
import axios from 'axios'
import { Link } from 'react-router-dom';
import {BiPlay} from "react-icons/bi";
import {AiOutlinePlus} from 'react-icons/ai'

// https://api.themoviedb.org/3/movie/popular?api_key=2a3797c79b02b13ff0beaff4631d68ee&language=en-US&page=1
const url = "https://api.themoviedb.org/3/movie/";
const urlkey = "?api_key=2a3797c79b02b13ff0beaff4631d68ee&language=en-US&page=1";
const imgurl = "https://image.tmdb.org/t/p/original";
const genrekey = `https://api.themoviedb.org/3/genre/movie/list${urlkey}language=en`;

const Card = ({img})=>(
    <img className="card" src={img} alt="cover" />
)

const Row = ({title,arr=[],})=>(
  <div className='row'>
    <h2>{title}</h2>
    <div>
      {
        arr.map((item,index)=>(
          <Card key={index} img={`${imgurl}${item.poster_path}`}/>
        ))
      }

    </div>
  </div>
)

const Home = ()=> { 
    
  const[upcoming,setUpcoming] = useState([]);
  const[nowplaying,setNowplaying] = useState([]);
  const[popular,setPopular] = useState([]);
  const[toprated,setToprated] = useState([]);
  const[genre,setGenre] = useState([]);

  useEffect(() => {
    const fetchUpcomingMovies = async ()=>{
      const {data : {results}} =  await axios.get(`${url}upcoming${urlkey}`);
      setUpcoming(results);
    };
    fetchUpcomingMovies();
  }, [upcoming])

  useEffect(() => {
    const fetchnowPlayingmovies = async ()=>{
      const {data : {results}} =  await axios.get(`${url}now_playing${urlkey}`);
      setNowplaying(results);
    };
    fetchnowPlayingmovies();
  }, [nowplaying])

  useEffect(() => {
    const fetchPopularmovies = async ()=>{
      const {data : {results}} =  await axios.get(`${url}popular${urlkey}`);
      setPopular(results);
    };
    fetchPopularmovies();
  }, [popular])

  useEffect(() => {
    const fetchTopratedmovies = async ()=>{
      const {data : {results}} =  await axios.get(`${url}top_rated${urlkey}`);
      setToprated(results);
    };
    fetchTopratedmovies();
  }, [toprated])

  useEffect(() => {
    const fetchGenre = async ()=>{
      const {data : {genres}} =  await axios.get(`${genrekey}`);
      setGenre(genres);
    };
    fetchGenre();
  }, [genre])


    return (
      <section className='home'>

      <div className='banner' 
        style={{backgroundImage:popular[0]?`url(${imgurl}${popular[0].poster_path})`:"rgb(16,16,16"}}
      >
      {popular[0] && <h1>{popular[0].original_title}</h1>}
      {popular[0] && <p>{popular[0].overview}</p>}

      <div>
        <button> <BiPlay/> Play</button>
        <button>My List <AiOutlinePlus/></button>
      </div>
      </div>

      <Row title={"Upcoming"} arr = {upcoming}/>
      <Row title={"Now playing"} arr={nowplaying}/>
      <Row title={"Popular"} arr={popular}/>
      <Row title={"Top Rated"} arr={toprated}/>
      
      <div className='genreBox'> 
        {
          genre.map((item)=>(
            <Link id={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
          ))
        }
      </div>

    </section>
    )
    
}

export default Home;