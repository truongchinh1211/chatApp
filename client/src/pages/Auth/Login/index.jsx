import { useNavigate,Link } from "react-router-dom";
import { useRef } from "react";
import { useLoginMutation } from "../../../store/redux/api/authApi";
import { toast } from "react-toastify";
function Login() {
  const [loginMutation] = useLoginMutation()
  const navigate = useNavigate()
  const emailInput = useRef('')
  const passwordInput = useRef('')
  const handleLogin = async(e)=>{
    e.preventDefault()
    if(emailInput.current && passwordInput.current){
      let data ={
        email: emailInput.current.value,
        password: passwordInput.current.value
      }
      loginMutation(data).unwrap()
      .then((data)=>{
        console.log(data)
        toast.success(data.message)
        navigate('/')})
      .catch((er)=>toast.error(er.data))
    }
  }
    return ( <>
        <header className=" text-2xl text-center pb-3">Welcome to chat app!</header>
        <form className="grid grid-cols-1 gap-y-3" onSubmit={handleLogin}>
            <div className=" ">
                <label htmlFor="" className="font-medium leading-6">Email:</label>
                <input ref={emailInput} required type="email" placeholder="Enter your email" className="text-lg w-full rounded py-1 ps-1 border sm:text-lg sm:leading-6 bg-slate-300 focus:outline-blue-300" />              
            </div>
            <div className=" ">
                <label htmlFor="" className="font-medium leading-6">Pasword:</label>
                <input ref={passwordInput} required type="password" placeholder="Enter your password" className="text-lg w-full rounded py-1 ps-1 border sm:text-lg sm:leading-6 bg-slate-300 focus:outline-blue-300" />              
            </div>
            <button type="submit" className="mt-2  bg-primary p-2 text-slate-800 font-bold">Login</button>
            <p className="text-sm text-center">dont have account?<Link to={'/auth/register'}  className="underline text-blue-400">register here</Link></p>
        </form>
    </> );
}

export default Login;