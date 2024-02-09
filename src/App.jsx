import { useEffect, useState } from 'react'
import './App.css'
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';

// import axios from 'axios';

import Switch from '@mui/material/Switch';
import BasicModal from './modal';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

function App() {
  const [data, setData] = useState([{ "name": "Bluetooth", "category": "Electronic", "value": "black", "quantity": 5, "price": "$30" }, { "name": "Edifier M43560", "category": "Electronic", "value": "black", "quantity": 0, "price": "$0" }, { "name": "Sony 4k ultra 55 inch TV", "category": "Electronic", "value": "black", "quantity": 17, "price": "$70" }, { "name": "Samsumg 55 inch TV", "category": "Electronic", "value": "black", "quantity": 50, "price": "$12" }, { "name": "samsumg S34 Ultra", "category": "phone", "value": "black", "quantity": 0, "price": "$0" }])
  const [checked, setChecked] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [editableProduct, setEditableProduct] = useState({})
  const [disabledProducts, setDisabledProducts] = useState([])

  const [overAllStoreDate, setOverAllStoreData] = useState({
    total_products: 0,
    total_value: 0,
    out_of_stock: 0,
    no_of_category: 0
  })

  const handleModalState = (val) => {
    setOpenModal(val)
  }

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleDelete = (item, index, isEnabledProducts) => {

    if (isEnabledProducts) {
      let updatedProducts = data.filter((item, i) => i != index)
      setData([...updatedProducts])
    } else {
      let updatedProducts = disabledProducts.filter((item, i) => i != index)
      setDisabledProducts([...updatedProducts])
    }


    console.log(Number(item?.price?.substring(1) * item.quantity))


  }

  const handleDisable = (item, index) => {

    let updatedProducts = data.filter((item, i) => i != index)
    setData([...updatedProducts])
    setDisabledProducts([...disabledProducts, item])

  }

  const handleEnable = (item, index) => {

    let updatedProducts = disabledProducts.filter((item, i) => i != index)
    setData([...data, item])
    setDisabledProducts([...updatedProducts])

  }

  const handleEdit = (oldItem, newItem) => {

    let updateData = data.map((item) => {
      if (item.category == oldItem.category && item.price == oldItem.price && item.quantity == oldItem.quantity && item.value == oldItem.value) {
        return newItem
      } else {
        return item;
      }
    })
    setData([...updateData])

  }

  // const getData = async () => {
  //   await axios.get('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory')
  //     .then((res) => {
  //       setData(res.data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  const handleOverAllStoreData = () => {
    let arr = [...data,...disabledProducts]

    let category = {}
    let total_amount = 0;

    arr?.map((item) => {
      category[item.category] = item.category
      total_amount += Number(item?.price?.substring(1) * item.quantity)
    })

    let obj = { ...overAllStoreDate }
    obj["no_of_category"] = Object.keys(category)?.length
    obj["total_value"] = total_amount
    obj['total_products'] = data.length
    obj['out_of_stock'] = disabledProducts.length

    setOverAllStoreData({ ...obj })

  }

  useEffect(() => {
    handleOverAllStoreData()
  }, [disabledProducts, data])


  useEffect(() => {
    console.log('inside')
    // getData()
    setDisabledProducts([])
    handleOverAllStoreData()
  }, [])



  return (
    <>
      <div style={{ background: "black", height: "100Vh", width: "100vw" }}>
        <div style={{ height: '50px', display: "flex", alignItems: "center", gap: 10, justifyContent: 'flex-end' }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>admin</div>
            <Switch {...label} onChange={handleChange} size="small" color="warning" />
            <div>user</div>
          </div>
          <div style={{ marginRight: 10,display:"flex",alignItems:"center",justifyContent:"center" }}>
            <LogoutIcon/>
          </div>
        </div>

        <div style={{ marginLeft: 10, marginRight: 10 }}>
          <div style={{ height: '160px', padding: 0 }}>
            <div style={{ padding: 0, height: '20%' }}><h2 style={{ margin: 0, marginBottom: 10 }}>Inventory stats</h2></div>
            <div style={{ height: 10 }}></div>
            <div style={{ height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: '24%', height: "90%", borderRadius: '20px', background: "#2c5421", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>

                <div style={{ height: '30%', width: '90%', display: "flex" }}>
                  <div style={{ width: '15%', height: '100%', display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ShoppingCartIcon />
                  </div>
                  <div style={{ width: '85%', height: '100%', display: "flex", alignItems: "center", fontWeight: "500" }}>Total Product</div>
                </div>

                <div style={{ height: '50%', width: '90%', display: 'flex' }}>
                  <div style={{ width: '15%', height: '100%' }}></div>
                  <div style={{ width: '85%', height: '100%', display: "flex", alignItems: "center", fontSize: "40px", fontWeight: "bold" }}>{data?.length}</div>
                </div>

              </div>

              <div style={{ width: '24%', height: "90%", borderRadius: '20px', background: "#2c5421", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>

                <div style={{ height: '30%', width: '90%', display: "flex" }}>
                  <div style={{ width: '15%', height: '100%', display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CurrencyExchangeIcon />
                  </div>
                  <div style={{ width: '85%', height: '100%', display: "flex", alignItems: "center", fontWeight: "500" }}>Total Store Value</div>
                </div>

                <div style={{ height: '50%', width: '90%', display: 'flex' }}>
                  <div style={{ width: '15%', height: '100%' }}></div>
                  <div style={{ width: '85%', height: '100%', display: "flex", alignItems: "center", fontSize: "40px", fontWeight: "bold" }}>{overAllStoreDate.total_value}</div>
                </div>

              </div>

              <div style={{ width: '24%', height: "90%", borderRadius: '20px', background: "#2c5421", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>

                <div style={{ height: '30%', width: '90%', display: "flex" }}>
                  <div style={{ width: '15%', height: '100%', display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <RemoveShoppingCartIcon />
                  </div>
                  <div style={{ width: '85%', height: '100%', display: "flex", alignItems: "center", fontWeight: "500" }}>Out of stock</div>
                </div>

                <div style={{ height: '50%', width: '90%', display: 'flex' }}>
                  <div style={{ width: '15%', height: '100%' }}></div>
                  <div style={{ width: '85%', height: '100%', display: "flex", alignItems: "center", fontSize: "40px", fontWeight: "bold" }}>{overAllStoreDate.out_of_stock}</div>
                </div>

              </div>

              <div style={{ width: '24%', height: "90%", borderRadius: '20px', background: "#2c5421", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>

                <div style={{ height: '30%', width: '90%', display: "flex" }}>
                  <div style={{ width: '15%', height: '100%', display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CategoryIcon />
                  </div>
                  <div style={{ width: '85%', height: '100%', display: "flex", alignItems: "center", fontWeight: "500" }}>No of Category</div>
                </div>

                <div style={{ height: '50%', width: '90%', display: 'flex' }}>
                  <div style={{ width: '15%', height: '100%' }}></div>
                  <div style={{ width: '85%', height: '100%', display: "flex", alignItems: "center", fontSize: "40px", fontWeight: "bold" }}>{overAllStoreDate.no_of_category}</div>
                </div>

              </div>
            </div>
          </div>

          {data.length > 0 && <div style={{ border: "1px solid #636363", minHeight: '100px', borderRadius: 20, marginTop: 30, background: 'rgb(100, 102, 100,0.3)' }}>

            <div style={{ display: "flex", flexDirection: "row", borderBottom: "1px solid #636363", height: 50 }}>
              <div style={{ width: "25%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <span style={{ padding: '3px 10px', borderRadius: 10, background: 'black', color: "#547d38" }}>Name</span>
              </div>
              <div style={{ width: "15%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <span style={{ padding: '3px 10px', borderRadius: 10, background: 'black', color: "#547d38" }}>Category</span>
              </div>
              <div style={{ width: "15%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <span style={{ padding: '3px 10px', borderRadius: 10, background: 'black', color: "#547d38" }}>Price</span>
              </div>
              <div style={{ width: "15%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <span style={{ padding: '3px 10px', borderRadius: 10, background: 'black', color: "#547d38" }}>Quantity</span>
              </div>
              <div style={{ width: "15%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <span style={{ padding: '3px 10px', borderRadius: 10, background: 'black', color: "#547d38" }}>Value</span>
              </div>
              <div style={{ width: "15%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <span style={{ padding: '3px 10px', borderRadius: 10, background: 'black', color: "#547d38" }}>Action</span>
              </div>
            </div>

            {
              data.map((item, index) => {
                return <div key={'enabledProducts'+index} style={{ display: "flex", flexDirection: "row", borderBottom: data.length - 1 == index ? "" : "1px solid #636363", height: 60 }}>
                  <div style={{ width: "25%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                    <span style={{ padding: '3px 10px' }}>{item.name}</span>
                  </div>
                  <div style={{ width: "15%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                    <span style={{ padding: '3px 10px' }}>{item.category}</span>
                  </div>
                  <div style={{ width: "15%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                    <span style={{ padding: '3px 10px' }}>{item.price}</span>
                  </div>
                  <div style={{ width: "15%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                    <span style={{ padding: '3px 10px' }}>{item.quantity}</span>
                  </div>
                  <div style={{ width: "15%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                    <span style={{ padding: '3px 10px' }}>{"$" + item?.price?.substring(1) * item.quantity}</span>
                  </div>
                  <div style={{ width: "15%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                    <span style={{ padding: '3px 10px', display: 'flex' }}>
                      <div style={{ margin: "0 5px" }}>
                        {checked ? <CreateIcon sx={{ color: 'gray', fontSize: 15 }} /> :
                          <CreateIcon sx={{ color: 'green', fontSize: 15 }} onClick={() => {
                            console.log('clicked')
                            setEditableProduct(item)
                            setOpenModal(true)
                          }} />}
                      </div>
                      <div style={{ margin: "0 5px" }}>
                        {
                          checked ? <VisibilityIcon sx={{ color: 'gray', fontSize: 15 }} /> :
                            <VisibilityIcon sx={{ color: '#cdaed6', fontSize: 15 }} onClick={() => {
                              console.log('clicked')
                              handleDisable(item, index)
                            }} />
                        }
                      </div>
                      <div style={{ margin: "0 5px" }}>

                        {checked ? <DeleteIcon sx={{ color: "gray", fontSize: 15 }} /> :
                          <DeleteIcon sx={{ color: 'red', fontSize: 15 }} onClick={() => {
                            handleDelete(item, index, true)
                          }} />}

                      </div>
                    </span>
                  </div>
                </div>
              })
            }
          </div>}


          {disabledProducts.length > 0 && <h2>Disabled Products</h2>}
          {disabledProducts.length > 0 && <div style={{ border: "1px solid #636363", minHeight: '100px', borderRadius: 20, marginTop: 30, background: 'rgb(100, 102, 100,0.3)' }}>

            <div style={{ display: "flex", flexDirection: "row", borderBottom: "1px solid #636363", height: 50 }}>
              <div style={{ width: "25%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <span style={{ padding: '3px 10px', borderRadius: 10, background: 'black', color: "#547d38" }}>Name</span>
              </div>
              <div style={{ width: "15%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <span style={{ padding: '3px 10px', borderRadius: 10, background: 'black', color: "#547d38" }}>Category</span>
              </div>
              <div style={{ width: "15%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <span style={{ padding: '3px 10px', borderRadius: 10, background: 'black', color: "#547d38" }}>Price</span>
              </div>
              <div style={{ width: "15%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <span style={{ padding: '3px 10px', borderRadius: 10, background: 'black', color: "#547d38" }}>Quantity</span>
              </div>
              <div style={{ width: "15%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <span style={{ padding: '3px 10px', borderRadius: 10, background: 'black', color: "#547d38" }}>Value</span>
              </div>
              <div style={{ width: "15%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <span style={{ padding: '3px 10px', borderRadius: 10, background: 'black', color: "#547d38" }}>Action</span>
              </div>
            </div>

            {
              disabledProducts.map((item, index) => {
                return <div key={"disabledProduct"+index} style={{ display: "flex", flexDirection: "row", borderBottom: disabledProducts.length - 1 == index ? "" : "1px solid #636363", height: 60 }}>
                  <div style={{ width: "25%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                    <span style={{ padding: '3px 10px' }}>{item.name}</span>
                  </div>
                  <div style={{ width: "15%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                    <span style={{ padding: '3px 10px' }}>{item.category}</span>
                  </div>
                  <div style={{ width: "15%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                    <span style={{ padding: '3px 10px' }}>{item.price}</span>
                  </div>
                  <div style={{ width: "15%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                    <span style={{ padding: '3px 10px' }}>{item.quantity}</span>
                  </div>
                  <div style={{ width: "15%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                    <span style={{ padding: '3px 10px' }}>{"$" + item?.price?.substring(1) * item.quantity}</span>
                  </div>
                  <div style={{ width: "15%", display: "flex", alignItems: "center", paddingLeft: 10 }}>
                    <span style={{ padding: '3px 10px', display: 'flex' }}>
                      <div style={{ margin: "0 5px" }}>
                        <CreateIcon sx={{ color: 'gray', fontSize: 15 }} />
                      </div>
                      <div style={{ margin: "0 5px" }}>
                        {
                          checked ? <VisibilityOffIcon sx={{ color: 'gray', fontSize: 15 }} /> :
                            <VisibilityOffIcon sx={{ color: '#cdaed6', fontSize: 15 }} onClick={() => {
                              console.log('clicked')
                              handleEnable(item, index)
                            }} />
                        }
                      </div>
                      <div style={{ margin: "0 5px" }}>

                        {checked ? <DeleteIcon sx={{ color: "gray", fontSize: 15 }} /> :
                          <DeleteIcon sx={{ color: 'red', fontSize: 15 }} onClick={() => {
                            handleDelete(item, index, false)
                          }} />}

                      </div>
                    </span>
                  </div>
                </div>
              })
            }
          </div>}

        </div>

        
        <BasicModal modalState={openModal} handleModalState={handleModalState} editableProduct={editableProduct} handleEdit={handleEdit} />
      </div>
    </>
  )
}

export default App
