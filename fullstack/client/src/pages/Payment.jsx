import React, { useState } from 'react';
import * as api from "../api"

const Payment = () => {
const productList=[
  {image:"#",title:"product 1",description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat culpa doloribus labore temporibus veniam. Eveniet vel illum nostrum natus, distinctio dolore error adipisci autem.",amount:500},
  {image:"#",title:"product 2",description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat culpa doloribus labore temporibus veniam. Eveniet vel illum nostrum natus, distinctio dolore error adipisci autem.",amount:1000},
]

  const [isVerified, setIsVerified] = useState(false)

  const handleRazorpayWindow = async (data) => {
    const options = {
      "key": "rzp_test_rnNWXuduZPdqfL",
      "amount": data.amount,
      "currency": data.currency,
      "name": "product 1",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": data.id,
      "handler": function (response) {

        api.verifyPayment({ response: response }).then(res => {
          setIsVerified(true);
        }).catch(err => {
          console.log(err);
        })

      },
      "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();

  }


  const handelPayment = async (amount) => {
    const data = { amount: Number(amount) }
    try {
      const res = await api.payment(data);
      handleRazorpayWindow(res.data)
    } catch (error) {
      alert(error?.message)
      console.log(error);
    }
  }


  return (
    <div className="max-w-md mx-auto bg-white shadow-md overflow-hidden rounded-lg">

      {isVerified ? <h1 className='text-center mt-[40%] pb-[40%] font-bold text-2xl'>Thank you for making payment</h1> : (
        <div style={{display:'flex', gap:5, marginTop:'20%', width:'100%'}} >
          {productList.map((item, i) => (
            <div key={i} className='w-[80vw] md:w-[40vw]'>
              <img className="w-full h-10" src={item.image} alt={item.title} />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                <p className="mt-2 text-sm text-gray-600">&#x20b9; {item.amount}</p>
                <p className="mt-2 text-sm text-gray-700">{item.description}</p>
                <button onClick={() => handelPayment(item.amount)} className="mt-4 w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                  Pay Now
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Payment