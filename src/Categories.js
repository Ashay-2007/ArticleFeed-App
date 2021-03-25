import React, { useState } from 'react'
import { useStateValue } from './StateProvider';

function Categories() {
    const [articles, setArticles] = useState([])
    const [{user}] = useStateValue();
    
    return (
        <div>
            {/* This component loads articles according to their respective Categories */}

        </div>
    )
}

export default Categories
