import React, { createContext, useContext, useState } from "react";

export const Auth = {
    isAuthenticated: false,
    signin(cb) {
        Auth.isAuthenticated = true;
        setTimeout(cb, 100);
    },
    signout(cb) {
        Auth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

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

    const signin = cb => {
        return Auth.signin(() => {
            setUser("user");
            cb();
        });
    };

    const signout = cb => {
        return Auth.signout(() => {
            setUser(null);
            cb();
        });
    };

    return {
        user,
        signin,
        signout
    };
}