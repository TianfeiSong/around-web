import React, { useState } from 'react';
import { SEARCH_KEY } from "../constants";
import { Radio, Input } from "antd";

const { Search } = Input;

function SearchBar(props) {
    const [searchType, setSearchType] = useState(SEARCH_KEY.all);
    const [error, setError] = useState("");

    // case1: type === all -> inform Home to fetch data
    const changeSearchType = (e) => {
        const searchType = e.target.value;
        setSearchType(searchType);
        setError("");
        if (searchType === SEARCH_KEY.all) {
            props.handleSearch({ type: SEARCH_KEY.all, keyword: ""});
        }
    };

    // case2: keyword / user + search keyword
    const handleSearch = ( value ) => {
        //case1: has error
        if (searchType !== SEARCH_KEY.all && value === "") {
            setError("Please input your search keyword!");
            return;
        }
        // setError("");
        // case2 : do search
        // inform HOME to fetch data
        // -> pass search word + type => Home props.fn
        props.handleSearch({ type: searchType, keyword: value});
    }
    return (
        <div className="search-bar">
            <Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
                disabled={searchType === SEARCH_KEY.all}
            />
            <p className="error-msg">{error}</p>

            <Radio.Group
                onChange={changeSearchType}
                value={searchType}
                className="search-type-group"
            >
                <Radio value={SEARCH_KEY.all}>All</Radio>
                <Radio value={SEARCH_KEY.keyword}>Keyword</Radio>
                <Radio value={SEARCH_KEY.user}>User</Radio>
            </Radio.Group>
        </div>
    );
}

export default SearchBar;