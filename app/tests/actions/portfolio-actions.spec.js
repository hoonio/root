import expect from 'expect'
import * as actions from '../../scripts/actions/portfolio-actions'

describe('actions', () => {
  it('fetch portfolio items from Google sheers', () => {
    expect(actions.getPortfolioIfNeeded()).length.toEqual(5)
  })
})