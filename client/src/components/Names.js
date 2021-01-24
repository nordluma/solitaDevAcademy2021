import { useState, useEffect } from "react";

function Names() {
    const [names, setNames] = useState([]);
    const [totalAmount, setTotalAmount] = useState();
    const [sort, setSort] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredNames, setFilteredNames] = useState([]);

    useEffect(() => {
        const getNames = async () => {
            const namesFromServer = await fetchNames();
            setNames(namesFromServer.names);
            getTotalAmount(namesFromServer.names);
        };

        // Total amount of all the names
        const getTotalAmount = async (names) => {
            const sumOfNames = names.reduce((a, b) => a + b.amount, 0);
            setTotalAmount(sumOfNames);
        };

        getNames();
    }, []);

    useEffect(() => {
        // Search/filter names
        setFilteredNames(
            names.filter((n) => {
                return n.name.toLowerCase().includes(search.toLowerCase());
            })
        );
    }, [search, names]);

    // Fetch names from API
    const fetchNames = async () => {
        const res = await fetch("/api/names");
        const data = await res.json();
        return data;
    };

    // Sort by popularity
    const sortByPopularity = filteredNames.sort(
        (a, b) => Number(b.amount) - Number(a.amount)
    );

    const sortedByPopularity = sortByPopularity.map((name, index) => (
        <div className="name" key={index}>
            <p>{name.name}</p>
            <p>{name.amount}</p>
        </div>
    ));

    // Sort in alphabetical order
    const sortByAlphabet = filteredNames.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );

    const sortedByAlphabet = sortByAlphabet.map((name, index) => (
        <div className="name" key={index}>
            <p>{name.name}</p>
            <p>{name.amount}</p>
        </div>
    ));

    // Handle Sort
    const handleSort = () => {
        !sort ? setSort(true) : setSort(false);
    };

    return (
        <div className="name-list">
            <h2>Popular Names</h2>
            <input
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn" onClick={handleSort}>
                {sort ? "Sort By Popularity" : "Sort by Alphabet"}
            </button>
            {sort ? sortedByAlphabet : sortedByPopularity}
            <div className="name">
                <h4>Total Amount of Names: </h4>
                <h4>{totalAmount}</h4>
            </div>
        </div>
    );
}

export default Names;
