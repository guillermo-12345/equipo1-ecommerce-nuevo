import {React, useEffect, useState} from 'react'

let PRODUCTS=[
	{
		"id":1,
		"category":"notebook",
		"title":"Calus",
		"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " , 
		"img": "https://rukminim1.flixcart.com/image/416/416/jrxtea80/laptop-skin-decal/s/d/t/mcbk-gw11996-printed-destiny-2-skin-top-gadgets-wrap-13-original-imafdkmmqkfvphjh.jpeg?q=70",
		"price":1000,
		"stock":10,
		"purchasePrice":900

	},
{
	"id":2,
	"category":"notebook",
	"title":"Zabala",
	"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ", 
	"img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI7J56b6VP8qQpumBO3vYIadmuAkc7aiBxaw&usqp=CAU",
	"price":2000,
	"stock":5,
	"purchasePrice":900
},
{
	"id":3,
	"category":"notebook",
	"title":"Ikora",
	"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " , 
	"img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfrFrieLImoivy6RyT8Uo0E9JJbwXdh9vFbK6VotJUlXwwW8sNDW9jSJK28k-lRpy_LLc&usqp=CAU",
	"price":1000,
	"stock":8,
	"purchasePrice":900
},
{
	"id":4,
	"category":"tablet",
	"title":"Ghaul",
	"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ", 
	"img": "https://ih1.redbubble.net/image.4905772123.1475/mwo,x540,ipad_2_snap-pad,600x600,f8f8f8.u1.jpg",
	"price":2000,
	"stock":11,
	"purchasePrice":1900
},
{
	"id":5,
	"category":"celular",
	"title":"Cayde",
	"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ", 
	"img": "https://canary.contestimg.wish.com/api/webimage/607c86f9f430bd5e00f0e9be-large.jpg?cache_buster=b3875832bb88d49ddab72075169129e1",
	"price":2000,
	"stock":9,
	"purchasePrice":1900
},
{
	"id":6,
	"category":"celular",
	"title":"Rahool",
	"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ", 
	"img": "https://ae03.alicdn.com/kf/H3badf3430f4b4ce7aa3f91a2a029c50cE.jpg",
	"price":2000,
	"stock":14,
	"purchasePrice":1900
},
{
	"id":7,
	"category":"celular",
	"title":"Eramis",
	"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ", 
	"img": "https://canary.contestimg.wish.com/api/webimage/5f71fa7d58567c5f3a97c97f-large.jpg?cache_buster=38600c5da7a23eecdfa1a230ce21d154",
	"price":2000,
	"stock":11,
	"purchasePrice":1900
},
{
	"id":8,
	"category":"celular",
	"title":"Nokris",
	"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ", 
	"img": "https://canary.contestimg.wish.com/api/webimage/5f9fed8334daceb28ff01ec3-large.jpg?cache_buster=2e749519355f7ce4576853959f5603ce",
	"price":2000,
	"stock":3,
	"purchasePrice":1900
},
{
	"id":9,
	"category":"tablet",
	"title":"Atheon",
	"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ", 
	"img": "https://ih1.redbubble.net/image.4844174462.3370/mwo,x540,ipad_2_snap-pad,600x600,f8f8f8.jpg",
	"price":2000,
	"stock":6,
	"purchasePrice":1900
},
{
	"id":10,
	"category":"tablet",
	"title":"Xur",
	"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ", 
	"img": "https://ih1.redbubble.net/image.4730467754.9824/mwo,x540,ipad_2_snap-pad,600x600,f8f8f8.u1.jpg",
	"price":2000,
	"stock":19,
	"purchasePrice":1900
}
]

let SUPPLIERS = [
	{
	  id: 1,
	  name: "Proveedor 1",
	  phone: "123456789",
	  email: "proveedor1@example.com",
	  category: "notebook",
	},
	{
	  id: 2,
	  name: "Proveedor 2",
	  phone: "987654321",
	  email: "proveedor2@example.com",
	  category: "celular",
	},
	{
	  id: 3,
	  name: "Proveedor 3",
	  phone: "456789123",
	  email: "proveedor3@example.com",
	  category: "tablet",
	},
  ];
  

  const CLIENTES = [
    {
        id: 12345678,
        name: "Juan Perez",
        cuit: "20123456781"
    },
    {
        id: 87654321,
        name: "Maria Lopez",
        cuit: "20876543215"
    },
    {
        id: 23456789,
        name: "Carlos Gomez",
        cuit: "20234567897"
    },
    {
        id: 98765432,
        name: "Ana Martinez",
        cuit: "20987654326"
    },
    {
        id: 34567890,
        name: "Lucia Fernandez",
        cuit: "20345678904"
    },
    {
        id: 45678901,
        name: "Jorge Rodriguez",
        cuit: "20456789013"
    },
    {
        id: 56789012,
        name: "Laura Sanchez",
        cuit: "20567890121"
    },
    {
        id: 67890123,
        name: "Roberto Diaz",
        cuit: "20678901231"
    },
    {
        id: 78901234,
        name: "Elena Garcia",
        cuit: "20789012341"
    },
    {
        id: 89012345,
        name: "Fernando Gutierrez",
        cuit: "20890123456"
    }
];

