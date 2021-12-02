import React from 'react'

export default function ProductCard({ product }) {
    return (
        <div>
            {product.pName}
            <br/>
            {product.pDesc}
            <br/>
            {product.price +  " Kronor"}
            <img src={ product.thumbnail } alt="Hej"/>
        </div>
    )
}
