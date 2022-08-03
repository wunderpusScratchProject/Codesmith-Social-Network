/** * @jest-environment jsdom */

import {render, screen} from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import '@testing-library/jest-dom'
import MainContainer from '../src/containers/MainContainer'




// test block 
it('renders____', async () => {
  render(<MainContainer/>);
    const ResidentBoxElement = screen.getByRole("")
    console.log(ResidentBoxElement)
    expect(ResidentBoxElement).toBeInTheDocument();
});