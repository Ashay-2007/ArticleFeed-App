import React from 'react';
import "./Home.css";
import Card from './Card';
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpg";
import img4 from "./images/img4.jpg";
import img5 from "./images/img5.jpg";
import img7 from "./images/img7.jpg";
import img8 from "./images/img8.jpg";
import img9 from "./images/img9.jpg";


function Home() {
    return (
        <div>
            <img 
				className="home__image"
                src={img2}
                alt =""
            />
            
            <div className="home__cards bd-grid">
                <Card img={img3} title="Sports"/>
                <Card img={img4} title="Politics"/>
                <Card img={img5} title="Space"/>
                <Card img={img7} title="Technology"/>
                <Card img={img8} title="Travel"/>
                <Card img={img9} title="Fashion"/>
            </div>
        </div>
        
        
    )
}

export default Home;
