import React from 'react';
import Link from 'next/link';
import { ServiceList } from './ContactFormItems/ServiceList';
import { AlertMessage } from './ContactFormItems/AlertMessage';
import { FaCircleNotch } from 'react-icons/fa';
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
            },
            submitStatus: 0,
        }
        this.validateForm = this.validateForm.bind(this);
        this.modifyServiceList = this.modifyServiceList.bind(this);
        this.decoratePhoneField = this.decoratePhoneField.bind(this);
        this.setStateSync = this.setStateSync.bind(this);
    }

    setStateSync(stateUpdate: any) {
        return new Promise(resolve => {
            this.setState(stateUpdate, () => resolve());
        });
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
        let phone = event.target.value;
        if (phone.length === 10) {
            phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        }
        event.target.value = phone;
    }

    async validateForm(event: Event) {
        await this.setStateSync({hasErrors: false})
        // Validate name
        if (this.state.name.match(/[^a-zA-Z ]/)) {
            await this.setStateSync({
                hasErrors: true, 
                errorMessages: {...this.state.errorMessages, name: 'Name must only contain letters'}
            });
        }
         else if (this.state.name.length === 0) {
            await this.setStateSync({
                hasErrors: true, 
                errorMessages: {...this.state.errorMessages, name: 'Name cannot be empty'}
            });
        }
        // Validate email
        if (this.state.email.length === 0) {
            await this.setStateSync({
                hasErrors: true,
                errorMessages: {...this.state.errorMessages, email: 'Email cannot be empty'}
            });
        }
        else if (this.state.email.match(/[^a-zA-Z0-9@._-]/)) {
            await this.setStateSync({
                hasErrors: true,
                errorMessages: {...this.state.errorMessages, email: 'Email must only contain letters, numbers, and @._-'}
            });
        }
        else if (this.state.email.match(/@+\./)) {
            await this.setStateSync({
                hasErrors: true,
                errorMessages: {...this.state.errorMessages, email: 'Invalid email address'}
            });
        }
        // Sanitize phone number
        await this.setStateSync({ phone: this.state.phone.replace(/[^0-9]/g, '') });
        // Validate phone
        if (this.state.phone.length === 0) {
            await this.setStateSync({
                hasErrors: true,
                errorMessages: {...this.state.errorMessages, phone: 'Phone number cannot be empty'}
            });
        }
        else if (this.state.phone.match(/[^0-9]/)) {
            await this.setStateSync({
                hasErrors: true,
                errorMessages: {...this.state.errorMessages, phone: 'Invalid phone number'}
            });
        }
        else if (this.state.phone.length !== 10) {
            await this.setStateSync({
                hasErrors: true,
                errorMessages: {...this.state.errorMessages, phone: 'Phone number must be 10 digits'}
            });
        }
        // Validate description
        if (this.state.description.length === 0) {
            await this.setStateSync({
                hasErrors: true,
                errorMessages: {...this.state.errorMessages, description: 'Description cannot be empty'}
            });
        }
        else if (this.state.description.length > 800) {
            await this.setStateSync({
                hasErrors: true,
                errorMessages: {...this.state.errorMessages, description: 'Description must be less than 800 characters'}
            });
        }
        // Prevent form submission and route to custom request
        event.preventDefault();
        if(!this.state.hasErrors){
            this.submitForm()
        }
    }

    submitForm(){
        this.setState({submitStatus: 1});
        fetch("https://formz.in/api/task", {
            body: new URLSearchParams({
                "name": this.state.name,
                "email": this.state.email,
                "phone": this.state.phone,
                "description": this.state.description,
                "services": JSON.stringify(this.state.services)
            }),
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
        }).then(res => {
            this.setState({submitStatus: res.status})
            if(res.status !== 201){
              return res.json()
            }
        }).then(async (data) => {
            if(data){
                if(data.path === "name"){
                    await this.setStateSync({
                        hasErrors: true,
                        errorMessages: {...this.state.errorMessages, name: data.message}
                    });
                } else if(data.path === "email") {
                    await this.setStateSync({
                        hasErrors: true,
                        errorMessages: {...this.state.errorMessages, email: data.message}
                    });
                } else if(data.path === "phone") {
                    await this.setStateSync({
                        hasErrors: true,
                        errorMessages: {...this.state.errorMessages, phone: data.message}
                    });
                } else if(data.path === "description") {
                    await this.setStateSync({
                        hasErrors: true,
                        errorMessages: {...this.state.errorMessages, description: data.message}
                    });
                }
            }
        }).catch(async (err) => {
            console.log(err)
            await this.setStateSync({
                hasErrors: false,
                submitStatus: 400
            });
        });
    }

    render() {
        return (
        <div className='max-w-lg px-7 py-10 my-10 md:mt-10'>
            {this.state.submitStatus === 201 && <AlertMessage success={true}/>}
            {(this.state.submitStatus === 400 && !this.state.hasErrors)?<AlertMessage success={false}/>:null}
            <div>
                <h1 className='text-3xl leading-10 mb-3 md:text-5xl md:leading-[3.8rem] md:mb-6'>Let&apos;s level up your brand, together</h1>
                <p className='text-gray-500 mb-7 text-lg'>You can reach us anytime via <Link href="mailto:hi@untitledui.com" className='text-gray-700 hover:underline'>hi@untitledui.com</Link></p>
            </div>
            <form className='space-y-6 text-sm' onSubmit={(event) => this.validateForm(event)}>
                <div className='flex flex-col'>
                    <label className='text-gray-700 mb-1'>Name</label>
                    <input className='border border-gray-300 rounded-md p-2' type='text' name='name' placeholder='Your Name' onChange={(event) => {this.setState({name: event.target.value, errorMessages: {...this.state.errorMessages, name: ''}});}} required/>
                    {this.state.errorMessages.name && <div className='bg-red-200 text-red-600 mx-1 rounded-b px-2 text-xs'>{this.state.errorMessages.name}</div>}
                </div>
                <div className='flex flex-col'>
                    <label className='text-gray-700 mb-1'>Email</label>
                    <input className='border border-gray-300 rounded-md p-2' type='email' name='email' placeholder='you@company.com' onChange={(event) => {this.setState({email: event.target.value, errorMessages: {...this.state.errorMessages, email: ''}})}} required/>
                    {this.state.errorMessages.email && <div className='bg-red-200 text-red-600 mx-1 rounded-b px-2 text-xs'>{this.state.errorMessages.email}</div>}
                </div>
                <div className='flex flex-col'>
                    <label className='text-gray-700 mb-1'>Phone number</label>
                    <input type='text' className='border border-gray-300 rounded-md p-2' name='phone' placeholder='(555) 000-0000' maxLength={10} onChange={(event) => {this.setState({phone: event.target.value, errorMessages: {...this.state.errorMessages, phone: ''}});this.decoratePhoneField(event)}} required/>
                    {this.state.errorMessages.phone && <div className='bg-red-200 text-red-600 mx-1 rounded-b px-2 text-xs'>{this.state.errorMessages.phone}</div>}
                </div>
                <div className='flex flex-col'>
                    <label className='text-gray-700 mb-1'>How can we help?</label>
                    <textarea className='border border-gray-300 rounded-md p-2 h-32' name='description' placeholder='Tell us a little about the project...' onChange={(event) => {this.setState({description: event.target.value, errorMessages: {...this.state.errorMessages, description: ''}})}} required/>
                    {this.state.errorMessages.description && <div className='bg-red-200 text-red-600 mx-1 rounded-b px-2 text-xs'>{this.state.errorMessages.description}</div>}
                </div>
                <div className='flex flex-col'>
                    <label className='text-gray-700 mb-3'>Services</label>
                    <div className='text-base text-gray-600 grid grid-cols-2 space-y-2'>
                        {ServiceList?.map((service, index) => {
                            return (
                                <div className='flex items-center' key={index}>
                                    <input type='checkbox' name={service.toLowerCase().replace(" ","")} className='mr-2 h-4 w-4' onChange={this.modifyServiceList}/>
                                    <label htmlFor={service.toLowerCase().replace(" ","")}>{service}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='flex items-center text-base pt-2'>
                    <input type='checkbox' name='policy' className='mr-2 h-4 w-4' onChange={(event) => {this.setState({policyAgreement: event.target.checked?true:false})}} required/> <label htmlFor="policy" className='text-slate-500'>I agree to our friendly <a href='#' className='underline'>privacy policy</a></label>
                </div>
                <div className='flex justify-center text-base'>
                    <button type='submit' className='bg-slate-600 text-white rounded-md p-2 mt-3 w-full text-center' disabled={this.state.submitStatus===1?true:false}>{this.state.submitStatus===1?<><FaCircleNotch className='animate-spin mx-auto' />Loading...</>:"Send Message"}</button>
                </div>
            </form>
        </div>
        )
    }
}