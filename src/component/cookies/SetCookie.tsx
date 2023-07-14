import Cookie from 'js-cookie';
interface props{
    cookiename : string,
    cookieValue : string,
}
const SetCookie = ({cookiename,cookieValue }: props)=>{
    Cookie.set(cookiename,cookieValue,{
        expires:15,
        secure:true,
        sameSite:'strict',
        path:'/'
    })
}
export default SetCookie