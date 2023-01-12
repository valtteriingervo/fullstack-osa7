import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

/*
Tee uuden blogin luomisesta huolehtivalle lomakkelle testi, joka varmistaa,
että lomake kutsuu propsina saamaansa takaisinkutsufunktiota oikeilla tiedoilla
 siinä vaiheessa kun blogi luodaan.
*/

describe('<BlogForm />', () => {
  test('5.16: form handler is called with the correct info', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    const container = render(<BlogForm createBlog={createBlog} />).container

    const inputTitle = container.querySelector('input[name="title"]')
    const inputAuthor = container.querySelector('input[name="author"]')
    const inputURL = container.querySelector('input[name="url"]')
    const submitButton = screen.getByText('create')

    await user.type(inputTitle, 'Fishing Blog')
    await user.type(inputAuthor, 'John Murray')
    await user.type(inputURL, 'www.fishing-blog.com')
    await user.click(submitButton)

    expect(createBlog.mock.calls[0][0]).toBe('Fishing Blog')
    expect(createBlog.mock.calls[0][1]).toBe('John Murray')
    expect(createBlog.mock.calls[0][2]).toBe('www.fishing-blog.com')
  })
})

