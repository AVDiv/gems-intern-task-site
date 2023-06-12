import React from 'react';

export class ContactForm extends React.Component{
    render() {
        return (
        <div className='max-w-lg px-7 py-10 my-10 md:mt-10'>
            <div>
                <h1 className='text-3xl leading-10 mb-3 md:text-5xl md:leading-[3.8rem] md:mb-6'>Let's level up your brand, together</h1>
                <p className='text-gray-500 mb-7 text-lg'>You can reach us anytime via <span className='text-gray-700'>hi@untitledui.com</span></p>
            </div>
            <form method='POST' className='space-y-6 text-sm'>
                <div className='flex flex-col'>
                    <label className='text-gray-700 mb-1'>Name</label>
                    <input className='border border-gray-300 rounded-md p-2' type='text' name='name' placeholder='Your Name'/>
                </div>
                <div className='flex flex-col'>
                    <label className='text-gray-700 mb-1'>Email</label>
                    <input className='border border-gray-300 rounded-md p-2' type='email' name='email' placeholder='you@company.com'/>
                </div>
                <div className='flex flex-col'>
                    <label className='text-gray-700 mb-1'>Phone number</label>
                    <input type='text' className='border border-gray-300 rounded-md p-2' name='phone' placeholder='+1 (555) 000-0000' />
                </div>
                <div className='flex flex-col'>
                    <label className='text-gray-700 mb-1'>How can we help?</label>
                    <textarea className='border border-gray-300 rounded-md p-2 h-32' name='message' placeholder='Tell us a little about the project...'/>
                </div>
                <div className='flex flex-col'>
                    <label className='text-gray-700 mb-3'>Services</label>
                    <div className='text-base text-gray-600 grid grid-cols-2'>
                        <div className='flex items-center'>
                            <input type='checkbox' className='mr-2 h-4 w-4'/>
                            <label>Web design</label>
                        </div>
                        <div className='flex items-center'>
                            <input type='checkbox' className='mr-2 h-4 w-4'/>
                            <label>UX design</label>
                        </div>
                        <div className='flex items-center'>
                            <input type='checkbox' className='mr-2 h-4 w-4'/>
                            <label>User research</label>
                        </div>
                        <div className='flex items-center'>
                            <input type='checkbox' className='mr-2 h-4 w-4'/>
                            <label>Content creation</label>
                        </div>
                        <div className='flex items-center'>
                            <input type='checkbox' className='mr-2 h-4 w-4'/>
                            <label>Stratergy & consulting</label>
                        </div>
                        <div className='flex items-center'>
                            <input type='checkbox' className='mr-2 h-4 w-4'/>
                            <label>Other</label>
                        </div>
                    </div>
                </div>
                <div className='flex items-center text-base'>
                    <input type='checkbox' name='policy' className='mr-2 h-4 w-4'/> <span className='text-slate-500'>I agree to our friendly <a href='#' className='underline'>privacy policy</a></span>
                </div>
                <div className='flex justify-center text-base'>
                    <button type='submit' className='bg-slate-600 text-white rounded-md p-2 mt-3 w-full'>Send Message</button>
                </div>
            </form>
        </div>
        )
    }
}