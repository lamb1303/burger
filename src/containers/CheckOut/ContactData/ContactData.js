import React, { Component } from 'react'
import classes from './ContactData.css'
import {connect} from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            postal: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLenght: 5,
                    maxLenght: 5
                },
                valid: false,
                touched:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            deliverMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{
                        value: 'fastest', displayValue: 'Fastest'
                    },
                    { value: 'cheapest', displayValue: 'Cheapest' }]
                },
                value: '',
                validation: {},
                valid:true
            },
        },
        loading: false,
        formIsValid: false
    }

    checkValidity(value, rules) {
        let isvalid = true

        if (rules.required) {
            isvalid = value.trim() !== '' && isvalid;
        }

        if (rules.minLenght) {
            isvalid = value.length >= rules.minLenght && isvalid;
        }

        if (rules.maxLenght) {
            isvalid = value.length >= rules.maxLenght && isvalid;
        }

        return isvalid
    }

    inputChangedHandler = (event, inputIdentifyier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifyier]
        }

        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        

        updatedFormElement.touched = true
        updatedOrderForm[inputIdentifyier] = updatedFormElement
        let formIsValid = true
        for (let inputIdentifyier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifyier].valid && formIsValid
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
    }

    orderHanlder = (event) => {
        event.preventDefault()
        this.setState({ loading: true })
        const formData = {}

        for (let formElementIndetifier in this.state.orderForm) {
            formData[formElementIndetifier] = this.state.orderForm[formElementIndetifier].value
        }
        const order = {
            ingredients: this.props.ings,
            totalPrice: this.props.price,
            orderData: formData

        }

        axios.post('/orders.json', order).then(response => {
            this.setState({ loading: false })
            this.props.history.push('/')
        }).catch(err => {
            this.setState({ loading: false })
        })
    }

    render() {

        const formElementsArray = []
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHanlder}>
                {formElementsArray.map(formElement => (
                    <Input
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        key={formElement.id}
                        touched={formElement.config.touched}
                        invalid={!formElement.config.valid}
                        value={formElement.config.value}
                        shoudlValidate={formElement.config.validation}
                        elementConfig={formElement.config.elementConfig}
                        elementType={formElement.config.elementType} />
                ))}
                <Button
                    disabled={!this.state.formIsValid}
                    btnType="Success">ORDER</Button>
            </form>
        )

        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}
export default connect(mapStateToProps)(ContactData)