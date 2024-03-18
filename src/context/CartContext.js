import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export let cartContext = createContext();

export default function CartContextProvider(props) {
  const [cartNumber, setCartNumber] = useState();
  const [wishListNumber, setWishListNumber] = useState();
  const [dataWishList, setDataWishList] = useState([]);
  const [cartId, setCartId] = useState(null);

  // const [data, setData] = useState([JSON.parse(localStorage.getItem("data") || "[]")]);

  let Baseurl = "https://ecommerce.routemisr.com";

  let header = {
    token: localStorage.getItem("userToken"),
  };

/*   const hostname = window.location.host;
  let param = {
    url: "https://" + hostname,
  }; */

  function addToCart(id) {
    return axios
      .post(
        `${Baseurl}/api/v1/cart`,
        {
          productId: id,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then((res) => {
        // console.log(res);
        toast.success(res.data.message);
        setCartNumber(res.data.numOfCartItems);
        // console.log(cartNumber);
        // localStorage.setItem('data',JSON.stringify(res.data.data));
      })
      .catch((err) => err);
  }
  /* 
    function getCart() {
    return axios.get(`${Baseurl}/api/v1/cart`, {
        headers: header,
    })
  } */

  function getCart() {
    return axios
      .get(`${Baseurl}/api/v1/cart`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          let cartNum = res.data.numOfCartItems;
          if (cartNum === 0) {
            cartNum = "";
          }
          setCartNumber(cartNum);
          // console.log(res.data.data.products);
          setCartId(res.data.data._id);
          localStorage.setItem("userId", res.data.data.cartOwner);
        }
        return res;
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  function updateCart(id, count) {
    return axios.put(
      `${Baseurl}/api/v1/cart/${id}`,
      {
        count: count,
      },
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
  }

  function deleteCart(id) {
    return axios.delete(`${Baseurl}/api/v1/cart/${id}`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }
  function clearCart() {
    return axios.delete(`${Baseurl}/api/v1/cart`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  function checkOutPayment(id, formDeta) {
    return axios.post(
      `${Baseurl}/api/v1/orders/checkout-session/${id}?url=https://freshcart-sherif-el-sheikhs-projects.vercel.app/`,
      {
        shippingAddress: formDeta,
      },
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
  }

  function addToWishList(id) {
    return axios.post(
      `${Baseurl}/api/v1/wishlist`,
      {
        productId: id,
      },
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
  }

  /*   function getWishList() {
    return axios
      .get(`${Baseurl}/api/v1/wishlist`, {
        headers: header,
      })
  } */

  async function getWishList() {
    return axios
      .get(`${Baseurl}/api/v1/wishlist`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        if (res.data.data.length) {
          let wishNum = res.data.data.length;
          if (wishNum === 0) {
            wishNum = "";
          }
          setWishListNumber(wishNum);
        }
        return res;
      })
      .catch((err) => err);
  }

  // async function getWishList() {
  //   try {
  //     const res = await axios.get(`${Baseurl}/api/v1/wishlist`, {
  //       headers: header,
  //     });
  //     if (res.data.data.length) {
  //       setWishListNumber(res.data.data.length);
  //     }
  //     return res;
  //   } catch (err) {
  //     return err;
  //   }
  // }

  function deleteWishList(id) {
    return axios.delete(`${Baseurl}/api/v1/wishlist/${id}`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  return (
    <cartContext.Provider
      value={{
        addToCart,
        cartNumber,
        setCartNumber,
        getCart,
        updateCart,
        deleteCart,
        clearCart,
        checkOutPayment,
        wishListNumber,
        setWishListNumber,
        addToWishList,
        getWishList,
        deleteWishList,
        dataWishList,
        setDataWishList,
        header,
        cartId,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
