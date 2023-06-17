import React from 'react'
import { list } from '../atoms/list'
const Navbar = () => {
  return (
    <div className='parent'>
      <ul>
        {list.map((elem)=>{
            return <li key={elem.id}>{elem.title}</li>
        })}
      </ul>
    </div>
  )
}

export default Navbar
