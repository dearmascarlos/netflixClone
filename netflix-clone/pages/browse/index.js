import { useEffect, useState } from "react";
import requests from "@/services/requests";
import NavBar from "./navBar";
import Section from "./section";
import Carousel from "./carousel";

const baseURL = 'https://api.themoviedb.org/3'
const imageURL = 'https://image.tmdb.org/t/p/original'


const User = () => {

  const [heroMovie, setHeroMovie] = useState()
  const [topMovies, setTopMovies] = useState()
  const [topTv, setTopTv] = useState()


  useEffect(() => {
    fetch(`${baseURL}${requests.fetchTopRated}`).then(res => res.json()).then((data) => {
      setHeroMovie(data.results[0])
    })
  }, [])

  useEffect(() => {
    fetch(`${baseURL}${requests.fetchTrendingMovies}`).then(res => res.json()).then((data) => {
      setTopMovies(data.results)
      // console.log(data.results);
    })
  }, [])

  useEffect(() => {
    fetch(`${baseURL}${requests.fetchTrendingTv}`).then(res => res.json()).then((data) => {
      setTopTv(data.results)
      // console.log(data.results);
    })
  }, [])
  
    return (
        <div className="bg-black w-screen h-screen flex flex-col px-8">
           <NavBar/>
           <Section heroMovie={heroMovie}/>
           <div className="absolute bg-black w-screen h-[100vh] max-h-[100vh] z-0 top-0 left-0 overflow-hidden opacity-40">
            <div className={'bg-cover bg-center w-full h-full'} style={{backgroundImage: `url(${imageURL}${heroMovie?.backdrop_path})`}}></div>
           </div>
           <Carousel topMovies={topMovies} title={'Movies'}/>
           <Carousel topMovies={topTv} title={'TV Series'}/>
        </div>
    );
}

export default User;