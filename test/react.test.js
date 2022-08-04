/** * @jest-environment jsdom */

import {render, screen} from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom'
import ResidentBox from '../src/components/ResidentBox';
import SearchBar from '../src/components/searchBar';
import LandingPage from '../src/components/LandingPage';


//Testing ResidentBox, SearchBar, LandingPage
describe ("ResidentBox", () => {
  xdescribe ("Rendering Props", () => {
    test('name props render to ResidentBox', () => {
      //make a props obj 
      const props = {
        name: 'jimmy'
      }
      render(<ResidentBox {...props} />)
      const ResidentBoxName = screen.getByText(props.name)
      expect(ResidentBoxName).toBeInTheDocument()
    })
  
  
    test ('cohort props render to ResidentBox', () => {
      //make a props obj 
      const props = {
        cohort: 10
      }
      
      render(<ResidentBox {...props} />);
      const ResidentBoxCohort = screen.getByText(props.cohort);
      expect(ResidentBoxCohort).toBeInTheDocument();
    })

    test ('organization props render to ResidentBox', () => {
      //make a props obj 
      const props = {
        organization: "Coinbase"
      }
      
      render(<ResidentBox {...props} />);
      const ResidentBoxOrg = screen.getByText(props.organization);
      expect(ResidentBoxOrg).toBeInTheDocument();
    })

    test ('message props render to ResidentBox', () => {
      //make a props obj 
      const props = {
        message: "Hey everyone"
      }
      
      render(<ResidentBox {...props} />);
      const ResidentBoxMes = screen.getByText(props.message);
      expect(ResidentBoxMes).toBeInTheDocument();
    })
  })

  xit('img is in ResidentBox', () => {
    //make a props obj 
    const props = {
      photo: 'photo'
    }
    render(<ResidentBox {...props} />)
    const ResidentBoxImg = screen.getByRole('img')
    expect(ResidentBoxImg).toBeInTheDocument()
  })

  xit('Should render button in ResidentBox', () => {
    render (<ResidentBox/>)
    const ResidentBoxButton = screen.getByRole('button')
    expect(ResidentBoxButton).toBeInTheDocument()
  })
  
})


xdescribe('SearchBox', () => {

  it('Should render button in SearcBar', () => {
    render(<SearchBar/>);
    const searchBarButton = screen.getByRole("button")
    expect(searchBarButton).toBeInTheDocument()
  }) 
})

xdescribe('LandingPage', () => {

  it('Should render button in LandingPage', () => {
    render(<LandingPage/>);
    const LandingButton = screen.getByRole("button")
    expect(LandingButton).toBeInTheDocument()
  }) 

  it('Should render img in LandingPage', () => {
    render(<LandingPage/>);
    const LandingImg = screen.getByRole("img")
    expect(LandingImg).toBeInTheDocument()
  }) 

})



