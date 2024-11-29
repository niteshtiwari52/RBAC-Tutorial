const axios = require("axios");


// Your MSG91 API key
const TEMPLATE_ID = process.env.TEMPLATE_ID;
const ACCESS_KEY = process.env.ACCESS_KEY;
const OTP_EXPIRE_TIME = process.env.OTP_EXPIRE_TIME;
const REAL_TIME = process.env.REAL_TIME;


// Utility function to send OTP via MSG91
const sendOTP = async (mobile, otp) => {
  // console.log(otp)
  const url = `https://control.msg91.com/api/v5/otp?otp=${otp}&otp_expiry=${OTP_EXPIRE_TIME}&template_id=${TEMPLATE_ID}&mobile=91${mobile}&authkey=${ACCESS_KEY}&realTime=${REAL_TIME}`;
  try {
    const response = await axios.post(url);
    // console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Generate a 4-digit OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit OTP
};


// Utility function to verify OTP via MSG91
const verifyOTP = async (mobile, otp) => {
  const url = `https://api.msg91.com/api/v5/otp/verify?authkey=${ACCESS_KEY}&mobile=91${mobile}&otp=${otp}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Utility function to resend OTP via MSG91 (can resend via SMS or voice)
const resendOTP = async (mobile, retryType = "text") => {
  const url = `https://api.msg91.com/api/v5/otp/retry?authkey=${ACCESS_KEY}&mobile=91${mobile}&retrytype=${retryType}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Export the functions for use in other parts of your application
module.exports = {
  sendOTP,
  generateOTP,
  verifyOTP,
  resendOTP, // Export resendOTP
};


// 
