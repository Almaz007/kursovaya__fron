import { Routes, Route, Navigate } from "react-router-dom";
import MovieIdPage from "../pages/MovieIdPage/MovieIdPage";
import Poster from "../pages/Poster/Poster";
import { publicRoutes } from '../router/index';

const AppRouter = () => {
    return ( 
       <Routes>
            {/* {
                publicRoutes.map(route => {
                    <Route key={route.path} path={route.path} element={<route.component/>}/>
                })
            } */}
            <Route path="/" element={<Poster/>}/>
            <Route path="/Poster" element={<Poster/>}/>
            <Route path="/Movie/:id/:selectedDate/:startDay" element={<MovieIdPage/>}/>
            <Route path="*" element={<Navigate to='/' replace/>}/>
       </Routes>
   
    );
}
 
export default AppRouter;