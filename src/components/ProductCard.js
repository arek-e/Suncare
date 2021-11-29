import React from 'react'

export default function ProductCard({ product }) {
    return (
        <div>
            {product.name}
            <br/>
            {product.description}
            <br/>
            {product.price +  " Kronor"}
            <p>Hello</p>
        </div>
    )
}
