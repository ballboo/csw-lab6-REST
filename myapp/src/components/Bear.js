import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Bear = () => {

    const [bears, setBears] = useState({})
    const [name, setName] = useState('')
    const [weight, setWeight] = useState(0)

    useEffect(() => {
        getBears()
    }, [])

    const getBears = async () => {
        const result = await axios.get(`http://localhost/api/bears`)
        console.log(result.data)
        setBears(result.data)
    }

    const addBear = async () => {
        const result = await axios.post(`http://localhost/api/bears`, {
            name,
            weight
        })
        console.log(result.data)
        getBears()
    }

    const getBear = async (id) => {
        const result = await axios.get(`http://localhost/api/bears/${id}`)
        console.log(result.data)
        setName(result.data.name)
        setWeight(result.data.weight)
    }

    const updateBear = async (id) => {
        const result = await axios.put(`http://localhost/api/bears/${id}`, {
            name,
            weight
        })

        console.log(result.data)
        setName(result.data.name)
        setWeight(result.data.weight)
        getBears()
    }

    const deleteBear = async (id) => {
        const result = await axios.delete(`http://localhost/api/bears/${id}`)
        getBears()
    }

    const printBears = () => {
        if (bears && bears.length)
            return bears.map((bear, index) => {
                return (
                    <li key={index}>
                        {bear.name} : {bear.weight}<tr></tr>
                        <button onClick={() => getBear(bear.id)}>Get</button>
                        <button onClick={() => deleteBear(bear.id)}> Del </button>
                        <button onClick={() => updateBear(bear.id)}> Update </button>

                    </li>
                )
            })
        else {
            return (<h2> Nothing bear </h2>)
        }
    }
    return (
        <div>
            <h2>Get Bear</h2>
            <ol>
                {printBears()}
            </ol>
            Bear: {name} , {weight}
            <h2>Add Bear</h2>
            Name = <input type="text" name="name" onChange={(e) => setName(e.target.value)}/> <br />
            Weight = <input type="number" name="weight" onChange={(e) => setWeight(e.target.value)} /><br />
            <button onClick={addBear}>Add </button>
        </div>
    )
}

export default Bear;
