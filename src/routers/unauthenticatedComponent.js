import baseAuthComponent from "./baseAuthComponent";

/**
 * HOC which returns a component which will render only if the user is not authenticated.
 * @param WrappedComponent Component to be rendered if the user is authenticated
 */
const unauthenticatedComponent = (WrappedComponent) => {
    return baseAuthComponent(WrappedComponent, true, '/home')
};

export default unauthenticatedComponent;
