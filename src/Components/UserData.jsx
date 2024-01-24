import React from 'react'

function UserData({users}) {
  return (
    <>
      {users.map((curUser) => {
        const { id, name, email, phone } = curUser;
        const { street, city, zipcode } = curUser.address;

        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{name.firstname} {name.lastname}</td>
            <td>{email}</td>
            <td>{street}, {city}, {zipcode}</td>
            <td>{phone}</td>
          </tr>
        );
      })}
    </>
  )
}

export default UserData