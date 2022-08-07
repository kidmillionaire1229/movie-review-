import {useSelector} from 'react-redux' 
import { useEffect, useState } from 'react'
import port from './../../data/port.json'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import $ from 'jquery'
import {useParams} from "react-router-dom"
import { useNavigate } from 'react-router-dom'
const Update = () => {
    const navigate = useNavigate()
    const params = useParams(); 
    const [shortId,setShortId] = useState("")
    const [cookies,setCookie,removeCookie] = useCookies(["userData"]); 
    const [updateData, setUpdateData] = useState({}); 
    
    // let getReduxShortId = useSelector(state=>state.id.value); 
    
    useEffect(()=>{
        
        
        // if(getReduxShortId !==""){
        //     setShortId(getReduxShortId); 
        // }
        
        findGetReviewData(params.id)
        .then((res)=>{
            //console.log(res);
        setUpdateData(res.data); 
        }
        ); 
    },[])


    useEffect(()=>{
        console.log(updateData)
    
    },[updateData]); 



    const findGetReviewData = async() => {
        return await axios.get(port.url+`/posts/${params.id}/find`,{
            headers:{
                accessToken: cookies.userData.accessToken
            }
        }); 
    }

    const onChangeUpdateData = (e) =>{
        setUpdateData({
            ...updateData,
            [e.target.name]: e.target.value 
        })
        console.log(updateData)
    }

    const onClickChangeUpdateData = () => 
    {
        if(updateData.img===""){
            alert("이미지 경로를 입력해주세요"); 
            $('#img').focus(); 
            return; 
        }
        if(updateData.title===""){
            alert("제목을 입력해주세요"); 
            $('#title').focus(); 
            return; 
        }
        if(updateData.content===""){
            alert("내용을 입력해주세요"); 
            $('#content').focus(); 
            return; 
        }
        sendUpdateData().then((res)=>{

            navigate('/review/list')
        }).catch(e=>console.log(e));
    }


    const sendUpdateData = async() =>
    {
        //console.log(params.id)
        return await axios.post(port.url+`/posts/${params.id}/update`,updateData,{
            headers:{
                accessToken: cookies.userData.accessToken
            }
        })
    }
    return (
        <div className="album">
            <div className="container">
                <div className="card mb-3">
                    <div className="card-img-top" style={{ textAlign: "center" }}>
                        <img src={updateData.img}
                            alt="..." />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Movie Img</h5>
                        <p className="card-text">
                            Img Example
                        </p>
                        <input type="text" className="form-control" onChange={onChangeUpdateData} disabled name="img" id="img" placeholder="사진 URL을 입력해주세요." />
                        <p className="card-text"><small className="text-muted">url...</small></p>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">제목</label>
                    <input type="text" onChange={onChangeUpdateData} defaultValue={updateData.title}className="form-control" name="title" id="title" placeholder="제목을 입력해주세요." />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">내용</label>
                    <textarea onChange={onChangeUpdateData} defaultValue={updateData.content}className="form-control" name="content" id="content" rows="3"></textarea>
                </div>
                <button onClick={onClickChangeUpdateData} type="button" className="btn btn-outline-primary" style={{ marginRight: "2%" }}>수정</button>
                <button onClick={()=>{window.history.back()}} type="button" className="btn btn-outline-danger">뒤로가기</button>
            </div>
        </div>
    )
}

export default Update;