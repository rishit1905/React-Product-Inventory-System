import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Stock from '../stock';

afterEach(cleanup)

it("Renders without crash",()=>{
    render(<div></div>)
})

it("Stock renders without crash",()=>{
    const div=document.createElement("div")
    ReactDOM.render(<Stock></Stock>, div)
})

it('Button renders in correct way', ()=>{
    const {getByTestId} = render(<Stock></Stock>)
    expect(getByTestId('sort')).toHaveTextContent('Sort')
})

it('Button renders in correct way', ()=>{
    const {getByTestId} = render(<Stock></Stock>)
    expect(getByTestId('reverse')).toHaveTextContent('Reverse Sort')
})