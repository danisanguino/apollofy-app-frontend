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
    const [userError, setUserError] = useState(false);
    const [passError, setPassError] = useState(false);

    useEffect(() => {
    async function getUserApi() {
        const data = await getUsers();
        setUsers(data)
    } getUserApi();
    },[])

    const loginForm = (element: React.FormEvent<HTMLFormElement>) => {
        element.preventDefault();
       console.log(userEmail, userPass) 
       const foundUser = users.find((user) => user.email === userEmail)
       if (foundUser) {
        if (foundUser.password === userPass) {
        console.log('correcto')
        } else {
            setUserError(false)
            setPassError(true)
        }
       }  else {
        setUserError(true)
        setPassError(false)
       }
    }

  return (
    <div className='login'>
            <Logo/>
                <form  className='login-buttons' onSubmit={loginForm}>
                <Inputs  name='email' placeholder='email' handleChange={(ev) =>{setUserEmail(ev.target.value)}} />
                {userError && <small className='message-error email'>user not found</small>}
                <Inputs type='password' name='pass' placeholder='password' handleChange={(ev) =>{setUserPass(ev.target.value)}}/>
                {passError && <small className='message-error password'>incorrect password</small>}
                <Button style='btn-yellow'>LOG IN</Button>
                </form>
    </div>
  )
}