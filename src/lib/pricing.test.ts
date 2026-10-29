import assert from "node:assert/strict";
import test from "node:test";
import {
  AGENCY_FEE_CAP,
  calculateAgencyFee,
  calculateFeeBreakdown,
  feeExamples,
  formatUsd,
  parseProfitInput,
} from "./pricing.ts";

test("no positive eligible profit means no agency fee", () => {
  assert.equal(calculateAgencyFee(0), 0);
  assert.equal(calculateAgencyFee(-1), 0);
  assert.equal(calculateAgencyFee(-12500.75), 0);
});

test("charges 20% below the cap", () => {
  assert.equal(calculateAgencyFee(5000), 1000);
  assert.equal(calculateAgencyFee(10000), 2000);
  assert.equal(calculateAgencyFee(14999.95), 2999.99);
});

test("caps the fee at $3,000 a month", () => {
  assert.equal(calculateAgencyFee(15000), AGENCY_FEE_CAP);
  assert.equal(calculateAgencyFee(25000), AGENCY_FEE_CAP);
  assert.equal(calculateAgencyFee(1_000_000), AGENCY_FEE_CAP);
});

test("rounds to whole cents", () => {
  assert.equal(calculateAgencyFee(0.15), 0.03);
  assert.equal(calculateAgencyFee(1234.56), 246.91);
  assert.equal(calculateAgencyFee(3), 0.6);
});

test("ignores non-finite input", () => {
  assert.equal(calculateAgencyFee(Number.NaN), 0);
  assert.equal(calculateAgencyFee(Number.POSITIVE_INFINITY), 0);
});

test("breakdown reports remaining profit, cap and zero-fee state", () => {
  assert.deepEqual(calculateFeeBreakdown(0), {
    eligibleProfit: 0,
    fee: 0,
    remaining: 0,
    isCapped: false,
    isZeroFee: true,
  });

  assert.deepEqual(calculateFeeBreakdown(-4000), {
    eligibleProfit: -4000,
    fee: 0,
    remaining: -4000,
    isCapped: false,
    isZeroFee: true,
  });

  assert.deepEqual(calculateFeeBreakdown(10000), {
    eligibleProfit: 10000,
    fee: 2000,
    remaining: 8000,
    isCapped: false,
    isZeroFee: false,
  });

  assert.deepEqual(calculateFeeBreakdown(25000), {
    eligibleProfit: 25000,
    fee: 3000,
    remaining: 22000,
    isCapped: true,
    isZeroFee: false,
  });
});

test("the published examples match the calculation", () => {
  assert.deepEqual(feeExamples, [
    { eligibleProfit: 0, fee: 0, remaining: 0 },
    { eligibleProfit: 5000, fee: 1000, remaining: 4000 },
    { eligibleProfit: 10000, fee: 2000, remaining: 8000 },
    { eligibleProfit: 15000, fee: 3000, remaining: 12000 },
    { eligibleProfit: 25000, fee: 3000, remaining: 22000 },
  ]);
});

test("parses currency-formatted and invalid input", () => {
  assert.equal(parseProfitInput("12000"), 12000);
  assert.equal(parseProfitInput("$12,000.50"), 12000.5);
  assert.equal(parseProfitInput(" 1 500 "), 1500);
  assert.equal(parseProfitInput("-2500"), -2500);
  assert.equal(parseProfitInput(""), null);
  assert.equal(parseProfitInput("   "), null);
  assert.equal(parseProfitInput("abc"), null);
  assert.equal(parseProfitInput("12k"), null);
  assert.equal(parseProfitInput("-"), null);
});

test("formats USD without noisy decimals", () => {
  assert.equal(formatUsd(0), "$0");
  assert.equal(formatUsd(3000), "$3,000");
  assert.equal(formatUsd(1234.5), "$1,234.50");
  assert.equal(formatUsd(-4000), "-$4,000");
});
