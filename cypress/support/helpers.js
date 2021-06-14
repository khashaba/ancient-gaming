// helper functions for reducing repetition of bet amount buttons.
export const betButtonsTest = (betBtnText, betBtnValue, operand) => {
  // getting the bet amount value before clicking on any bet buttons.
  cy.get("#mat-input-4")
    .invoke("val")
    .then((initialBetAmount) => {
      // getting the initial value of Profit to win to compare it when changing the bet amout.
      cy.get(".profit-box .currency-value")
        .invoke("text")
        .then((initialProfitOnWinValue) => {
          // clicking on the desired bet button.
          cy.get(".form-field-buttons button").should("be.visible").contains(betBtnText).click();
          // asserting that the value of the bet amount should be increased respectively
          cy.get("#mat-input-4")
            .invoke("val")
            .then((newBetAmount) => {
              if (operand === "+") expect(newBetAmount).to.be.eq((+initialBetAmount + betBtnValue).toString());
              if (operand === "*") expect(newBetAmount).to.be.eq((+initialBetAmount * betBtnValue).toString());
            });
          cy.get(".profit-box .currency-value")
            .invoke("text")
            .then((newProfitOnWinValue) => {
              if (operand === "+") expect(+newProfitOnWinValue).to.be.eq(+initialProfitOnWinValue + betBtnValue);
              if (operand === "*") expect(+newProfitOnWinValue).to.be.eq(+initialProfitOnWinValue * betBtnValue);
            });
        });
    });
};
