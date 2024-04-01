import React from 'react'
import { useNavigate } from 'react-router-dom';


const BackNavigateButton = () => {
    let navigate = useNavigate();
  return (
    <div className='flex items-center text-center mt-2'>
        <button onClick={()=> navigate(-1)} className='text-gray-500'> {`<`} </button>
    </div>
  )
}

export default BackNavigateButton