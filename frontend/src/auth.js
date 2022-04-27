import React, { createContext, useContext, useState } from "react";

// export const Auth = {
//     isAuthenticated: false,
//     signin(cb) {
//         Auth.isAuthenticated = true;
//         setTimeout(cb, 100);
//     },
//     signout(cb) {
//         Auth.isAuthenticated = false;
//     }
// };

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signin = (userId) => {
        fetch(`/api/participants/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(response => {
            if (response.status === 200) {
                setUser(userId);
            }
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    };

    const signout = () => {
        setUser(null);
    };

    return {
        user,
        signin,
        signout
    };
}