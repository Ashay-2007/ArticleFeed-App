import React from 'react';
import Article from './Article';
import "./Dashboard.css";
import { useStateValue } from './StateProvider';

function Dashboard() {
    const [{user}] = useStateValue();
    return (
        <div className="dashboard">
            
            <div className="dashboard__articles">
                <p>Welcome {!user? "Guest" : user.displayName} ! Here are the article as per your preferences.</p>
                <Article username="Ashay" date="March 24, 2021 | UPDATED: March 24, 2021 11:00 IST"/>
                <Article username="Ashay" date="March 24, 2021 | UPDATED: March 24, 2021 11:00 IST"/>
                <Article username="Ashay" date="March 24, 2021 | UPDATED: March 24, 2021 11:00 IST"/>
                <Article username="Ashay" date="March 24, 2021 | UPDATED: March 24, 2021 11:00 IST"/>    
            </div>
        </div>
    )
}

export default Dashboard
