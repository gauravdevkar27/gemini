import { createContext, use, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Appcontext = createContext();

export const AppContextProvider = ({ children }) => {

    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const fetchUser = async () => {
          setUser(dummyUserData)
    }

    const fetchUsersChats = async () => {
             setChats(dummyChats)
             setSelectedChat(dummyChats[0])
    }


    useEffect(() => {
        if(theme === 'dark'){
            document.documentElement.classList.add('dark');

        }else{
            document.documentElement.classList.remove('dark');

        }
    }, [theme])

    useEffect(() =>{
        if(user){
            fetchUsersChats()
        }
        else{
            setChats([])
            setSelectedChat(null)
        }
    }, [user])

    useEffect(() => {
     fetchUser()
    },[])

    const value = {
        navigate, user, setUser, fetchUser, chats, setChats, selectedChat, setSelectedChat, theme
    }

    return (
        <Appcontext.Provider value={value}>
            {children}
        </Appcontext.Provider>
    )

}

export const useAppContext = () => useContext(Appcontext)