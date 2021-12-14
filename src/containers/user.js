import React, {useState, useContext, useEffect } from 'react'
import Dashboard from '../components/Admin-Dashboard/Dashboard';
import HeaderMUI from '../components/HeaderMUI';
import Login from '../components/Login';
import { UserContext } from '../components/UserContext';

function UserPage() {
    const {account, setAccount} = useContext(UserContext)
    const [loggedIn, setloggedIn] = useState(false)
    const [admin, setAdmin] = useState(0)

    useEffect(() => {
        setAccount(account);
        const admin =  new Object(account);
        isAdmin(admin);

    }, [account])

    const isAdmin = (data) => {
        let flag = parseInt(data.adminFlag)
        console.log("Account from isAdmin:", flag);
        setAdmin(flag);
    }
    

    return (
        <div>
            {Boolean(account) ?
                <div>
                    {Boolean(admin) ? 
                            <div>
                                <Dashboard/>
                            </div>
                        :
                            <div>
                                <HeaderMUI/> 
                            </div>
                    }
                </div>
            : 
                <Login/>  }
        </div>
    )
}

export default UserPage
