import React,{useState,useEffect,Component,SFC, FunctionComponent} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login'
import {BrowserRouter as Router,Switch,Route,Redirect,RouteProps ,RouteComponentProps} from 'react-router-dom';
import Registration from './components/registration';
import WelcomePage from './components/welcomePage';
import AuthApi from "./components/authApi"
import Axios from 'axios';


function App() {
  // const authApi = React.useContext(AuthApi);
  let [auth,setAuth] = useState<boolean>(false);
  let [userId,setUserId] = useState<any>(""); 
  useEffect(() => {
     Axios.get('/api/sessionAssigned')
          .then((res)=>{
            if(res.data.success){
              setAuth(true);
              
              setUserId(res.data.id);
              console.log("session assigned ",userId,auth);

            }
            else{
              console.log("not assigned ",userId,auth);
            }
          })
    
  }, [])
  type Props = {
    auth:boolean,
    setAuth:(active:boolean)=>void,
    userId:string,
    setUserId:(active:string)=>void,
    // isActive: boolean;
    // setIsActive: (active: boolean) => void;
 }
  return (
    <AuthApi.Provider value ={{auth,setAuth,userId,setUserId}}>
    <Router>
      <Switch>
        <RouteRegistration  exact path="/login"  component = {Login}/>
        <RouteRegistration path ="/registration" exact component = {Registration}/>
        <RouteProtected path ="/dashboard"  exact component = {WelcomePage}/>
        {/* <Route path ="/login" exact render = {()=> {if(authApi.auth){!authApi.auth?({Login}):<Redirect to= "/dashboard"/>}}}/>
        <Route path ="/registration" exact component ={Registration}/>
        <Route path = "/dashboard" exact render = {()=> authApi.auth?({WelcomePage}):<Redirect to = "/login"/>}/> */}
        <Route path="*" component={Login} />
        </Switch>
    </Router>
    </AuthApi.Provider>
    
  );
}

// interface Prop{
//     exact :boolean;
//     path:string;
//     component: FunctionComponent

// } & RouteComponentProps;

// type Props = { exact:boolean,path:string,component: FunctionComponent } & RouteComponentProps;
interface IPrivateRouteProps extends RouteProps {
  component: any;
}
 
const RouteRegistration: SFC<IPrivateRouteProps> = ({component:Component, ...rest})=>{
  const authApi = React.useContext(AuthApi);
  if(!authApi.auth)
     { 
       return <Component {...rest}/>
      }
      else{
        return<Redirect to= "/dashboard"/>
      }
  
}
const RouteProtected:SFC<IPrivateRouteProps>= ({component:Component, ...rest})=>{
  const authApi = React.useContext(AuthApi);
  if(authApi.auth)
     { 
       return <Component {...rest}/>
      }
      else{
        return<Redirect to= "/login"/>
      }
  
}
export default App;
