import $ from "jquery"; 
import axios from "axios"; 
import port from "./../../data/port.json"; 
import {useNavigate} from 'react-router-dom'; 
import {useState} from 'react'; 
import {useCookies} from 'react-cookie'; 

const SignInForm = ({signInData,onChangesignInData}) => 
{
    const [cookies,setCookie, removeCookie] = useCookies(["userData"]); 
    
    
    const navigate = useNavigate(); 

    const [errorMessage, setErrorMessage] = useState(""); 

    const onClickLoginButton = () =>
    {
        if(signInData.email==="")
        {
            alert("이메일을 입력해주세요"); 
            $("#email").focus(); 
            return; 
        }
        if(signInData.password==="")
        {
            alert("비밀번호를 입력해주세요"); 
            $("#password").focus(); 
            return; 
        }
        sendSignInData()
        .then(res=>{
            console.log(res);
            setCookie("userData",res.data,{path:"/"}); 
            // console.log(cookies("userData")); 
            alert("로그인완료");
            navigate('/review/list');
        })
        .catch(e=>{
                // console.log(e.request.response)
                // alert(e.request.response);
                setErrorMessage(e.response.data.fail); 
            })
            .finally(()=>{
                console.log(cookies.userData); 
            })
    }

    const sendSignInData = async() => 
    {
        return await axios.post(port.url+'/user/login',signInData); 
    } 
    return (
    
        <div className="album">
            <div className="container">
                <form>
                    
                    <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={signInData.email} onChange={onChangesignInData} name="email" className="form-control" id="email" aria-describedby="emailHelp/"/>
                    
            </div>
            <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={signInData.password} onChange={onChangesignInData} name="password" className="form-control" id="password"/>
            </div>
            <div className="mb-3">
                <p className="text-danger">
                    {errorMessage}
                </p>
            </div>
            {/* <div className="mb-3 form-check">
                 <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                 <label className="form-check-label" for="exampleCheck1">Check me out</label>
            </div> */}
                <button type="button" onClick={onClickLoginButton} className="btn btn-primary">로그인</button>
                </form>
            </div>
        </div>
       
    )
}

export default SignInForm; 