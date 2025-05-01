import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import SmallSpinner from "./utils/SmallSpinner";  
const apiUrl = import.meta.env.VITE_API_URL;


const Signup = () => {
  //otp verify
  const [emailSent, setEmailSent] = useState(false);
  const [verifyEmailClicked, setVerifyEmailClicked] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));

  const [verifiedEmail, setVerifiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSendEmailOtp = async () => {
    const {email} = formData;
    if (email) {
      setLoading(true);

      //check email already exists
      const result = await fetch(
        `${apiUrl}/api/email-check/${email}`
      );
      const dat =await  result.json();
      if(!result.ok){
        console.log("Sending OTP to:", email);
        setOtpSent(true);
        const res = await fetch(`${apiUrl}/api/send-mail-otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        setOtpSent(data.otp);
        if (res.ok) {
          setEmailSent(true);
          setLoading(false);
        }
      }else {alert("Your email already registered");
        setLoading(false);
      }
    }else{alert('Enter a valid email');
      setLoading(false);
    } 
  };
  const onComplete = (otp) => {
    console.log("OTP entered:", otp);
    console.log("OTP sent:", otpSent);
    if (+otp === otpSent) {
      setVerifiedEmail(true);
      alert("OTP verified successfully!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleChangeOfOtp = (element, index) => {
    if (isNaN(element.value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move focus to next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }

    // If all fields filled, trigger onComplete
    if (newOtp.every((num) => num !== "") && onComplete) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //sign up

  const handleSubmit = (e) => {
    if (!verifiedEmail) {
      alert("Please verify your email first!");
      return;
    }
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }
    if (formData.username.length < 3) {
      alert("Username must be at least 3 characters long!");
      return;
    }
    if (formData.username.length > 20) {
      alert("Username must be at most 20 characters long!");
      return;
    }
    if (formData.password.length > 20) {
      alert("Password must be at most 20 characters long!");
      return;
    }
    if (formData.username.includes(" ")) {
      alert("Username must not contain spaces!");
      return;
    }
    if (formData.password.includes(" ")) {
      alert("Password must not contain spaces!");
      return;
    }
    if (formData.email.includes(" ")) {
      alert("Email must not contain spaces!");
      return;
    }
    if (formData.username.includes("@")) {
      alert("Username must not contain @!");
      return;
    }
    if (formData.username.includes("#")) {
      alert("Username must not contain #!");
      return;
    }
    if (formData.username.includes("$")) {
      alert("Username must not contain $!");
      return;
    }
    if (formData.username.includes("%")) {
      alert("Username must not contain %!");
      return;
    }
    if (formData.username.includes("^")) {
      alert("Username must not contain ^!");
      return;
    }
    if (formData.username.includes("&")) {
      alert("Username must not contain &!");
      return;
    }
    if (formData.username.includes("*")) {
      alert("Username must not contain *!");
      return;
    }
    if (formData.username.includes("(")) {
      alert("Username must not contain (!");
      return;
    }
    if (formData.username.includes(")")) {
      alert("Username must not contain )!");
      return;
    }
    if (formData.username.includes("-")) {
      alert("Username must not contain -!");
      return;
    }
    if (formData.username.includes("+")) {
      alert("Username must not contain +!");
      return;
    }
    if (formData.username.includes("=")) {
      alert("Username must not contain =!");
      return;
    }
    e.preventDefault();
    console.log("Signup Data:", formData);
    // Here you can call your API to create user
  };
  const handleSignUp = async () => {
    const { username, email, password } = formData;
    console.log("Signup Data:", formData);
    try {
      const res = await fetch(`${apiUrl}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Signup successful!");
        console.log("User registered successfully:", data);
      } else {
        alert("Signup failed. Please try again.");
        console.error("Signup error:", data.error);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 via-blue-900 to-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username*  eg- haraprasad01"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address*"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {!verifiedEmail ? (
            <>
              <span
                onClick={() => {
                  handleSendEmailOtp();
                  setVerifyEmailClicked(true);
                }}
                className="text-sm text-blue-500 cursor-pointer hover:underline mb-2 w-10"
                type="button"
              >
                Verify Email
                {loading &&  <SmallSpinner />}
                {/* {emailSent && (()=>{setVerifyEmailClicked(false);})} */}
              </span>
              {emailSent && (
                <>
                  <span className="text-green-700 font-medium text-sml">
                    Otp Sent Successfully!
                  </span>
                  <div className="text-sm text-gray-500 mb-2">
                    A verification code will be sent to your email.
                  </div>
                </>
              )}
              {emailSent && (
                <>
                  {" "}
                  <div className="flex justify-center space-x-2">
                    {otp.map((data, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={data}
                        onChange={(e) => handleChangeOfOtp(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-12 h-12 text-center text-xl border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <span className="text-green-700 font-medium text-sml">
              ✅Email Verified Successfully!
            </span>
          )}
          <div className="relative">
            {" "}
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password*"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 z-10 pr-12 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute  z-40 right-2 top-2 text-black-600"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <button
            onClick={handleSignUp}
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            <span>Sign Up {loading && <SmallSpinner />}</span>
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
