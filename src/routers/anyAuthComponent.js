import baseAuthComponent from "./baseAuthComponent";

const anyAuthComponent = (WrappedComponent) => {
    return baseAuthComponent(
        WrappedComponent,
        false,
        null,
        null,
        false,
    )
};

export default anyAuthComponent;
