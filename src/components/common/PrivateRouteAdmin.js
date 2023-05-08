import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";


const PrivateRouteAdmin = ({ component: Component, auth, ...rest }) => {

    console.log("AUTH", auth);

    const handleRediect = () => {

        toast.error("You Are Not ADMIN !!!");

        //alert("You Are not Admin");

        return (
            <Redirect to="/login/instructor" />
        )
    }

    return (
        <Route
            {...rest}
            render={props =>
                auth.isAuthenticated === true && auth.users.role === "admin" ? (
                    <Component {...props} />
                ) : (
                    <>
                        {handleRediect()}
                    </>
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
