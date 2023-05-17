import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart

      const removeAllFunc = () => {
        removeAllCartItems()
      }

      const totalAmount = () => {
        const pricesList = cartList.map(
          cartItem => cartItem.price * cartItem.quantity,
        )
        const totalPrice = pricesList.reduce((first, second) => first + second)

        return (
          <div className="total-amount-container-parent">
            <div className="total-amount-container-child">
              <h1 className="total-heading">
                Order Total:{' '}
                <span className="span-element">{`RS ${totalPrice}/-`}</span>
              </h1>
              <p className="total-para">{`${cartList.length} Items in cart`}</p>
              <button className="checkout-button" type="button">
                Checkout
              </button>
            </div>
          </div>
        )
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <div className="remove-all-container">
                  <h1 className="cart-heading">My Cart</h1>

                  <button
                    onClick={removeAllFunc}
                    className="remove-buttons"
                    type="button"
                    data-testid="remove"
                  >
                    <h1>Remove All</h1>
                  </button>
                </div>

                <CartListView />
                {/* TODO: Add your code for Cart Summary here */}

                {totalAmount()}
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
