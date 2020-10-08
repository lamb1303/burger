import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import {connect} from 'react-redux'
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary'
import ContactData from './ContactData/ContactData'
class CheckOut extends Component{
    // state = {
    //     ingredients: null,
    //     price: 0
    // }
    // componentWillMount() {
    //     //When load this component it will mount and not componenDidUpdate
    //     const query = new URLSearchParams(this.props.location.search)
    //     const ingredients = {}
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = param[1]
    //         } else {
    //             ingredients[param[0]] = +param[1]
    //         }
            
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price})
    // }
    checkoutCanceledHandler = () => {
        this.props.history.goBack()
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckOutSummary
                    checkoutContinued={this.checkoutContinuedHandler}
                    checkoutCanceled={this.checkoutCanceledHandler}
                    ingredients={this.props.ings} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component = {ContactData} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(CheckOut)