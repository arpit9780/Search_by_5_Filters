import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"

export const Dashboard = () => {
    const [post, setPost] = useState()
    const { register, handleSubmit, reset } = useForm()
    const [searchArr, setSearchArr] = useState()
    
    useEffect(() => {
        fetch("https://63c631bfd307b769673459e0.mockapi.io/get")
        .then((res) => res.json())
        .then((json) => {
            setPost(json)
            setSearchArr(json)
        })
    }, [])
    // ........................................Search Filter........................................
    const onSubmit = (data) => {
        const filteredData = post?.filter((el) => {
            return (
                data.id ? el.id === data.id : !data.id
                    &&
                    data.name ? el.name === data.name : !data.name
                        &&
                        data.department ? el.department === data.department : !data.department
                            &&
                            data.city ? el.city === data.city : !data.city
                                &&
                                data.date ? el.createdAt.includes(data.date) : !data.date
            )
        })
        setSearchArr(filteredData)
    }

    const clearField = () => {
        reset()
        setSearchArr(post)
    }

    return (
        <>
                <div className='side-bar' >
                    
                    <h1>Search Filter </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="form-group" >
                        <label>Id</label>
                        <input className='form-control' type="number" {...register("id")} />
                        <label>Name</label>
                        <input className='form-control' type="text" {...register("name")} />
                        <label>Department</label>
                        <input className='form-control' type="text" {...register("department")} />
                        <label>City</label>
                        <input className='form-control' type="text" {...register("city")} />
                        <label>Date</label>
                        <input className='form-control' type="date" {...register("date")} />
                        <button type='submit' className='btn btn-primary m-3' >Submit</button>
                        <button className='btn btn-danger m-3' onClick={() => clearField()}>Clear</button>
                    </form>
                </div>
                
            <div className='row'>
                <div className='col-3'>

                </div>
                <div className='col-9'>
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Department</th>
                                <th scope="col">Date</th>
                                <th scope="col">City</th>

                            </tr>
                        </thead>
                           {searchArr?.map((item, i) => {
                                return (
                                    <tbody>
                                        <tr key={i}>
                                            <td><img src={item.avatar} alt="" /></td>
                                            <th scope="row" >{item.id}</th>
                                            <td>{item.name}</td>
                                            <td>{item.department}</td>
                                            <td>{item.createdAt}</td>
                                            <td>{item.city}</td>
                                        </tr>
                                    </tbody>
                                )
                            })
                        }
                    </table>
                </div>
            </div>
        </>
    )
}

