import React, { useEffect, useState } from 'react'
import { Logo } from '../../components/layout/logo'
import { Button } from '../../components/global/button'
import { Inputs } from '../../components/global/inputs'
import './login.css'
import { getUsers } from '../../utils/functions'
import { User } from '../../utils/interfaces/user'

type Props = {}

export function Login({}: Props) {
    const [userEmail, setUserEmail] = useState('');
    const [userPass, setUserPass] = useState('');
    const [users, setUsers] = useState([] as User[]);

    useEffect(() => {
    async function getUserApi() {
        const data = await getUsers();
        setUsers(data)
    } getUserApi();
    },[])

    const loginForm = (element: React.FormEvent<HTMLFormElement>) => {
        element.preventDefault();
       console.log(userEmail, userPass)   
    }

  return (
    <div className='login'>
            <Logo/>
                <form  className='login-buttons' onSubmit={loginForm}>
                <Inputs  name='email' placeholder='email' handleChange={(ev) =>{setUserEmail(ev.target.value)}} />
                <Inputs type='password' name='pass' placeholder='password' handleChange={(ev) =>{setUserPass(ev.target.value)}}/>
                <Button style='btn-yellow'>LOG IN</Button>
                </form>
    </div>
  )
}