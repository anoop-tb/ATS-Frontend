
import Cookie from 'js-cookie';

interface props{
    cookiename : any,
}

const DeleteCookie = ({cookiename }: any)=>{
   // console.log("delname",cookiename)
   return Cookie.remove(cookiename)
}

export default DeleteCookie