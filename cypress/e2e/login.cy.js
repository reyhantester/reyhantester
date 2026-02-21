describe('template spec', () => {
  it('login', () => {
    cy.visit('https://advertiser-test.mobupps.com/')
    cy.get('input[name="_username"]').type('qa1@mobupps.com')
    cy.get('input[name="_password"]').type('admin')
    cy.get('form button[type="submit"]').click()
    //-----------------------------------------------------//
    cy.url().should('include', '/dashboard')
    cy.wait(7000)
    // 1. Open the date picker popover
    cy.get('button').contains('Date Range:').click();
    // 2. Select "Last Month" from the predefined ranges
    cy.contains('span.rdrStaticRangeLabel', 'Last Month').click();
    // 3. Click outside the calendar (top-left corner) to close the popover
    cy.get('body').click(0, 0);
    // 4. Verify the date range update under the "Revenue By Geo" chart title
    cy.contains('div', 'Revenue By Geo').should('exist');
    cy.wait(5000)
    // 5.Navigate
    cy.scrollTo('bottom');
    // 6.Check if at least one chart is visible
    cy.get('svg').should('be.visible');
    // 7.One negative test
    cy.contains('No data found').should('not.exist');
  })
})