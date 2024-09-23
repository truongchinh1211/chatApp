import { useRef, useState } from "react";
import { useRegisterMutation } from "../../../store/redux/api/authApi";
import { useNavigate,Link  } from "react-router-dom";
import { toast } from "react-toastify";
function Register() {
    const [invalidPass,setInvalidPass] = useState(false)
    const [registerMutation] = useRegisterMutation()
    const navigate = useNavigate()
    const emailInput = useRef('')
    const nameInput = useRef('')
    const passwordInput = useRef('')
    const rePasswordInput = useRef('')
    const handleRegister = async (event) => {
        event.preventDefault();
    
        if (emailInput.current && nameInput.current && passwordInput.current && rePasswordInput.current) {
            if(passwordInput.current.value !== rePasswordInput.current.value){
                toast.error('Wrong rePassword')
                setInvalidPass(true)
                return;
            }else 
            setInvalidPass(false)
            let email = emailInput.current.value;
            let name = nameInput.current.value;
            let password = passwordInput.current.value;
            
            let data = {
                email,
                name,
                password,
            };
            await registerMutation(data).unwrap().then(()=>navigate('/'))
        }

    }

    return (<>
        <header className=" text-2xl text-center pb-3">Welcome to chat app!</header>
        <form className="grid grid-cols-1 gap-y-3" onSubmit={handleRegister}>
            <div className=" ">
                <label htmlFor="" className="font-medium leading-6">Email:</label>
                <input ref={emailInput} required type="email" placeholder="Enter your email" className="text-lg w-full rounded py-1 ps-1 border sm:text-lg sm:leading-6 bg-slate-300 focus:outline-blue-300" />              
            </div>
            <div className=" ">
                <label htmlFor="" className="font-medium leading-6">Name:</label>
                <input ref={nameInput} required type="text" placeholder="Enter your name" className="text-lg w-full rounded py-1 ps-1 border sm:text-lg sm:leading-6 bg-slate-300 focus:outline-blue-300" />              
            </div>
            <div className=" ">
                <label htmlFor="" className="font-medium leading-6">Pasword:</label>
                <input ref={passwordInput} required type="password" placeholder="Enter your password" className="text-lg w-full rounded py-1 ps-1 border sm:text-lg sm:leading-6 bg-slate-300 focus:outline-blue-300" />              
            </div>
            <div className=" ">
                <label htmlFor="" className="font-medium leading-6">re-Pasword:</label>
                <input ref={rePasswordInput} required type="password" placeholder="re-enter your password" className={`${invalidPass ? 'border-red-500':''} text-lg w-full rounded py-1 ps-1 border sm:text-lg sm:leading-6 bg-slate-300 focus:outline-blue-300`} />              
            </div>
            <button type="submit" className="mt-2  bg-primary p-2 text-slate-800 font-bold">Register</button>
            <p className="text-sm text-center">already have account?<Link to={'/auth/login'}  className="underline text-blue-400">login here</Link></p>
        </form>
    </>
    );
}

export default Register;