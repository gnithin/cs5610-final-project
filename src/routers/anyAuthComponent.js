import baseAuthComponent from "./baseAuthComponent";

const anyAuthComponent = (WrappedComponent) => {
    return baseAuthComponent(
        WrappedComponent,
        false,
        null,
        null
    )
};

export default anyAuthComponent;
