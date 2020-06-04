import React from "react";
import { Link, Redirect,Route,useHistory } from "react-router-dom";
import axios from 'axios';
import Registration from "./registration"
import AuthApi from "./authApi";

function Login(props:any){
    // let email = "rishabh.singh@block8.com";
    // let password = "sss";
    const history = useHistory();
    const authApi = React.useContext<any>(AuthApi);
    const formSubmit=(e:any)=>{  
        e.preventDefault();
        
        let formObj={
            firstName:"",
            lastName:"",
            email:e.target.email.value,
            number:"",
            password : e.target.password.value
        }
        console.log(formObj);
        // axios({
        //     url:'/api/login',
        //     method:"Post",
        //     data:formObj
        // })
        axios.post('api/login',formObj)
        .then((res)=>{
          console.log(res.data.message)
            if(res.data.success == true){
              authApi.setUserId(res.data.id);
              authApi.setAuth(true);
              
                // loadAnotherPage('dashboard');
            console.log('login successful',authApi.userId,authApi.auth);
            // e.form.reset();
            }
        })
        .catch((res:any)=>{
            console.log(res.data);
            
            console.log("data is not sent to the serer")
        })
         
    }
    // const loadAnotherPage = (page:string) => {
    // switch (page) {
    //   case "dashboard":
    //     history.push("/dashboard");
    //     break;
    //   default:
    //     history.push("/");
    //     break;
    // }
   

  return(
      
      <div>
          <div className ="loginContainer">React.createElement("div")
              <h1 className="headers">Login</h1>
              <form className ="loginForm" onSubmit={(e:React.FormEvent<HTMLFormElement>):void=>{formSubmit(e)}} method ="POST">
              <input className ="loginInput" type ="email" name = "email" placeholder="Email.."/>
              <input className ="loginInput" type ="password" name ="password" placeholder="password.."/>
              {/* <Link to = "/welcomePage">{props.setIsUserAuthenticated} <button className ="loginButton"type="submit">Submit</button></Link> */}
              <button className ="loginButton"type="submit">Submit</button>
              </form>
            <Link to = "/registration"><p className="pTags">Register now..</p></Link>
          </div>
      </div>
      
  )
}
export default Login;