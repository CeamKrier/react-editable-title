import React from 'react'
import Enzyme, { mount, render, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Editable from '../index'
Enzyme.configure({ adapter: new Adapter() })

const tick = function () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 5)
  })
}

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

it('click on text and view control buttons', async () => {
  const wrapper = Enzyme.mount(
    <Editable name='Science is not only compatible with spirituality; it is a profound source of spirituality.' editButton editControls />
  )

  wrapper.find('h3').simulate('click')
  await tick()
  expect(wrapper.find('button').length).toEqual(2)
})

it('editButton props presents on component so edit button must be available', () => {
  const wrapper = Enzyme.mount(
    <Editable name='For me, it is far better to grasp the Universe as it really is than to persist in delusion, however satisfying and reassuring.' editButton />
  )

  expect(wrapper.find('button').length).toEqual(1)
})

it('save new content by hitting enter key', async () => {
  const handleData = function (data) {
    return data
  }

  const wrapper = Enzyme.mount(
    <Editable contentRefs={handleData} name='Who is more humble? The scientist who looks at the universe with an open mind and accepts whatever the universe has to teach us, or somebody who says everything in this book must be considered the literal truth and never mind the fallibility of all the human beings involved?' />
  )

  wrapper.find('h3').simulate('click')
  await tick()

  wrapper.find('input').simulate('change', {
    target: { value: 'New thing' }
  })
  await tick()
  console.log(wrapper.find('input').html())
  wrapper.find('input').simulate('keyDown', {
    preventDefault () {},
    which: 13,
    key: 'Enter',
    keyCode: 13
  })
  await tick()

  expect(wrapper.find('h3').text()).toEqual('New thing')
})
