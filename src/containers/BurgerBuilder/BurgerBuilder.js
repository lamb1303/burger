import React, { Component } from "react";
import {connect} from 'react-redux'
import Aux from '../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false
    }
    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(
            igKey => {
                return ingredients[igKey]
            }
        ).reduce((sum, el) => {
            return sum + el
        }, 0)
        return sum >0
    }
    //Using redux we don't need this functions
    // addIngredientHandler = type => {
    //     const updateIngredients = {
    //         ...this.state.ingredients
    //     }
    //     const oldCount = this.state.ingredients[type]
    //     const newCount = oldCount + 1
    //     updateIngredients[type] = newCount
    //     const priceAddition = INGREDIENTS_PRICES[type]
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition
    //     this.setState({ totalPrice: newPrice, ingredients: updateIngredients })
    //     this.updatePurchaseState(updateIngredients);
    // }

    // removeIngredientsHandler = type => {
    //     const updateIngredients = {
    //         ...this.state.ingredients
    //     }
    //     const oldCount = this.state.ingredients[type]
    //     if (oldCount <= 0) {
    //         return
    //     }
    //     const newCount = oldCount - 1
    //     updateIngredients[type] = newCount
    //     const priceDeduction = INGREDIENTS_PRICES[type]
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction
    //     this.setState({ totalPrice: newPrice, ingredients: updateIngredients })
    //     this.updatePurchaseState(updateIngredients);
    // }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
        // const queryParams = []
        // for (let i in this.state.ingredients) {
        //     //Property name                  =                       value
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price=' + this.state.totalPrice)
        // const queryString = queryParams.join('&')
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // })
    }
    
    render() {
        let orderSummary = <OrderSummary
            purchseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            total={this.props.price}
            ingredients={this.props.ings} />;
        
        if (this.state.loading) {
            orderSummary = <Spinner/>
        }
        
        const disableInfo = {
            ...this.props.ings
        }
        for (let key in disableInfo) {
           disableInfo[key] = disableInfo[key] <=0
            
        }
        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                <Burger
                    ingredients={this.props.ings}
               />
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    price={this.props.price}
                    disabled={disableInfo}
                    purchasing={this.state.purchasing}
                    orderer={this.purchaseHandler}
                    purchaseble={this.updatePurchaseState(this.props.ings)}/>
            </Aux>

        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName)=> dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);