//要素取得
const container = document.getElementById("root");

/** functions */
function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map((child) =>
                typeof child === "object" ? child : createTextElement(child)
            )
        }
    };
}

function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    };
}

function render(element, container) {
    const dom =
        element.type == "TEXT_ELEMENT"
            ? document.createTextNode("")
            : document.createElement(element.type);

    const isProperty = (key) => key !== "children";

    Object.keys(element.props)
        .filter(isProperty)
        .forEach((name) => {
            dom[name] = element.props[name];
        });

    element.props.children.forEach((child) => {
        render(child, dom);
    });

    container.appendChild(dom);
}

/** import React from "react"の部分 */
const Didact = {
    createElement,
    render
};

/** element */
//const element = <h1 title="foo">Hello</h1>
/*const element = {
    type: "h1",
    props: {
        title: "foo",
        children: "Hello"
    }
};*/

const element = Didact.createElement(
    "div",
    { id: "foo" },
    Didact.createElement("a", null, "bar"),
    Didact.createElement("b")
);

/** render */
//ReactDOM.render(element, container);
/*const node = document.createElement(element.type);
node["title"] = element.props.title;

const text = document.createTextNode("");
text["nodeValue"] = element.props.children;

node.appendChild(text);
container.appendChild(node);*/

Didact.render(element, container);
