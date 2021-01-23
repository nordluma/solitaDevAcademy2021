import { useState, useEffect } from "react";

function Names() {
    const [names, setNames] = useState([]);

    useEffect(() => {
        const getNames = async () => {
            const namesFromServer = await fetchNames();
            setNames(namesFromServer.names);
        };

        getNames();
    }, []);

    // Fetch names from API
    const fetchNames = async () => {
        const res = await fetch("/api/names");
        const data = await res.json();
        return data;
    };

    // List names and amounts

    // Sort by popularity

    // Sort in alphabetical order

    // Total amount of all the names

    return (
        <div>
            <h2>Popular Names</h2>
            <button>Sort by Alphabet</button>

            {names.map((name, index) => (
                <div key={index}>
                    <p>{name.name}</p>
                    <p>{name.amount}</p>
                </div>
            ))}
        </div>
    );
}

export default Names;
