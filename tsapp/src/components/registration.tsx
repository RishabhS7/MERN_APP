import React,{useState} from "react";
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import PopPop from 'react-poppop';


function Registration(){
    const history=useHistory();
    let [showPopup,setShowPopup] = useState<boolean>(false);
    let [msg,setMsg]=useState<string>("");

const checkLowerCase = new RegExp('^(?=.*[a-z])(?=.{1,})');
const checkUpperCase = new RegExp('^(?=.*[A-Z])(?=.{1,})');
const checkContainsNumber=new RegExp('^(?=.*[0-9])(?=.{1,})');
const checkChaaracter = new RegExp('^(?=.*[!@#$%^&*])(?=.{1,})');
const checkEightCharacters = new RegExp('^(?=.{8,})');
const checknameCharacters = new RegExp('^(?=.{3,})');
const checkpasswordCharacters = new RegExp('^(?=.{7,})');
const checkEmailCharacters = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const checkNameChaaracter = new RegExp('^(?=.*[a-zA-Z\\s])(?=.{1,})')
   
const formSubmit=(e:any)=>{
        e.preventDefault();
        let formObj={
            firstName:e.target.firstName.value,
            lastName:e.target.lastName.value,
            email:e.target.email.value,
            number:e.target.number.value,
            password : e.target.password.value
        }
        let confirmPassword = e.target.confirmPassword.value;
        if(!checknameCharacters.test(formObj.firstName)){
            setMsg("First Name length can not be less tham 3");
           return setShowPopup(true);
        }
        if(!checkNameChaaracter.test(formObj.firstName)){
            setMsg("Name should only contain alphabets");
           return setShowPopup(true);
        }
        if(!formObj.email.match(checkEmailCharacters)){
            setMsg("type correct email")
            return setShowPopup(true);
        }
        if(!checkEightCharacters.test(formObj.number)){
            setMsg("Number length can not be less than 8");
            return setShowPopup(true);
        }
        if(!checkUpperCase.test(formObj.password)){
           setMsg("Password should contain atleast one uppercase letter");
           return setShowPopup(true);
        }
        if(!checkContainsNumber.test(formObj.password)){
            setMsg("Password should contain a number");
            return setShowPopup(true);
        }
        
        if(!checkpasswordCharacters.test(formObj.password)){
            setMsg("Password should contain 7 characters");
            return setShowPopup(true);
        }
        if(formObj.password!=confirmPassword){
            setMsg("Password didn't match");
            return setShowPopup(true);
        }
        else{
        // axios({
        //     url:'/api/register',
        //     method:"Post",
        //     data:formObj
        // })
        const config ={
                firstName:e.target.firstName.value,
                lastName:e.target.lastName.value,
                email:e.target.email.value,
                number:e.target.number.value,
                password : e.target.password.value
                
            
        }
        axios.post('/api/register',config)
        .then((res:any)=>{
            if(res.data.success==true){
            console.log('Data is been sent');
            
            loadAnotherPage("login")
            }
        })
        .catch((err:Error)=>{
            setMsg("User already exists");
            setShowPopup(true);
            console.log("my success")
            console.log("data is not sent to the serer")
        })
    }
         console.log(formObj);
    
    const loadAnotherPage = (page:string)=> {
        switch (page) {
          case "login":
            history.push("/login");
            break;
          default:
            history.push("/");
            break;
        }
    }
}
  return(
      <div>
          <div className ="loginContainer">
              <h1 className="headers">Registration</h1>
              <form className ="loginForm" onSubmit={formSubmit}>
                  <div>
                      <input className ="loginInput" type ="text" name = "firstName" placeholder="First Name" required/>
                      <input className ="loginInput" type ="text" name = "lastName" placeholder="Last Name"/>
                  </div>
              <input className ="loginInput" type ="email" name = "email" placeholder="Email.." required/>    
              <input className ="loginInput" type ="number" name = "number" placeholder="Number.." required/>
              <input className ="loginInput" type ="password" name ="password" placeholder="password.." required/>
              <input className ="loginInput" type ="password" name ="confirmPassword" placeholder="confirm password.." required/>
              <button className ="loginButton"type="submit">Submit</button>

              </form>
        </div>
          {/* <PopPop open={showPopup}
                  position="bottomCenter"
                  closeBtn={true}
                  closeOnEsc={true}
                  closeOnOverlay={true}
                  onClose={()=>{setShowPopup(false)}}>
                 {/* <h1>Alert</h1> */}
                 {/* <p>{msg}</p>
          </PopPop> */} */}
      </div>
  )
}
export default Registration;