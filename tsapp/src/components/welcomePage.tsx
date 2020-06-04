import React,{useEffect,useState} from "react";
import axios from "axios"
import { useHistory,useLocation } from "react-router-dom";
import AuthApi from "./authApi";
import Axios from "axios";


function WelcomePage(){

    const history=useHistory();
    const authApi = React.useContext<any>(AuthApi)
    let[firstName,setFirstNAme]=useState<string>("");
    let[lastName,setLastNAme]=useState<string>("");
    let[number,setNumber]=useState<string>("");
    let[email,setEmail]=useState<string>("");
    
    if(authApi){
        var _userId = authApi!.userId;
   }
   


     const [id,setId] = useState<any>(authApi!.userId);
     useEffect(() => {
        Axios.get(`/api/getSignedUser/${id}`)
        .then((res)=>{
            console.log("now the data is",res.data)
            setFirstNAme(res.data.firstName);
            setLastNAme(res.data.lastName);
            setNumber(res.data.number);
            setEmail(res.data.email);
        })
         }
     , [])
     
       
     

    const handleLogout=(e:any)=>{
        e.preventDefault();
        
        console.log("works");
        axios({
            url:"/api/logout",
            method:"GET",

        }).then((res)=>{
            if(res.data.success==false){
                return console.log("not logged out");
            }
            else {
                authApi!.setAuth(false);
                // loadAnotherPage("login");
            }
        }).catch((err)=>{
              console.log("not logged outtt");
        })
    }
    const loadAnotherPage = (page:string) => {
        switch (page) {
          case "login":
            history.push("/login");
            break;
          default:
            history.push("/");
            break;
        }
    }
    return(
        <div>
            <h1>hello welcome page</h1>
            <div>
              <p>{firstName}</p>
              <p>{email}</p>
              <p>{number}</p>
              <p>{lastName}</p>
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
};

export default WelcomePage;