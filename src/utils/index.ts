import { BigNumber } from "@ijstech/eth-wallet";

export const formatNumber = (value: any, decimals?: number) => {
  let val = value;
  const minValue = '0.0000001';
  if (typeof value === 'string') {
    val = new BigNumber(value).toNumber();
  } else if (typeof value === 'object') {
    val = value.toNumber();
  }
  if (val != 0 && new BigNumber(val).lt(minValue)) {
    return `<${minValue}`;
  }
  return formatNumberWithSeparators(val, decimals || 2);
};

export const formatNumberWithSeparators = (value: number, precision?: number) => {
  if (!value) value = 0;
  if (precision) {
    let outputStr = '';
    if (value >= 1) {
      const unit = Math.pow(10, precision);
      const rounded = Math.floor(value * unit) / unit;
      outputStr = rounded.toLocaleString('en-US', { maximumFractionDigits: precision });
    }
    else {
      outputStr = value.toLocaleString('en-US', { maximumSignificantDigits: precision });
    }

    if (outputStr.length > 18) {
      outputStr = outputStr.substring(0, 18) + '...'
    }
    return outputStr;
  }
  else {
    return value.toLocaleString('en-US');
  }
}

export {
  getERC20Amount,
  getTokenBalance,
  registerSendTxEvents
} from './token';
