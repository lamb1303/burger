import React, { Component } from 'react'
import Aux from '../../../containers/hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients).map(
            igKey => {
                return <li key={igKey}>
                    <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
                        {this.props.ingredients[igKey]}</li>
            });
        return (
            <Aux>
                <h3>You Order</h3>
                <p>A delicius burger with the following ingredients</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <span>Total Price:
            <strong>${this.props.total.toFixed(2)}</strong>
                </span>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
}
export default OrderSummary