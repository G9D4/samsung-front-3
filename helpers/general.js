const getCartGuest = () => {
    return JSON.parse(localStorage.getItem("cart"))
}

export {getCartGuest};