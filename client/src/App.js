import {Route, Routes} from "react-router-dom"
import Footer from "./Footer";
import Header from "./Header";
import Login from "./Login"; 
import Review from "./Review";
import ReviewCreate from "./ReviewCreate";
import ReviewDetail from "./ReviewDetail";
import ReviewUpdate from "./ReviewUpdate";
import SocialSignUp from "./pages/user/SocialSignUp"

//social
import KakaoCallBack from "./pages/user/kakao/KakaoCallBack";
//redux 
import Store from "./app/Store";
import {Provider} from 'react-redux'; 

function App() {
  return (
   <>
   <Provider store={Store}>
   <Header/>
   <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="oauth">
        <Route path="kakao/callback" element={<KakaoCallBack/>}/>
        <Route path="signUp" element={<SocialSignUp/>}/>
      </Route>
      <Route path="review">  
        <Route path="list" element={<Review/>}/>
        <Route path="create"element={<ReviewCreate/>}/>
        <Route path=":id" >
          <Route path="detail" element={<ReviewDetail/>}/>
          <Route path="update"element={<ReviewUpdate/>}/>
        </Route>
      </Route>
   </Routes>
   <Footer/>
   </Provider>
   </>
  );
}

export default App;
