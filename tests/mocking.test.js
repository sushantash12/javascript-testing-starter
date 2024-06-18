import { it, expect, describe, vi } from 'vitest';
import {
  getPriceInCurrency,
  getShippingInfo,
  renderPage,
  submitOrder,
  getDiscount,
} from '../src/mocking';
import { getExchangeRate } from '../src/libs/currency';
import { getShippingQuote } from '../src/libs/shipping';
import { charge } from '../src/libs/payment';
import { trackPageView } from '../src/libs/analytics';

vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');
vi.mock('../src/libs/analytics');
vi.mock('../src/libs/payment');

describe('test suite', () => {
  it('test case', () => {
    const sendText = vi.fn((text) => {
      return text;
    });

    const result = sendText('ok');

    expect(sendText).toHaveBeenCalledWith('ok');
    expect(result).toBe('ok');
  });
});

describe('getPriceInCurrency', () => {
  it('should return the correct exchange rate', () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5);

    const price = getPriceInCurrency(10, 'AUD');

    expect(price).toBe(15);
  });
});

describe('getShippingInfo', () => {
  it('should handle when given unreachable destination', () => {
    vi.mocked(getShippingQuote).mockReturnValue(null);

    const result = getShippingInfo('Mars');

    expect(result).toBe('Shipping Unavailable');
  });

  it('should handle when given reachable destination', () => {
    vi.mocked(getShippingQuote).mockReturnValue({ cost: 10, estimatedDays: 2 });

    const result = getShippingInfo('England');

    expect(result).toBe('Shipping Cost: $10 (2 Days)');
  });
});

describe('renderPage', () => {
  it('should handle the request correctly', async () => {
    const result = await renderPage();

    expect(result).toMatch(/content/i);
  });

  it('should call analytics', async () => {
    await renderPage();

    expect(trackPageView).toHaveBeenCalledWith('/home');
  });
});

describe('submitOrder', () => {
  it('should handle failed payment if Credit Card not correct', async () => {
    vi.mocked(charge).mockResolvedValue({
      status: 'failed',
      error: 'Invalid credit card number',
    });

    const result = await submitOrder(
      { totalAmount: 100 },
      { creditCardNumber: '1234' },
    );

    expect(result).toMatchObject(/invalid card/i);
  });

  it('should handle successful payment', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'success' });

    const result = await submitOrder(
      { totalAmount: 100 },
      { creditCardNumber: '1234789456214578' },
    );
    console.log(result);
    expect(result).toEqual({ success: true });
  });
});

describe('getDiscount', () => {
  it('should return the correct discount', () => {
    vi.setSystemTime(new Date('2021-12-25'));
    expect(getDiscount()).toBe(0.2);

    vi.setSystemTime(new Date('2021-12-24'));
    expect(getDiscount()).toBe(0);
  });
});
