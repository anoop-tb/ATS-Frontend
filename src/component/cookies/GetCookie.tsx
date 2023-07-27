import Cookie from 'js-cookie';

// interface props{
//     cookiename : string,
// }

const GetCookie = ({cookiename}: any)=>{
   // console.log("jwtname",cookiename)
    return Cookie.get(cookiename)
}

export default GetCookie