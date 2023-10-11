import MovieIdPage from "../pages/MovieIdPage/MovieIdPage";
import Poster from "../pages/Poster/Poster";

export const publicRoutes = [
    {path: '/', component: Poster},          
    {path: '/Poster', component:  Poster},
    {path: '/Movies/:id', component: MovieIdPage},
]