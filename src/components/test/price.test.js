import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Price from '../price';

afterEach(cleanup)

it("Renders without crash",()=>{
    render(<div></div>)
})

it("Price renders without crash",()=>{
    const div=document.createElement("div")
    ReactDOM.render(<Price></Price>, div)
})

it('Button renders in correct way', ()=>{
    const {getByTestId} = render(<Price></Price>)
    expect(getByTestId('sort')).toHaveTextContent('Sort')
})

it('Button renders in correct way', ()=>{
    const {getByTestId} = render(<Price></Price>)
    expect(getByTestId('reverse')).toHaveTextContent('Reverse Sort')
})