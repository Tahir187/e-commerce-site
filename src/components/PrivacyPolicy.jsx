import React from 'react'
import BackNavigateButton from './BackNavigateButton'

const PrivacyPolicy = () => {
  return (
    <div className='bg-gradient-to-br from-transparent via-purple-300 to-transparent'>
        <p className='text-center font-semibold text-2xl'>PrivacyPolicy</p>
        <div className='text-5xl flex justify-center'>
            <BackNavigateButton />
        </div>
    </div>
  )
}

export default PrivacyPolicy