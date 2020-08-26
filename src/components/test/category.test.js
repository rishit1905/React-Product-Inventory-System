import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Category from "../category";


afterEach(cleanup)

it("Renders without crash",()=>{
    render(<div></div>)
})

it("category renders without crash",()=>{
    const div=document.createElement("div")
    ReactDOM.render(<Category></Category>, div)
})

