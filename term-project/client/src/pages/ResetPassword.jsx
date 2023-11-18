import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CustomButton, TextInput } from '../components'
import { Loading } from '../components'

const ResetPassword = () => {
  const [errMsg, setErrMsg] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onChange"
  });
  
  const onsubmit = async (data) => {};

  return (
    <div className='w-full h-[100vh] bg-bgColor flex items-center 
    justify-center p-6'>
      <div className=' bg-primary w-full md:w-1/3 2xl:w-1/4 
      px-6py-8 shadow-md rounded-lg'>
        <p className='text-ascent-1 text-lg font-semibold '>Email Address </p>
        <span className='text-sm text-ascent-2'>
          Enter the email address associated with your account, and we’ll email you a link to reset your password.
        </span>
        <form onSubmit={handleSubmit(onsubmit)}
        className='py-4 flex flex-col gap-5'>
          <TextInput
            name='email' placeholder ='email@example.com'
            label='Email Address'
            type='email'
            register={
              register("email", {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
                }
              })
              }
              styles= 'w-full rounded-lg'
              labelStyles='ml-2'
              
              error={errors.email ? errors.email.message: ""}
            
             />
             {errMsg?.message &&(
              <span
              role='alert'
              className={`text-sm ${
                errMsg?.status ==="failed"? "text-red-500": "text-green-500"
              } mt-0.5`}>
                {errMsg?.message}
              </span>
             )}
             {isSubmitting ? (
              <Loading/>
             ):(
              <CustomButton
              type='submit'
              containerStyles={`inline-flex justify-center rounded-md bg-blue 
              px-8 py-3 text-sm font-medium text-white outline-none`
            }
            title = 'Submit'
              />
             )

             }
            

        </form>
      </div>
    </div>
  )}

export default ResetPassword