export default CLIENTES;

  export const getSuppliers = () => {
	return new Promise((resolve) => {
	  setTimeout(() => resolve(SUPPLIERS), 300);
	});
  };
  
  export const getSupplierById = (supplierId) => {
	return new Promise((resolve) => {
	  setTimeout(() =>
		resolve(SUPPLIERS.find((sup) => sup.id === parseInt(supplierId))), 400);
	});
  };
    /*Productos*/ 

export const getProduct =()=>{
    return new Promise((resolve)=>{
        setTimeout(()=>resolve(PRODUCTS))
    },300)
}

export const getProductById =(productId)=>{

    return new Promise((resolve)=>{
        setTimeout(()=>resolve(PRODUCTS.find(prod=>prod.id=== parseInt(productId))))
    },400)
}

export const getProductsByCategory =(category)=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(PRODUCTS.filter((prod)=>prod.category===category))
        },500)
    })
}

export const deleteProduct = (id) => {
	return new Promise((resolve) => {
	  PRODUCTS = PRODUCTS.filter((product) => product.id !== id);
	  setTimeout(() => resolve(id), 300);
	});
  };
  export const updateProduct = (id, updatedProduct) => {
	return new Promise((resolve, reject) => {
	  setTimeout(() => {
		PRODUCTS = PRODUCTS.map((product) =>
		  product.id === id ? { ...product, ...updatedProduct } : product
		);
		resolve(updatedProduct);
	  }, 500);
	});
  };
  export const addProduct = (product) => {
	return new Promise((resolve) => {
	  const newProduct = { 
		id: PRODUCTS.length + 1, 
		...product 
	  };
	  PRODUCTS.push(newProduct);
	  setTimeout(() => resolve(newProduct), 300);
	});
  };

export const getClientes = () => {
	return new Promise((resolve) => {
	  setTimeout(() => resolve(CLIENTES), 300);
	});
  };


  
  export const addClientes = (cliente) => {
	return new Promise((resolve) => {
		const newCliente= { id: CLIENTES.length + 1, ...cliente };
	  CLIENTES.push(newCliente);
	  setTimeout(() => {
		resolve(newCliente);
	  }, 300);
	});
  };
  
  export const updateClientes = (id, updatedCliente) => {
	return new Promise((resolve) => {
	  const index = CLIENTES.findIndex((cliente) => cliente.id === id);
	  if (index !== -1) {
		CLIENTES[index] = { ...CLIENTES[index], ...updatedCliente };
	  }
	  setTimeout(() => {
		resolve(CLIENTES[index]);
	  }, 300);
	});
  };
  
  export const deleteClientes = (id) => {
	return new Promise((resolve) => {
	  const index = CLIENTES.findIndex((cliente) => cliente.id === id);
	  if (index !== -1) {
		CLIENTES.splice(index, 1);
	  }
	  setTimeout(() => {
		resolve(id);
	  }, 300);
	});
  };

  
  
  
  /*Fin productos */
  
  export const addSupplier = (supplier) => {
	return new Promise((resolve) => {
	  const newSupplier = { id: SUPPLIERS.length + 1, ...supplier };
	  SUPPLIERS.push(newSupplier);
	  setTimeout(() => resolve(newSupplier), 300);
	});
  };
  
  export const updateSupplier = (id, updatedSupplier) => {
	return new Promise((resolve) => {
	  SUPPLIERS = SUPPLIERS.map((supplier) =>
		supplier.id === id ? { ...supplier, ...updatedSupplier } : supplier
	  );
	  setTimeout(() => resolve({ id, ...updatedSupplier }), 300);
	});
  };
  
  export const deleteSupplier = (id) => {
	return new Promise((resolve) => {
	  SUPPLIERS = SUPPLIERS.filter((supplier) => supplier.id !== id);
	  setTimeout(() => resolve(id), 300);
	});
  };


const categories = ["notebook", "celular", "tablet"]

const Container = ({ children }) => (
	<div style={{ width: 1170, margin: "30px auto" }}>{children}</div>
)

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

