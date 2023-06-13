import React from 'react';
import Link from 'next/link';
import { ServiceList } from './ContactFormItems/ServiceList';
export class ContactForm extends React.Component{
    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            description: '',
            services: [],
            policyAgreement: false,
            hasErrors: false,
            errorMessages: {
                name: '',
                email: '',
                phone: '',
                description: '',
                services: '',
                policyAgreement: ''
            }
        }
        this.validateForm = this.validateForm.bind(this);
        this.modifyServiceList = this.modifyServiceList.bind(this);
    }

    modifyServiceList(event: Event) {
        let services = this.state.services;
        let service = event.target.getAttribute('data-name');
        if (event.target.checked) {
            services.push(service);
        } else {
            services.splice(services.indexOf(service), 1);
        }
        this.setState({services: services});
    }

    decoratePhoneField(event: Event) {
        // if 10 digits are there in the phone field for example 1234567890 then it will be formatted as (123) 456-7890, and once user presses backspace it will be formatted as 123456789
        let phone = event.target.value;
        if (phone.length === 10) {
            phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        }
        event.target.value = phone;
    }

    validateForm(event: Event): boolean {
        this.setState({hasErrors: false})
        // Validate name
        if (this.state.name.match(/[^a-zA-Z ]/)) {
            this.setState({
                hasErrors: true, 
                errorMessages: {...this.state.errorMessages, name: 'Name must only contain letters'}
            });
        }
         else if (this.state.name.length === 0) {
            this.setState({
                hasErrors: true, 
                errorMessages: {...this.state.errorMessages, name: 'Name cannot be empty'}
            });
        }
        // Validate email
        if (this.state.email.length === 0) {
            this.setState({
                hasErrors: true,
                errorMessages: {...this.state.errorMessages, email: 'Email cannot be empty'}
            });
        }
        else if (this.state.email.match(/[^a-zA-Z0-9@._-]/)) {
            this.setState({
                hasErrors: true,
                errorMessages: {...this.state.errorMessages, email: 'Email must only contain letters, numbers, and @._-'}
            });
        }
        else if (this.state.email.match(/@.+\./)) {
            this.setState({
                hasErrors: true,
                errorMessages: {...this.state.errorMessages, email: 'Invalid email address'}
            });
        }
        // Validate phone
        if (this.state.phone.length === 0) {
            this.setState({
                hasErrors: true,
                errorMessages: {...this.state.errorMessages, phone: 'Phone number cannot be empty'}
            });
        }
        else if (this.state.phone.match(/[^0-9]/)) {
            this.setState({
                hasErrors: true,
                errorMessages: {...this.state.errorMessages, phone: 'Invalid phone number'}
            });
        }
        else if (this.state.phone.length !== 10) {
            this.setState({
                hasErrors: true,
                errorMessages: {...this.state.errorMessages, phone: 'Phone number must be 10 digits'}
            });
        }
        // Validate description
        if (this.state.description.length === 0) {
            this.setState({
                hasErrors: true,
                errorMessages: {...this.state.errorMessages, description: 'Description cannot be empty'}
            });
        }
        else if (this.state.description.length > 800) {
            this.setState({
                hasErrors: true,
                errorMessages: {...this.state.errorMessages, description: 'Description must be less than 800 characters'}
            });
        }
        // Prevent form submission if there are errors
        if (this.state.hasErrors) {
            event.preventDefault();
            return false;
        }
        return true;
    }

    render() {
        return (
        <div className='max-w-lg px-7 py-10 my-10 md:mt-10'>
            <div>
                <h1 className='text-3xl leading-10 mb-3 md:text-5xl md:leading-[3.8rem] md:mb-6'>Let's level up your brand, together</h1>
                <p className='text-gray-500 mb-7 text-lg'>You can reach us anytime via <Link href="mailto:hi@untitledui.com" className='text-gray-700 hover:underline'>hi@untitledui.com</Link></p>
            </div>
            <form method='POST' action="http://formz.in/api/task" className='space-y-6 text-sm' onSubmit={this.validateForm}>
                <div className='flex flex-col'>
                    <label className='text-gray-700 mb-1'>Name</label>
                    <input className='border border-gray-300 rounded-md p-2' type='text' name='name' placeholder='Your Name' onChange={(event) => {this.setState({name: event.target.value})}} required/>
                </div>
                <div className='flex flex-col'>
                    <label className='text-gray-700 mb-1'>Email</label>
                    <input className='border border-gray-300 rounded-md p-2' type='email' name='email' placeholder='you@company.com' onChange={(event) => {this.setState({email: event.target.value})}} required/>
                </div>
                <div className='flex flex-col'>
                    <label className='text-gray-700 mb-1'>Phone number</label>
                    <input type='text' className='border border-gray-300 rounded-md p-2' name='phone' placeholder='(555) 000-0000' onChange={(event) => {this.setState({phone: event.target.value})}} required/>
                </div>
                <div className='flex flex-col'>
                    <label className='text-gray-700 mb-1'>How can we help?</label>
                    <textarea className='border border-gray-300 rounded-md p-2 h-32' name='description' placeholder='Tell us a little about the project...' onChange={(event) => {this.setState({description: event.target.value})}} required/>
                </div>
                <div className='flex flex-col'>
                    <label className='text-gray-700 mb-3'>Services</label>
                    <div className='text-base text-gray-600 grid grid-cols-2 space-y-2'>
                        {ServiceList.map((service, index) => {
                            return (
                                <div className='flex items-center' key={index}>
                                    <input type='checkbox' data-name={service} className='mr-2 h-4 w-4' onChange={this.modifyServiceList}/>
                                    <label>{service}</label>
                                </div>
                            )
                        })}
                    </div>
                    <input type='hidden' name='services' value={this.state.services}/>
                </div>
                <div className='flex items-center text-base pt-2'>
                    <input type='checkbox' className='mr-2 h-4 w-4' onChange={(event) => {this.setState({policyAgreement: event.target.checked?true:false})}} required/> <span className='text-slate-500'>I agree to our friendly <a href='#' className='underline'>privacy policy</a></span>
                </div>
                <div className='flex justify-center text-base'>
                    <button type='submit' className='bg-slate-600 text-white rounded-md p-2 mt-3 w-full'>Send Message</button>
                </div>
            </form>
        </div>
        )
    }
}