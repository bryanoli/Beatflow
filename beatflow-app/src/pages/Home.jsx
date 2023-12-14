import React, { useState } from 'react';
import { Login } from '../components/login';
import { Register } from '../components/registration';
import '../App.css';


export default function Home() {
    const [currentForm, setCurrentForm] = useState('login'); // ['login', 'register'
    const toggleForm = (formName) => {
        setCurrentForm(formName)
    }
    return (
    <div className='Home'>
        {
            currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
        }
     </div>

    
    )
}