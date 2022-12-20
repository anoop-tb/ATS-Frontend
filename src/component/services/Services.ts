
const EmployeeDetails = async(data:any[]) =>{

    const url = "http://192.168.168.50:8000/candidates?search_id=yutrepoinmd4545&email_id=anoop.tb%40accionlabs.com&skills=react%2Cnode.js&exp_l=2&exp_h=5&location=mumbai&job_title=full%20stack"
    try{
        const response = await fetch(url);
        const json = await response.json();
        return(json)
    }catch(error){
        return(error)
    }
} 

export default EmployeeDetails