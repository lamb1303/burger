import React from 'react'
import classes from './Burger.css'
import BurgerIngredients from './BurgerIngredient/BurgerIngredient'

const burger = props => {
    //Transform an object of key value parents into array of burgers ingredients where
    //the value of the object is important to determinate the cuantity and the ingredient
    //Give us an array based on the ingredients that we have, taking the name of the ingredients too
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {          
            return <BurgerIngredients key={igKey + i} type={igKey} />
        })
    }).reduce((arr, el) => {
        return arr.concat(el)
    },[]);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
}

export default burger;