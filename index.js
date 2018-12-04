const template = require("@babel/template").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const tmp = template(
  `
  import * as React from 'react';
  import { PropertyControls, ControlType } from 'framer';
  import IMPORT_NAME from 'SOURCE';
  
  const p = PROPS;
  
  export class Button extends React.Component {
    render(){return <div>Hello</div>;}
  }
  `,
  {
    sourceType: "module",
    plugins: [
      "@babel/plugin-transform-typescript",
      "@babel/plugin-transform-react-jsx",
      "@babel/plugin-transform-classes",
      "@babel/plugin-proposal-class-properties"
    ]
  }
);

const ast = tmp({
  IMPORT_NAME: t.identifier("myModule"),
  SOURCE: t.stringLiteral("my-module"),
  PROPS: t.objectExpression([
    t.objectProperty(t.stringLiteral("hello"), t.stringLiteral("hello"))
  ])
});

console.log(generate(ast, { sourceType: "module" }).code);
