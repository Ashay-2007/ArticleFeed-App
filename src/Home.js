import React from 'react';
import "./Home.css";
import Card from './Card';
import { Link } from 'react-router-dom';


function Home() {
    return (
        <div>
            <img 
				className="home__image"
                src="https://images.unsplash.com/photo-1604696734183-cc0ab548b909?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
                alt =""
            />
            
            <div className="home__cards bd-grid">
                <Link to="/sports">
                    <Card title="Sports" img="https://images.unsplash.com/photo-1517649763962-0c623066013b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" />
                </Link>
                <Link to="/politics">
                    <Card title="Politics" img="https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=995&q=80"/>
                </Link>
                <Link to="/space">
                    <Card title="Space" img="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80" />                
                </Link>
                <Link to="technology">
                    <Card title="Technology" img="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" />
                </Link>
                <Link to="travel">
                    <Card title="Travel" img="https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1093&q=80" />
                </Link>
                <Link to="/fashion">
                    <Card title="Fashion" img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" />
                </Link>
                
                
                
            </div>
        </div>
        
        
    )
}

export default Home;
