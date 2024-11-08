import React from 'react'
import { Link } from 'react-router-dom';

function Button() {
  return (
    <div>
        <Link to={'/body'}><center><button style={{border:'none', color:'red', fontSize:'20px'}}>Voir le produit</button></center></Link>
        
    </div>
  )
}

export default Button;