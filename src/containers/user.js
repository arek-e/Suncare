import React, {useState, useContext, useEffect } from 'react'
import HeaderMUI from '../components/HeaderMUI';
import Login from '../components/Login';
import { UserContext } from '../components/UserContext';
function UserPage() {
    // const [accountStatus, setAccountStatus] = useState(false)
    // const pullAccountStatus = (data) => { 
    //     console.log(accountStatus);
    //     setAccountStatus(Boolean(data)) 
    // };


    const {account, setAccount} = useContext(UserContext)
    const [loggedIn, setloggedIn] = useState(false)
    useEffect(() => {
        setAccount(account);
        console.log("Account:", account);

        return () => {
            setloggedIn(true);
        }
    }, [account])
    return (
        <div>
            <HeaderMUI/>
            {Boolean(account) ?  
            <div>
                <p>{account.userid}</p><br/>
                <p>{account.email}</p><br/>
                <p>{account.firstName}</p><p>{account.lastName}</p><br/>
                <p>{account.phoneNum}</p><br/>
                <p>{account.created}</p><br/>
                <p>{account.adminFlag}</p><br/>
            </div>
            : <Login/>  }
        </div>
    )
}

export default UserPage
