import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";


const PrivateRouteAdmin = ({ component: Component, auth, ...rest }) => {

    //console.log("AUTH", auth);



    return (
        <Route
            {...rest}
            render={props =>
                auth.isAuthenticated === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    )
};

PrivateRouteAdmin.protoTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRouteAdmin);
