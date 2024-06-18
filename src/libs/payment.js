import delay from 'delay';

export async function charge(creditCardInfo, amount) {
  console.log(`Charging Credit Card: ${creditCardInfo.creditCardNumber}`);
  console.log(`Amount: ${amount}`);
  try {
    if (typeof amount !== 'number' || amount <= 0)
      throw new Error('Invalid amount');
    if (creditCardInfo.creditCardNumber.length !== 16) {
      throw new Error('Invalid credit card number');
    }
  } catch (error) {
    console.error(error);
    return { status: 'failed', error: error.message };
  }
  await delay(3000);
  return { status: 'success' };
}
