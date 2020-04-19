import baseAuthComponent from "./baseAuthComponent";

const AnyAuthComponent = (WrappedComponent) => {
    return baseAuthComponent(
        WrappedComponent,
        false,
        null,
        null
    )
};

export default AnyAuthComponent;
