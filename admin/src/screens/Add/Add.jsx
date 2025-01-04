import React from 'react'
import './Add.css'
import { assets } from '../../assets/admin_assets/assets'
import { useState } from'react'
import axios from 'axios'
import { toast } from'react-toastify'

const Add = () => { 
    const url = 'http://localhost:4000'

    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: "Salad"
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({...data, [name]: value}))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image)
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('price', data.price)
        formData.append('category', data.category)
        const response = await axios.post(`${url}/api/food/add`,formData)
        console.log(response.data)
        if(response.data.success){
            setData({
                name: '',
                description: '',
                price: '',
                category: "Salad"
            })
            setImage(false)
            toast.success(response.data.message)
        }else{
            //show error message
            toast.error(response.data.message)
        }
    }


  return (
    <div className='add'>
        <form onSubmit={onSubmitHandler} className='flex-col'>
            <div className='add-img-upload flex-col'>
                <p><b>Upload Image</b></p><br/>
                <label htmlFor="image">
                <img src={ image ? URL.createObjectURL(image) : assets.upload_area} alt=""/>
                </label>
                <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" id="image" hidden required/>
            </div>
            <div className="add-product-name flex-col"><br />
                <p><b>Product Name</b></p><br />
                <input onChange={onChangeHandler} value={data.name}  type="text" name='name' placeholder='Type here' />
            </div>
            <div className="add-product-description flex-col"><br />
                <p><b>Product description</b></p><br />
                <textarea  onChange={onChangeHandler} value={data.description} name="description" placeholder='write content here' rows="6"></textarea>

            </div>
            <div className="add-category-price flex-col">
                <div className="add-category flex-col"><br />
                    <p><b>Product Category</b></p><br />
                    <select onChange={onChangeHandler} value={data.category} name="category">
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                    </select>
            </div>
            <div className="add-price flex-col"><br />
                <p><b>Product Price</b></p><br />
                <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder='$20' />
            </div>
            </div><br />

            <button type='submit' className='add-btn'>ADD</button>
        </form>
    </div>
  )
}

export default Add