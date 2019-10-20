import React from 'react'
import DeleteButton from './DeleteButton'

describe('DeleteButton', () => {
  const mockFun = jest.fn()

  it('it matches the snapshot', () => {
    const wrapper = window.shallow(<DeleteButton onClick={mockFun} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('it uses the passed onClick function', () => {
    const wrapper = window.shallow(<DeleteButton onClick={mockFun} />)
    wrapper.simulate('click')
    expect(mockFun).toHaveBeenCalled()
  })
})
