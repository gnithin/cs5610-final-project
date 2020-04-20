import baseAuthComponent from "./baseAuthComponent";

const adminAuthenticatedComponent = (WrappedComponent) => {
    return baseAuthComponent(
        WrappedComponent,
        true,
        false,
        '/home',
        true,
    )
};

export default adminAuthenticatedComponent;
