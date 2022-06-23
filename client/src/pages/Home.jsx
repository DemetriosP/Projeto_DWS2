import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";

import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {publicRequest} from "../requestMethods";

const Home = () => {

    //const user = useSelector((state) => state.user.currentUser.username);
    const user = "luigi";

    const [userWhislistProducts, setUserWhislistProducts] = useState([]);
    const [addWhislist, setAddWhislist] = useState([]);
    const [WhislistId, setWhislistId] = useState([]);

    /*
    useEffect(() => {
        const getUserWhislistProducts = async () => {
            try {
                const res = await publicRequest.get("/whislists/find/" + user);
                setUserWhislistProducts(res.data.products);
            } catch (err) {
                console.log(err.response.data)
            }
        };
        getUserWhislistProducts();
    });

    useEffect(() => {
        const getWhislistId = async () => {
            try {
                const res = await publicRequest.get("/whislists/find/" + user);
                setWhislistId(res.data._id);
            } catch (err) {
                console.log(err.response.data)
            }
        };
        getWhislistId();
    });

    useEffect(() => {
        const addWhislist = async () => {
            try {
                const res = await publicRequest.put("/whislists/" + WhislistId, {
                    products : userWhislistProducts,
                    quantity : 2,
                });
                setAddWhislist(res.data);
            } catch (err) {
                console.log(err.response.data)
            }
        };
        addWhislist();
    });

     */

    //console.log(addWhislist)


    return (
        <div>
            <Navbar/>
            <Announcement/>
            <Slider/>
            <Categories/>
            <Products/>
            <Newsletter/>
            <Footer/>
        </div>
    );
};

export default Home;
