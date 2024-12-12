import {React, useEffect, useState} from 'react'
export const OptionList = () => {
	const { products, selectValue, changeSelect } = useList(PRODUCTS)

	return (
		<Container>
			<h1>Producto</h1>
			<select value={selectValue} onChange={changeSelect}>
				<option value="all">TODOS</option>
				{categories.map(category => (
					<option value={category}>{category}</option>
				))}
			</select>
			{!products?.length ? (
				<div>Loading...</div>
			) : (
				products.map(prod => (
					<div key={prod.id}>
						{(prod.title)} - {prod.category}
					</div>
				))
			)}
		</Container>
	)
} 
export const useList = productList => {
	const [products, setProduct] = useState([])
	const [renderProducts, setRenderProducts] = useState([])
	const [selectValue, setSelectValue] = useState("")

	useEffect(() => {
		const productPromise = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(productList)
			}, 2000)
		})
		productPromise.then(result => {
			setProduct(result)
			setRenderProducts(result)
		})
	}, [productList])

	const changeSelect = event => {
		setSelectValue(event.target.value)
		if (event.target.value === "Productos") {
			setRenderProducts(products)
		} else {
			const newProductList = products.filter(
				products => products.category === event.target.value
			)
			setRenderProducts(newProductList)
		}
	}

	return { products: renderProducts, selectValue, changeSelect }
}

