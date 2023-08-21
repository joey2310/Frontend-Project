import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import  InputBase  from '@material-ui/core/InputBase';
import './SearchBar.css';
function SearchBar() {
    return (
        <div className='search__bar'>
            <InputBase
                placeholder="Search" className='input__base'
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="button" className='icon__button' aria-label="search">
                <SearchIcon />
            </IconButton>
        </div>
    )
}

export default SearchBar