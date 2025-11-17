import React, { Children } from 'react'
import { useState,useEffect} from 'react'
import EmployeeCard from '../../pages/employeeList/EmployeeList'
import {useParams} from 'react-router-dom';
import * as Constants from '../../Constants';
import {Empty, Layout}  from 'antd'
import Navbar from '../filterPage/Navbar';

const EmployeeList =()=>{
    const [enterEmployeeList,setEmployeeList] = useState<any[]>([])
    const params = useParams()
    useEffect(()=>{
        if(enterEmployeeList.length==0){
            getEmployeeList()
        }
    })
    const getEmployeeList = async() =>{
        let id = params.id  
        // let url = `http://192.168.168.50:8000/matchcase_id?id=${id}`
        let url = `${Constants.getEmployeeListUrl}?id=${id}`
        try{
            const response = await fetch(url);
            const json = await response.json();
            console.log(json)
            setEmployeeList(json)
        }catch(error){
            console.log("error")
            alert(error)
        }
    }
    const toggleSwitch = (id:React.Key) =>{
        const newResponse = [...enterEmployeeList];
        // newResponse.id[id] = 
        // const checkId  = newResponse.includes[id]
        newResponse.map(each =>{
          if(each.phone == id){
            each.skill_status = !each.skill_status
          }
        })
        setEmployeeList(newResponse)
      }
    console.log("employeelist running")
    console.log("employee",enterEmployeeList)
    return (
        <Layout>
            <Navbar/>
            <ul>
                {/* {enterEmployeeList?.length >0 ? (enterEmployeeList.map((each) =>(
                    <EmployeeCard key ={each.search_id} cardValue={each} toggleSwitch={toggleSwitch}/>
                ))) : (<Empty style={{width:'100%',alignItems:'center', marginTop:'100px'}} />)} */}
                {enterEmployeeList.map((each:any) =>(
                    <li>
                        <p>{each.name}</p>
                    </li>
                ))}
            </ul>
        </Layout>
    )
}
export default EmployeeList