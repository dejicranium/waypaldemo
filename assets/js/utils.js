export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export function blobToURL(file) {
  return new Promise((resolve, reject) => {
    try {
      const url = URL.createObjectURL(file);
      resolve(url);
    } catch (error) {
      reject(error);
    }
  });
}

export function isoToDate(date, dash = false) {
  let isoDate = new Date(date);
  let year = isoDate.getFullYear();
  let month = isoDate.getMonth() + 1;
  let dt = isoDate.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (dash) {
    return year + "-" + month + "-" + dt;
  } else {
    return year + ", " + month + ", " + dt;
  }
}

export const formatAmount = (x) => {
  x = x * 1;
  const num = x.toFixed(2);
  const fNum = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fNum;
};

export const totalAmount = (amount) => {
  const subTotal = amount.reduce((acc, obj) => acc + obj, 0);
  const total = subTotal + (subTotal / 100) * 7.5;
  return total;
};

export const formatCurrency = (currency) => {
  if (currency === "GBP") {
    return "£";
  } else if (currency === "NGN") {
    return "₦";
  }
  return "$";
};
