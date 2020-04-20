import baseAuthComponent from "./baseAuthComponent";


/**
 * HOC which returns a component which will render only if the user is authenticated.
 * @param WrappedComponent Component to be rendered if the user is authenticated
 */
const authenticatedComponent = (WrappedComponent) => {
    return baseAuthComponent(
        WrappedComponent,
        true,
        false,
        '/login',
        false
    )
};

export default authenticatedComponent;
