import React, { useState } from 'react';
import Modal from './Modal';
import InputType from './InputType';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/features/auth/authSlice';
import PreLoder from './Preloder';


function Inventory() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading,setIsLoading]=useState(false)
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const {user}=useAppSelector(selectAuth)

  interface IInventoryForm{
    inventoryType:string,
    bloodGroup:string,
    quantity:number,
    email:string

  }

 
  const bloodGroups = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];


  /* ---------------------------- use of use formik --------------------------- */
const {values,handleChange,handleSubmit,errors,touched} = useFormik({
    initialValues:{
        inventoryType:'in',
        bloodGroup:'',
        quantity:0,
        email:''
    },
    onSubmit:async (values:IInventoryForm,action) => {
        try{
            if(!values.inventoryType || !values.bloodGroup || !values.email || !values.quantity){
              toast.error('All field is required')
              
           }else if(values.quantity < 1 ){
            toast.error('Your Quantity should be positive')
           }else{
            setIsLoading(true)
            /* ------------------------------ Post Api call ----------------------------- */
            const response=await fetch('/api/inventory/create', {
             method: 'POST',
             body: JSON.stringify({
                 inventoryType:values.inventoryType,
                 bloodGroup:values.bloodGroup,
                 quantity:values.quantity,
                 email:values?.email,
                 organisation:user?._id
             }),
             headers: { 'content-type': 'application/json' }
           }).then(response => {
             if (!response.ok) {
             console.log('Network response was not ok');
             }
             return response.json(); 
             })
             .then(data => {
             if(data.success===false){
                 toast.error(data.error)
                 setIsLoading(false)
                 setTimeout(() => {
                     window.location.reload()
                   }, 1000);
             }else if(data.success===true){
                 toast.success(data.message)
                 setIsLoading(false)
                 setTimeout(() => {
                     window.location.reload()
                   }, 1000);
             }
         })
           }

           

          
          action.resetForm()
        }catch(error:any){
            toast.error(error.response.data.message)
            setTimeout(() => {
                window.location.reload()
              }, 1000);

        }
    },
  });

  return (
    <div className="">
      <button
        onClick={openModal}
        className="btn bg-red-400 btn-sm"
      >
        Add Inventory
      </button>

      <Modal isOpen={isOpen} onClose={closeModal}>
      <div className=" flex items-center justify-center bg-base-200 flex-wrap">
     
      <h2 className="text-lg font-semibold mb-4 lg:ml-3 md:ml-2 mt-6">Manage Blood</h2>
        <form className='' onSubmit={handleSubmit}>
        <div className="bg-white mt-14 mb-14 p-8 rounded-md shadow-lg w-96 mx-5">
        <div className="mb-4">
          <label className="block text-gray-700 text-[12px] font-bold mb-2" htmlFor="role">
            Inventory Type
          </label>
          
          <div className="flex text-[12px]">
                <div className="w-96">
                    {/* /* ----------------------------- Inventory type ----------------------------- */}
                    <div className="flex text-[12px] gap-3">
                        <InputType labelTxt='IN' inputType='radio' id='inRadio' name='inventoryType' value='in' onChange={handleChange} checked={values.inventoryType === 'in'}/>
                        <InputType labelTxt='OUT' inputType='radio' id='outRadio' name='inventoryType' value='out' onChange={handleChange} checked={values.inventoryType === 'out'}/>
                    </div>
                    <p className="text-red-500 text-xs mt-1 ml-1">
                        {
                            touched.inventoryType && errors.inventoryType ? (
                            <div>{errors.inventoryType}</div>
                            ) : null
                        }
                    </p>
                    {/* /* ----------------------------- Email Field ----------------------------- */}
                    {
                        values.inventoryType=="in" ? (
                            <>
                                <div className="mb-3">
                                    <InputType labelTxt='Donar Email' inputType='text' id='email' name='email' value={values.email} onChange={handleChange} />
                                    <p className="text-red-500 text-xs mt-1 ml-1">
                                        {
                                            touched.email && errors.email ? (
                                            <div>{errors.email}</div>
                                            ) : null
                                        }
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                            <InputType labelTxt='Hospital Email' inputType='text' id='email' name='email' value={values.email} onChange={handleChange} />
                            <p className="text-red-500 text-xs mt-1 ml-1">
                                {
                                    touched.email && errors.email ? (
                                    <div>{errors.email}</div>
                                    ) : null
                                }
                            </p>
                        </div>
                        )
                    }

                    {/* /* ----------------------------- Select Blood Group ----------------------------- */}
                    <div className="mb-3">
                        <label htmlFor="bloodGroup" className="block text-gray-700 font-bold mb-2 text-[12px]">
                            Blood Group
                        </label>
                        <select
                        id="bloodGroup"
                        name="bloodGroup"
                        onChange={handleChange}
                        className="block w-full bg-white border focus:outline-none focus:border-pink-500 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                        <option defaultValue={"Open this select menu"}>
                            Select a blood group
                        </option>
                        {bloodGroups.map((group, index) => (
                            <option key={index} value={group}>
                            {group}
                            </option>
                        ))}
                        </select>
                    </div>

                    {/* /* ----------------------------- Blood Quantity(Ml) ----------------------------- */}
                    <div className="mb-3">
                        <InputType labelTxt='Blood Quantity(Ml)' inputType='number' id='bloodQuantity' name='quantity' value={values.quantity} onChange={handleChange} />
                        <p className="text-red-500 text-xs mt-1 ml-1">
                            {
                                touched.quantity && errors.quantity ? (
                                <div>{errors.quantity}</div>
                                ) : null
                            }
                        </p>
                    </div>
                    
                </div>
          </div>
        </div>
            {/* /* ------------------------------ Button Event ------------------------------ */ }
                <div className="mt-4">
                <button
                    type="submit"
                    className="w-full text-[15px] bg-red-600 hover:bg-red-500 text-white font-semibold py-1 px-2 rounded hover:bg-pink-600 focus:outline-none focus:ring focus:ring-pink-400"
                >
                    {isLoading ? <PreLoder/> : "Submit"}
                </button>
                </div>
        </div>
    </form>
      
    </div>
      </Modal>
    </div>
  );
}

export default Inventory;
