import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Signup from '../signup';

afterEach(cleanup)

it("Renders without crash",()=>{
    render(<div></div>)
})

it("Renders without crash",()=>{
    render(<div></div>)
})

it("Signup renders without crash",()=>{
    const div=document.createElement("div")
    ReactDOM.render(<Signup></Signup>, div)
})

it('Button renders in correct way', ()=>{
    const {getByTestId} = render(<Signup></Signup>)
    expect(getByTestId('signup')).toHaveTextContent('Create Account')
})