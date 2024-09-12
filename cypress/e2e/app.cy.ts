describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')

    cy.get('td').should('have.length.above', 1)
  })

  describe('WHEN the page loads initially', () => {
    it('shows the page header', () => {
      cy.get('h1').should('have.text', 'Employee Management Platform')
    })

    it('shows the correct table headers', () => {
      cy.get('th').should('have.length', 5)

      cy.get('th').eq(0).contains('Name').should('exist')
      cy.get('th').eq(1).contains('Days since hired').should('exist')
      cy.get('th').eq(2).contains('Email').should('exist')
      cy.get('th').eq(3).contains('Salary').should('exist')
      cy.get('th').eq(4).contains('Role').should('exist')
    })

    it('shows the number of days since hired in the "Days since hired" column', () => {
      cy.get('tr').each(($row, index) => {
        if (index !== 0) {
          cy.wrap($row).find('td:nth-child(2)').invoke('text').should('match', /^\d+ days ago$/)
        }
      })
    })

    it('shows the salary in Euros in the "Salary" column', () => {
      cy.get('tr').each(($row, index) => {
        if (index !== 0) {
          cy.wrap($row).find('td:nth-child(4)').invoke('text').should('match', /^\d+ €$/)
        }
      })
    })
  })

  describe('WHEN the user clicks on a name', () => {
    it('opens the detail view and shows the correct information', () => {
      cy.get('td').contains('Jane Smith').click()
      cy.contains('2').should('exist')
      cy.get('img').should('exist')
      cy.contains('Jane').should('exist')
      cy.contains('Smith').should('exist')
      cy.contains('jane.smith@emp.com').should('exist')
      cy.contains('Admin').should('exist')
      cy.contains('Finance').should('exist')
      cy.contains('55000 €').should('exist')
      cy.contains('2023-02-20').should('exist')
      cy.contains('Currently hired').should('exist')

      cy.contains('Click here to go back').click()

      cy.get('td').contains('Linda Wilson').click()
      cy.contains('5').should('exist')
      cy.get('img').should('exist')
      cy.contains('Linda').should('exist')
      cy.contains('Wilson').should('exist')
      cy.contains('linda.wilson@emp.com').should('exist')
      cy.contains('Admin').should('exist')
      cy.contains('Finance').should('exist')
      cy.contains('70000 €').should('exist')
      cy.contains('2023-05-30').should('exist')
      cy.contains('2023-12-31').should('exist')

      cy.contains('Click here to go back').click()

      cy.get('td').contains('Emily Jones').click()
      cy.contains('Customer Success').should('exist')
      cy.contains('User').should('exist')

      cy.contains('Click here to go back').click()

      cy.get('td').contains('Michael Brown').click()
      cy.contains('Superadmin').should('exist')
      cy.contains('IT').should('exist')
    })
  })

  describe('WHEN the user clicks on the button to go back to the table view', () => {
    it('shows the table view', () => {
      cy.get('table').should('exist')

      cy.get('td').contains('Jane Smith').click()

      cy.get('table').should('not.exist')
      cy.contains('Click here to go back').click()

      cy.get('table').should('exist')
    })
  })

  describe.skip('WHEN the user navigates between the detail and the table views', () => {
    it('should not make multiple calls for the same data', ()=>{
      cy.intercept('GET', 'http://localhost:3000/api/employees').as('getEmployees')
      cy.intercept('GET', 'http://localhost:3000/api/employees/5').as('getEmployee')

      cy.get('td').contains('Linda Wilson').click()
      cy.contains('Click here to go back').click()
      cy.get('td').contains('Linda Wilson').click()
      cy.contains('Click here to go back').click()
      cy.get('td').contains('Linda Wilson').click()

      cy.get('@getEmployees.all').should('have.length', 1)
      cy.get('@getEmployee.all').should('have.length', 1)
    })
  })
})
