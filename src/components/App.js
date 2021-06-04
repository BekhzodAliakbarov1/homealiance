import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { Fragment } from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import About from './About/About'
import DateRender from './FiveSteps/Date'
import Description from './FiveSteps/Description'
import Footer from './Footer/Footer'
import Contact from './FiveSteps/Contact'
import Home from './Home/Home'
import Information from './Information/Information'
import Navbar from './Navbar/Navbar'
import NavbarMiddle from './Navbar/NavbarMiddle'
import NavbarMobile from './Navbar/NavbarMobile'
import Services from './Services/Services'
import Adress from './FiveSteps/Adress'
import Book from './FiveSteps/Book'
import MainAdmin from './admin-dashboard/MainAdmin';
import AdminAdd from './admin-dashboard/admin-add/AdminAdd';
import AdminEdit from './admin-dashboard/admin-add/AdminEdit';
import AdminDelete from './admin-dashboard/admin-add/AdminDelete';
import AdminRead from './admin-dashboard/readEach/AdminRead';
import OrderDelete from './admin-dashboard/admin-add/OrderDelete';
import OrderRead from './admin-dashboard/readEach/OrderRead';
import Orders from './OrdersList/Orders';
import OrderEdit from './admin-dashboard/admin-add/OrderEdit';

function App() {
    return (
        <Fragment>
            <Router>
                <ScrollToTop />
                <Navbar />
                <NavbarMiddle />
                <NavbarMobile />
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route exact path='/services'>
                        <Services />
                    </Route>
                    <Route exact path='/about'>
                        <About />
                    </Route>
                    <Route exact path='/services/:name'>
                        <Information />
                    </Route>
                    <Route exact path='/service/description'>
                        <Description />
                    </Route>
                    <Route exact path='/service/date'>
                        <DateRender />
                    </Route>
                    <Route exact path='/service/information'>
                        <Contact />
                    </Route>
                    <Route exact path='/service/location'>
                        <Adress />
                    </Route>
                    <Route exact path='/service/book'>
                        <Book />
                    </Route>
                    <Route exact path='/admin'>
                        <MainAdmin />
                    </Route>
                    {/* admin */}
                    <Route exact path="/admin/add/admin">
                        <AdminAdd />
                    </Route>
                    <Route exact path="/admin/edit/admin">
                        <AdminEdit />
                    </Route>
                    <Route exact path="/admin/delete/admin">
                        <AdminDelete />
                    </Route>
                    <Route exact path="/admin/read/admin">
                        <AdminRead />
                    </Route>

                    {/* order */}
                    <Route exact path="/admin/delete/orders">
                        <OrderDelete />
                    </Route>
                    <Route exact path="/admin/read/orders">
                        <OrderRead />
                    </Route>
                    <Route exact path="/admin/edit/orders">
                        <OrderEdit />
                    </Route>

                    <Route exact path="/orders">
                        <Orders />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </Fragment>
    )
}

export default App



function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 200);
    }, [pathname]);

    return null;
}