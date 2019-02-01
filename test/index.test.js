import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Editable from '../index'
Enzyme.configure({ adapter: new Adapter() })

it('editable renders correctly', () => {
  const wrapper = mount(
    <Editable name='Somewhere, something incredible is waiting to be known.' />
  )

  expect(wrapper.find('h3').text()).toEqual('Somewhere, something incredible is waiting to be known.')
})

it('onClick, editing input field must be shown', () => {
  const wrapper = Enzyme.mount(
    <Editable name='The nitrogen in our DNA,
    the calcium in our teeth, the iron in our blood,
    the carbon in our apple pies was made in
    the interiors of collapsing stars.
    We are made of star stuff.' />
  )
  wrapper.simulate('click')

  expect(wrapper.find('input').first().exists())
})

it('click on text and view control buttons', () => {
  const wrapper = Enzyme.mount(
    <Editable name='Science is not only compatible with spirituality; it is a profound source of spirituality.' editButton editControls />
  )

  wrapper.find('h3').simulate('click')

  expect(wrapper.find('button').length).toEqual(2)
})

it('editControls props does not present so buttons must not visible', () => {
  const wrapper = Enzyme.mount(
    <Editable name='The universe seems neither benign nor hostile, merely indifferent.' />
  )

  wrapper.find('h3').simulate('click')
  wrapper.find('button').forEach(btn => {
    expect(btn.instance().style._values.display).toEqual('none')
  })
})

it('editButton props presents on component so edit button must be available', () => {
  const wrapper = Enzyme.mount(
    <Editable name='For me, it is far better to grasp the Universe as it really is than to persist in delusion, however satisfying and reassuring.' editButton />
  )

  expect(wrapper.find('button').length).toEqual(1)
})

it('editButton props not present so edit button must not visible', () => {
  const wrapper = Enzyme.mount(
    <Editable editButton={false} name='Extinction is the rule. Survival is the exception.' />
  )

  expect(wrapper.find('button').instance().style._values.display).toEqual('none')
})

it('save new content by hitting enter key', () => {
  let wrapper = Enzyme.mount(
    <Editable contentRefs={handleData} name='Who is more humble? The scientist who looks at the universe with an open mind and accepts whatever the universe has to teach us, or somebody who says everything in this book must be considered the literal truth and never mind the fallibility of all the human beings involved?' />
  )

  wrapper = editInputValue(wrapper)

  wrapper.find('input').simulate('keyDown', {
    preventDefault () {},
    which: 13,
    key: 'Enter',
    keyCode: 13
  })

  expect(wrapper.find('h3').text()).toEqual('To infinity and beyond')
})

it('save new content by hitting the save button', () => {
  let wrapper = Enzyme.mount(
    <Editable contentRefs={handleData} editButton editControls name='Extraordinary claims require extraordinary evidence.' />
  )

  wrapper = editInputValue(wrapper)

  wrapper.find('button').first().simulate('click')

  expect(wrapper.find('h3').text()).toEqual('To infinity and beyond')
})

it('new content should not be saved by clicking on cancel button', () => {
  let wrapper = Enzyme.mount(
    <Editable editButton editControls name='For small creatures such as we the vastness is bearable only through love.' />
  )

  wrapper = editInputValue(wrapper)

  wrapper.find('button').last().simulate('click')

  expect(wrapper.find('h3').text()).toEqual('For small creatures such as we the vastness is bearable only through love.')
})

it('new content should not be saved by pressing ESC key', () => {
  let wrapper = Enzyme.mount(
    <Editable name='When you make the finding yourself – even if you’re the last person on Earth to see the light – you’ll never forget it.' />
  )

  wrapper = editInputValue(wrapper)

  wrapper.find('input').simulate('keyDown', {
    which: 27,
    key: 'Esc',
    keyCode: 27
  })

  expect(wrapper.find('h3').text()).toEqual('When you make the finding yourself – even if you’re the last person on Earth to see the light – you’ll never forget it.')
})

const handleData = function (data) {
  return data
}

const editInputValue = function (wrapper) {
  wrapper.find('h3').simulate('click')
  wrapper.find('input').instance().value = 'To infinity and beyond'
  wrapper.find('input').simulate('change')

  return wrapper
}
