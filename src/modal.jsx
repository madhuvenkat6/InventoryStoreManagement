// import * as React from 'react';
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 200,
  // bgcolor: 'background.paper',
  bgcolor: "#1c1b1b",
  // border: '2px solid #000',
  borderRadius: 5,
  boxShadow: 24,
  p: 3,
};

export default function BasicModal({ modalState, handleModalState, editableProduct ,handleEdit}) {
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({})
  const handleClose = () => {
    setOpen(false)
    handleModalState(false)
  };


  const handleCurrentProduct = (key, value) => {
    let obj = { ...currentProduct }
    obj[key] = value
    setCurrentProduct({ ...obj })
  }

  useEffect(() => {
    setOpen(modalState)
  }, [modalState])

  useEffect(() => {
    let obj = {...editableProduct}
    obj.price = editableProduct?.price?.substring(1)
    setCurrentProduct({ ...obj })
  }, [editableProduct])

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={(event, reason) => {
          if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            handleClose()
          }
        }}
      >
        <Box sx={style}>
          <div style={{ height: '100%', background: "#1c1b1b", display: "flex", flexDirection: 'column' }}>
            <div style={{ height: '15%', width: '100%', display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontSize: 20 }}>Edit Product</p>

              <CloseIcon sx={{ color: "#547d38", borderRadius: 1, background: 'rgb(100, 102, 100,0.3)' }} onClick={handleClose} />

            </div>

            <div style={{ height: '10%', width: '100%', display: "flex" }}>
              <div style={{ fontSize: 10 }}>{currentProduct.name}</div>
            </div>

            <div style={{ height: '60%', width: '100%', display: "flex", flexDirection: "column", marginTop: 5 }}>
              <div style={{ height: '50%', display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: '48%' }}>
                  <label style={{ fontSize: 12 }}>Category</label>
                  <input type='text' value={currentProduct?.category} onChange={(e) => { handleCurrentProduct("category", e.target.value) }} style={{ padding: 5, width: '95%', borderRadius: 5, border: 0, fontSize: 12, color: 'gray' }} />
                </div>
                <div style={{ width: '48%' }}>
                  <label style={{ fontSize: 12 }}>Price</label>
                  <input type='text' value={currentProduct?.price} onChange={(e) => {
                    if(!isNaN(Number(e.target.value))){
                      handleCurrentProduct("price", e.target.value)
                    }else{
                      return
                    }
                      
                  }} style={{ padding: 5, width: '95%', borderRadius: 5, border: 0, fontSize: 12, color: 'gray' }} />
                </div>
              </div>

              <div style={{ height: '50%', display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: '48%' }}>
                  <label style={{ fontSize: 12 }}>Quantity</label>
                  <input type='text' value={currentProduct.quantity} onChange={(e) => {

                    handleCurrentProduct("quantity", e.target.value)


                  }} style={{ padding: 5, width: '95%', borderRadius: 5, border: 0, fontSize: 12, color: 'gray' }} />
                </div>
                <div style={{ width: '48%' }}>
                  <label style={{ fontSize: 12 }}>Value</label>
                  <input type='text' value={currentProduct.value} onChange={(e) => { handleCurrentProduct("value", e.target.value) }} style={{ padding: 5, width: '95%', borderRadius: 5, border: 0, fontSize: 12, color: 'gray' }} />
                </div>
              </div>

            </div>

            <div style={{ height: '15%', width: '100%', display: "flex", justifyContent: "end", marginTop: 5 }}>
              <div style={{ color: '#547d38' }} onClick={()=>{
                setCurrentProduct({...editableProduct})
                handleClose()
              }}>Cancle</div>
              <button style={{ display: "flex", alignItems: "center", justifyContent: "center", marginRight: 10, marginLeft: 20, background: 'rgb(100, 102, 100,0.3)', color: "gray" }} onClick={()=>{
                let obj = {...currentProduct}
                obj['price'] =  '$'+ currentProduct['price']
                handleEdit(editableProduct,obj)
                handleClose()
                }}>Save</button>
            </div>


          </div>

        </Box>
      </Modal>
    </div>
  );
}
