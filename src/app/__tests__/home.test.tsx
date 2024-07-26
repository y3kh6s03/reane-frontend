import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Login from "../login/page";

describe('Page', () => {
  it('renders a heading', () => {
    render(<Login />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})