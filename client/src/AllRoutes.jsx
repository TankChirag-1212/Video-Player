import React from 'react'
import { Routes, Route} from 'react-router-dom';
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import UserActivity from './pages/UserActivity/UserActivity';
import Contact from './pages/ContactUs/Contact';

const AllRoutes = () => {
    return (
        <Routes>
            <Route exact path='/' Component={Home}/>
            <Route path='/Auth' Component={Auth}/>
            <Route path='/UserAct/:id' Component={UserActivity}/>
            <Route path='/ContactUs' Component={Contact}/>
        </Routes>
    )
}

export default AllRoutes