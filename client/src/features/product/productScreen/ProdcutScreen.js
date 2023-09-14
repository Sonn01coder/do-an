import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ProductContext } from '../../../shared/dataContext/ProductContetx'

export default function ProductScreen() {
  const {products} = useContext(ProductContext)
  
  const {path} = useParams()
  console.log(path);

  const product = products.find(product => product.slug.trim() === path)

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={JSON.parse(product.image)[0]} alt={product.name} />
    </div>
  )
}
