import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  incrementCartItemQuantity = id => {
    const {cartList} = this.state

    const cartItem = cartList.find(object => object.id === id)

    const filterList = cartList.filter(obj => obj.id !== cartItem.id)

    cartItem.quantity += 1

    this.setState({
      cartList: [...filterList, cartItem],
    })
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state

    const cartItem = cartList.find(object => object.id === id)

    const filterList = cartList.filter(obj => obj.id !== cartItem.id)

    if (cartItem.quantity === 1) {
      this.removeCartItem(id)
    }
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1
      this.setState({
        cartList: [...filterList, cartItem],
      })
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(object => object.id !== id)

    this.setState({
      cartList: filteredList,
    })
  }

  removeAllCartItems = () => {
    this.setState({
      cartList: [],
    })
  }

  addCartItem = product => {
    //   TODO: Update the code here to implement addCartItem
    const {cartList} = this.state
    const object = cartList.find(obj => obj.id === product.id)
    if (object === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      object.quantity += 1
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
