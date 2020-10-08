import React, { Component } from 'react'
import Aux from '../Aux/Aux'
import classes from './Layout.css'
import Toolbar from '../../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDraw: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDraw: false})
    }

    sideDrawerToogleHandler = () => {
       //Depens of the other state
        this.setState((prevState) => {
            return {showSideDraw: !prevState.showSideDraw}
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToogleClicked={this.sideDrawerToogleHandler}/>
                <SideDrawer
                    open={this.state.showSideDraw}
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;