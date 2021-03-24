import React from 'react';
import Article from './Article';
import "./Dashboard.css";

function Dashboard() {
    return (
        <div className="dashboard">
            
            <div className="dashboard__articles">
                <p>Welcome Ashay ! Here are the article as per your preferences.</p>
                <Article username="Ashay" date="March 24, 2021 | UPDATED: March 24, 2021 11:00 IST"/>
                <Article username="Ashay" date="March 24, 2021 | UPDATED: March 24, 2021 11:00 IST"/>
                <Article username="Ashay" date="March 24, 2021 | UPDATED: March 24, 2021 11:00 IST"/>
                <Article username="Ashay" date="March 24, 2021 | UPDATED: March 24, 2021 11:00 IST"/>    
            </div>
        </div>
    )
}

export default Dashboard
