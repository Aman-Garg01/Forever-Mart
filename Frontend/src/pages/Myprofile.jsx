import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Myprofile() {
  const { userData, setUserData, token, backEndUrl, loadUserProfileData } = useContext(ShopContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {

    try {

      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))

      image && formData.append('image', image)

      const { data } = await axios.post(backEndUrl + '/api/user/update-profile', formData, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return userData && (
    <div className='bg-gray-200 sm:bg-transparent flex flex-col items-center sm:p-10 py-8'>
      <div className='sm:min-w-96 w-72 flex flex-col items-center justify-center gap-2 text-sm bg-white border border-gray-300 rounded-xl p-10 shadow-xl'>
        {
          isEdit
            ? <label htmlFor="image">
              <div className='inline-block relative cursor-pointer'>
                <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
              </div>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
            </label>
            : <img className='w-52 rounded drop-shadow-[0_5px_5px_rgba(125,132,126,0.6)]' src={userData.image} alt="" />
        }

        {
          isEdit
            ? <input className='bg-gray-200 text-3xl font-medium max-w-60 mt-4' type='text' value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
            : <p className='font-medium text-3xl text-neutral-800 mt-1'>{userData.name}</p>
        }

        <hr className='bg-zinc-900 h-[1px] border-none' />

        <div className='flex flex-col justify-center items-center'>
          <p className='text-neutral-600 underline mt-3 text-lg'>Contact Information</p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
            <p className='font-medium text-base pr-2'>Email id:</p>
            <p className='text-blue-500  text-base font-medium'>{userData.email}</p>
            <p className='font-medium text-base'>Phone:</p>

            {
              isEdit
                ? <input className='bg-gray-200 max-w-52' type='text' value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                : <p className='text-blue-400 text-base font-medium'>+91- {userData.phone}</p>
            }
            <p className='font-medium text-base'>Address:</p>
            {
              isEdit
                ? <p>
                  <input className='bg-gray-200 p-1 pr-2 pl-2' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type="text" />
                  <br />
                  <input className='bg-gray-200 mt-1 p-1 pr-2 pl-2' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type="text" />
                </p>
                : <p className='text-gray-500 text-base font-medium'>
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
            }
          </div>
        </div>


        <div className='mt-10'>
          {
            isEdit
              ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all' onClick={updateUserProfileData}> Save information </button>
              : <button className='border border-primary px-8 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all' onClick={() => setIsEdit(true)}>Edit </button>
          }
        </div>
      </div>
    </div>
  )
}

export default Myprofile