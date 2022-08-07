import axios from "axios"
import { useEffect } from "react";
import port from './../../../data/port.json'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const KakaoCallBack = () =>{
    const KAKAO_PARAMS = new URL(window.location.href).searchParams.get("code"); 
    const navigate = useNavigate(); 
    const [cookies, setCookie, removeCookie] = useCookies(["userData"]);  
    const [cookiesAuth, setCookieAuth, removeCookieAuth] = useCookies(["auth"])

    
    useEffect(()=>{
        //console.log(KAKAO_PARAMS)
        sendCode()
        .then((res)=>{
            console.log(res)
            if(res.data.login){
                setCookie("userData",res.data,{path:"/"})
                navigate('/review/list')
            }else{
                setCookie('auth',res.data,{path:"/"})
                navigate('/oauth/signUp'); 
            }
        })
        .catch((e)=>{
            console.log(e)
            navigate('/')
        })
    },[])

    const sendCode = async() => {
        return await axios.get(port.url+`/auth/kakao`,{
            params:{
                code: KAKAO_PARAMS
            } 
        })
    }
}
export default KakaoCallBack