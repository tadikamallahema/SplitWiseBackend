import Balance from "../models/balanceModel.js";

export const simplifyBalances = async (groupId) => {
  const balances = await Balance.find({ groupId });

  const net = {};

  balances.forEach(b => {
    net[b.fromUser] = (net[b.fromUser] || 0) - b.amount;
    net[b.toUser] = (net[b.toUser] || 0) + b.amount;
  });

  const debtors = [];
  const creditors = [];

  Object.entries(net).forEach(([user, amount]) => {
    if (amount < 0) debtors.push({ user, amount: -amount });
    if (amount > 0) creditors.push({ user, amount });
  });

  await Balance.deleteMany({ groupId });

  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const min = Math.min(debtors[i].amount, creditors[j].amount);

    await Balance.create({
      fromUser: debtors[i].user,
      toUser: creditors[j].user,
      amount: min,
      groupId
    });

    debtors[i].amount -= min;
    creditors[j].amount -= min;

    if (debtors[i].amount === 0) i++;
    if (creditors[j].amount === 0) j++;
  }
};
