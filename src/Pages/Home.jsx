import React, { useEffect, useState } from 'react'
import UserData from '../Components/UserData';
import './home.css'


function Home() {
    const API = "https://fakestoreapi.com/users";

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const fetchUsers = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.length > 0) {
                setUsers(data);
                setFilteredUsers(data); // Set filteredUsers initially with all users
            }
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    };

    const filterUsersByCity = (city) => {
        const filtered = users.filter((user) => user.address.city.toLowerCase() === city.toLowerCase());
        setFilteredUsers(filtered);
    };

   const filterUsersByFirstName = (firstName) => {
    console.log("Original Users:", users);

    const filtered = users.filter((user) => {
        const userFirstName = user.name?.first;
        
        // Check if userFirstName is defined before attempting to trim and compare
        if (userFirstName !== undefined) {
            const trimmedUserFirstName = userFirstName.trim();
            return trimmedUserFirstName.toLowerCase().includes(firstName.toLowerCase().trim());
        }

        return false; // If user.name.first is undefined, exclude the user from the filtered array
    });

    console.log("Filtered Users:", filtered);

    setFilteredUsers([...filtered]); // Using the spread operator to create a new array
};



    // const handleSearchChange = (event) => {
    //     setSearchValue(event.target.value);
    //     console.log("Search Value:", event.target.value);
    // };
    
    // const handleSearchClick = () => {
    //     console.log("Search Clicked with Value:", searchValue);
    //     filterUsersByFirstName(searchValue);
    // };
    const requestSearch = (searchedVal) => {
      const filteredRows = result.filter((row) => {
          return row.customer.toString().toLowerCase().includes(searchedVal.toString().toLowerCase());
      });
      if (searchedVal.length < 1) {
          setFilter(data)
      }
      else {
          setFilter(filteredRows)
      }
    };

    useEffect(() => {
        fetchUsers(API);
    }, []);

    return (
      
        <>
        <h1 className='justify-content-center text-center'>USER DATA DISPLAY</h1>
           <div className='search'>
                <input
                style={{width:"500px"}}
                    type="text"
                    placeholder="Search by First Name"
                    value={searchValue}
                    onChange={requestSearch}
                />
                <button style={{marginLeft:"20px"}} className='btn btn-primary rounded' onClick={requestSearch}>Search</button>
                <button style={{marginLeft:"20px"}} className='btn btn-primary rounded' onClick={() => filterUsersByCity('kilcoole')}>Filter Kilcoole</button>

           </div>
           <div className='tb'>
                <table className='tab'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <UserData users={filteredUsers} />
                    </tbody>
                </table>
           </div>
        </>
    );
}

export default Home;