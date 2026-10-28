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
const Catalog = () => {
    let api = "https://test-swagger-2ph6.onrender.com/catalogs"
    let [data, setData] = useState([])
    async function getCatalog() {
        try {
            let data = await axios.get(api)
            setData(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCatalog()
    }, [])

    return (
        <>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[350px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data.map((el) => {
                            return <TableRow key={el.id}>
                                <TableCell>{el.slug}</TableCell>
                                <TableCell>{el.name }</TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>

        </>
    )
}

export default Catalog