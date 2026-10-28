import { api } from '@/api/api'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Products = () => {
  const [products, setProducts] = useState([])
  const [dataProductsTotalPage, setProductsTotalPage] = useState(0)
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const token = localStorage.getItem("token")

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${api}/products?limit=${limit}&page=${page}`, {
        headers: { Authorization: "Bearer " + token },
      })
      setProducts(data.data ?? [])
      setProductsTotalPage(data.totalPages ?? 0)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [limit, page])

  return (
    <div className='border p-5'>
      <h1 className='text-xl mb-3'>Products:</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((e) => (
            <TableRow key={e.id}>
              <TableCell>{e.id}</TableCell>
              <TableCell>{e.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className='flex items-center gap-4 mt-4'>
        <select
          className='border px-1'
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value))
            setPage(1)
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>

        <div className='flex gap-2'>
          {
            Array.from({ length: dataProductsTotalPage }).map((e, i) => {
              const page = i + 1
              return <p onClick={() => setDataProductsPage(page)} className='border p-2 px-4 rounded-xl cursor-pointer hover:bg-amber-50'>{page}</p>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Products