import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
const Home = () => {
  let api = "https://test-swagger-2ph6.onrender.com"
  const [data, setData] = useState([])
  const [elemEdit, setElemEdit] = useState({})
  const token = localStorage.getItem("token")
  async function get() {
    try {

      let data = await axios.get(api + "/users", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setData(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  async function handleDelete(id) {
    try {
      await axios.delete(api + "/users/" + id, {
        headers: { Authorization: `Bearer ${token}` }
      })
      get()
    } catch (error) {
      console.log(error)
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    let obj = {
      name: e.target.name.value,
      email: e.target.email.value,
      city: e.target.city.value,
      role: e.target.select.value,
      password: e.target.password.value
    }
    addUser(obj)
  }
  async function addUser(user) {
    try {
      await axios.post(api + "/users", user, {
        headers: { Authorization: `Bearer ${token}` }
      })
      get()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    get()
  }, [])

  return (
    <>
      <Dialog>
        <DialogTrigger className="bg-blue-600 p-2 rounded-[10px] text-white m-2">Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <Input placeholder="Name" name="name" />
                <Input placeholder="City" name="city" />
                <Input placeholder="Email" name="email" />
                <select name="select" id="">
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                <Input placeholder="Password" name="password" />

                <DialogClose> <button type='submit' className='bg-black p-2 text-white'>Save</button></DialogClose>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">FullName</TableHead>
            <TableHead>EMAIL</TableHead>
            <TableHead className="w-[260px]">CITY</TableHead>
            <TableHead >ROLE</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((el) => {
            return <TableRow key={el.id}>
              <TableCell>{el.name}</TableCell>
              <TableCell>{el.email}</TableCell>
              <TableCell>{el.city}</TableCell>
              <TableCell>{el.role}</TableCell>
              <TableCell>
                <Button onClick={() => handleDelete(el.id)} className="p-4 bg-red-900">Delete</Button>
                <Dialog>
                  <DialogTrigger><Button onClick={()=> setElemEdit(el)} className="bg-green-900 p-4">Edit</Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                       <form action="">
                        <Input value={elemEdit.name} onChange={(e)=> setElemEdit({...elemEdit,name:e.target.value})} name="name" />
                        <Input  value={elemEdit.email} onChange={(e)=> setElemEdit({...elemEdit,email:e.target.value})} name="email"/>
                        <Input  value={elemEdit.city} onChange={(e)=> setElemEdit({...elemEdit,city:e.target.value})} name="city"/>
                        <select name="" id=""  value={elemEdit.role} onChange={(e)=> setElemEdit({...elemEdit,role:e.target.value})} >
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </select>
                        <Input   value={elemEdit.password} onChange={(e)=> setElemEdit({...elemEdit,password:e.target.value})} name="password"/>
                       </form>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </>
  )
}

export default Home