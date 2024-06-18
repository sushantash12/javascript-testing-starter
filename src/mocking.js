import { trackPageView } from '../src/libs/analytics.js';
import { getExchangeRate } from './libs/currency.js';
import { isValidEmail, sendEmail } from './libs/email.js';
import { charge } from './libs/payment.js';
import security from './libs/security.js';
import { getShippingQuote } from './libs/shipping.js';

// Lesson: Mocking modules
export function getPriceInCurrency(price, currency) {
  const rate = getExchangeRate('USD', currency);
  return price * rate;
}

// Exercise
export function getShippingInfo(destination) {
  const quote = getShippingQuote(destination);
  if (!quote) return 'Shipping Unavailable';
  return `Shipping Cost: $${quote.cost} (${quote.estimatedDays} Days)`;
}

// Lesson: Interaction testing
export async function renderPage() {
  trackPageView('/home');

  return '<div>content</div>';
}

// Exercise
export async function submitOrder(order, creditCard) {
  const paymentResult = await charge(creditCard, order.totalAmount);

  if (paymentResult.status === 'failed')
    return { success: false, error: paymentResult.error };

  return { success: true };
}
// Lesson: Partial mocking
export async function signUp(email) {
  if (!isValidEmail(email)) return false;

  await sendEmail(email, 'Welcome aboard!');

  return true;
}

// Lesson: Spying on functions
export async function login(email) {
  const code = security.generateCode();

  await sendEmail(email, code.toString());
}

// Lesson: Mocking dates
export function isOnline() {
  const availableHours = [8, 20];
  const [open, close] = availableHours;
  const currentHour = new Date().getHours();

  return currentHour >= open && currentHour <= close;
}

// Exercise
export function getDiscount() {
  const today = new Date();
  console.log(today.getMonth(), today.getDate());
  const isChristmasDay = today.getMonth() === 11 && today.getDate() === 24;
  return isChristmasDay ? 0.2 : 0;
}
