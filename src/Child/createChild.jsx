import EventHandler from '../EventHandler/eventhandler';
import Table from '../CommonComponents/Table/table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleRight } from 'react-icons/fa';
import ServiceClient from '../ServiceClient';

const CreateChild = () => {
    /*Form fields*/
    const [fname, setFname]=useState('');
    const [lname, setLname]=useState('');
    const [username, setUsername]=useState('');
    const [birthday, setBirthday]=useState();
    const [password, setPassword]=useState('');
    const [passwordError, setPasswordError]=useState(false);
    const [cpassword, setCPassword]=useState('');
    const [cpasswordError, setCPasswordError]=useState(false);
    
    /*Navigate*/
    const navigate = useNavigate();

    /*btn handle*/
    const [btndisabled, setBtnDisabled]=useState(false);
    const [loader, setLoader]=useState(false);

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);
   
    /*Methods: */
    const createChild=(e)=>{
        e.preventDefault();
        setBtnDisabled(true);
        setLoader(true);

        if(errors.length || serverError.length){
            setErrors([]);
            setServerError([]);
        }
        if(password != cpassword){
            setCPasswordError(true);
            setPasswordError(true);
            setErrors(['Passwords does not match']);
            setBtnDisabled(false);
            setLoader(false);
            return
        }
        if(passwordError==true & cpasswordError==true){
            setCPasswordError(false);
            setPasswordError(false);
        }

        let url='http://127.0.0.1:8000/api/createChild';
        let dataPost={};
        dataPost.fname=fname;
        dataPost.lname=lname;
        dataPost.username=username;
        dataPost.birthday=birthday;
        dataPost.psw=password;

        ServiceClient.post(url,dataPost).then((response)=>{
            if(response.status===200){
                setSuccess(true);
                setLoader(false);
                setTimeout(()=>{
                    setSuccess(false);
                    setBtnDisabled(false);
                },2000)
                formClear();
            }
        }).catch((error)=>{
            setServerError(error);
            setBtnDisabled(false);
            setLoader(false);
        })
    }

    const formClear=()=>{
        setFname('');
        setLname('');
        setUsername('');
        setBirthday('');
        setPassword('');
        setCPassword('');
    }
    return (
        <>
       <EventHandler 
        success={success} 
        errors={errors} 
        serverError={serverError} 
        closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}/>
                  
        <div className="content-main-container">
            
           
            
            <form onSubmit={(e)=>createChild(e)}>
                <div className="title"><h2>Create</h2></div>
                <div className="name-fields flex">
                    <div className="field">
                        <label>First Name</label>
                        <input type="text" required onChange={(e)=>{setFname(e.target.value)}} value={fname}/>
                    </div>
                    <div className="field">
                        <label>Last Name</label>
                        <input type="text" required onChange={(e)=>{setLname(e.target.value)}} value={lname}/>
                    </div>
                    
                </div>
                <div className="fields flex">
                    <div className="field">
                        <label>Username</label>
                        <input type="text" required onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
                    </div>
                    <div className="field">
                        <label>Birthday</label>
                        <input type="date" required onChange={(e)=>{setBirthday(e.target.value)}} value={birthday}/>
                    </div>
                </div>
                <div className="fields flex">
                    <div className="field">
                        <label>Password</label>
                        <input className={passwordError ? 'InputError':'passwordInput'} type="password" required onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                    </div>
                    <div className="field">
                        <label>Confirm Password</label>
                        <input className={cpasswordError ? 'InputError':'passwordInput'}type="password" required onChange={(e)=>{setCPassword(e.target.value)}} value={cpassword}/>
                    </div>                
                </div>
                
                {!loader ?
                    <button type='submit' disabled={btndisabled} className={btndisabled ? 'btn disabled':'btn formButton'}>Generate <FaArrowCircleRight className='btn-icon'/></button> :
                    <span className='loader createUser'></span>
                }
            </form>
        </div>
      </>          
        
    );
};
export default CreateChild;