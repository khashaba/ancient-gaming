/// <reference types="cypress" />

import { betButtonsTest } from "../../support/helpers";

context("Roll dice widget suite", () => {
  before(() => {
    cy.visit("https://www.csgoroll.com/en/dice");
  });

  describe("Bet buttons", () => {
    it("Bet +1 button should add 1 to the bet amount and profit to win", () => {
      betButtonsTest("1", 1, "+");
    });

    it("Bet +10 button should add 10 to the bet amount and profit to win", () => {
      betButtonsTest("10", 10, "+");
    });

    it("Bet 1/2 button should device the bet amount and profit to win over 2", () => {
      betButtonsTest("1/2", 0.5, "*");
    });

    it("Bet X2 button should multiply the bet amount and profit to win by 2", () => {
      betButtonsTest("x2", 2, "*");
    });
  });

  describe("Roll under/over switch", () => {
    it("Roll under should be visibile", () => {
      cy.get(".bet-form span:nth-child(2)").eq(0).should("text", "Under");
    });
    it("Roll under/over switch changes value", () => {
      cy.get("#mat-input-0")
        .invoke("val")
        .then((startingRollValue) => {
          startingRollValue = Number(startingRollValue);
          cy.get(".btn-switch").click();
          cy.get(".bet-form span:nth-child(2)").eq(0).should("text", "Over");
          cy.get("#mat-input-0")
            .invoke("val")
            .then((newRollValue) => {
              newRollValue = Number(newRollValue);
              expect(startingRollValue).to.not.eq(newRollValue);
              expect(startingRollValue).to.be.lte(newRollValue);
            });
        });
    });
  });
  describe("Dragging slider updates values inside inputs", () => {
    it("Dragging slider should update values", () => {
      cy.get("#mat-input-0")
        .invoke("val")
        .then((oldRollValue) => {
          cy.get("#mat-input-1")
            .invoke("val")
            .then((oldMulriplayer) => {
              cy.get("#mat-input-2")
                .invoke("val")
                .then((oldWinChance) => {
                  cy.get("cw-range[formcontrolname='underOver']").click();
                  cy.get("cw-range[formcontrolname='underOver']")
                    .as("range")
                    .trigger("mousedown")
                    .trigger("mousemove", { which: 1, pageX: 900 })
                    .trigger("mouseup");
                  cy.get("#mat-input-0").invoke("val").should("not.eq", oldRollValue);
                  cy.get("#mat-input-1").invoke("val").should("not.eq", oldMulriplayer);
                  cy.get("#mat-input-2").invoke("val").should("not.eq", oldWinChance);
                });
            });
        });
    });
  });
  describe("Spray mode", () => {
    it("Changing to spray mode should change Roll button text", () => {
      cy.get(".wager-footer button").should("be.visible").invoke("text").should("eq", " ROLL DICE ");
      cy.get(".modes").contains("Spray").click();
      cy.get(".wager-footer button").should("be.visible").invoke("text").should("eq", " ROLL ONCE ");
    });
    it("Changing to spray mode should append number of rolls input", () => {
      cy.get(".wager-footer mat-form-field").should("be.visible");
    });
  });
});
