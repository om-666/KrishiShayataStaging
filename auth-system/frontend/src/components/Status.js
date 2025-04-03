import React, { useState, useEffect } from 'react';
import QuickAnimatedLoader from './CustomLoader';
import Footer from './Footer';

const Status = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noRecordFound, setNoRecordFound] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [claimsPerPage] = useState(1);
  const [activeClaim, setActiveClaim] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get Aadhaar number from localStorage
        const userAadhar = localStorage.getItem("userAadhar");

        if (!userAadhar) {
          throw new Error("Aadhaar number not found in localStorage");
        }

        // Updated API endpoint to match the curl command
        const response = await fetch(`http://localhost:5000/api/complain?aadhaar=${userAadhar}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Check if the response is OK
        if (!response.ok) {
          if (response.status === 404) {
            setNoRecordFound(true);
            return;
          }
          throw new Error(`API responded with status: ${response.status}`);
        }

        // Check content type to ensure we're getting JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("API didn't return JSON. Got: " + contentType);
        }

        const data = await response.json();

        // Debug: Log the data structure

        // Handle empty response
        if (!data || (Array.isArray(data) && data.length === 0)) {
          setNoRecordFound(true);
          return;
        }

        // Set the response data
        if (Array.isArray(data)) {
          const userApplications = data.filter(item => item.aadhaar === userAadhar);
          if (userApplications && userApplications.length > 0) {
            setClaims(userApplications);
            setActiveClaim(userApplications[0]);
          } else {
            setNoRecordFound(true);
          }
        } else {
          // If the API already returns the specific application
          setClaims([data]);
          setActiveClaim(data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Pagination logic
  useEffect(() => {
    if (claims.length > 0) {
      const indexOfLastClaim = currentPage * claimsPerPage;
      const indexOfFirstClaim = indexOfLastClaim - claimsPerPage;
      setActiveClaim(claims[indexOfFirstClaim]);
    }
  }, [currentPage, claims, claimsPerPage]);

  // Change page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to get status number for progress bar
  const getStatusStep = (status) => {
    switch (status) {
      case "Pending":
        return 1;
      case "In Review":
        return 2;
      case "Approved":
      case "Rejected":
        return 3;
      default:
        return 1;
    }
  };

  // Function to get color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-500";
      case "Rejected":
        return "bg-red-500";
      case "In Review":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Loading state with animation
  if (loading) {
    return (
      <QuickAnimatedLoader />
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <div className="flex flex-col justify-center items-center h-screen p-4">
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg shadow-lg p-6 max-w-md mb-4">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-xl font-bold text-gray-800">Connection Error</h3>
            </div>
            <p className="text-gray-700 mb-4">{error}</p>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-700 mb-2">Troubleshooting steps:</h4>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Check your internet connection</li>
                <li>Verify if the server is running</li>
                <li>Try refreshing the page</li>
                <li>Clear your browser cache</li>
              </ul>
            </div>
            <button onClick={() => window.location.reload()} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow transition duration-150 flex items-center justify-center w-full">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh Page
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // No record found state
  if (noRecordFound) {
    return (
      <>
        <div className="min-h-screen py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex flex-col justify-center items-center py-12">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md transform transition-all duration-300 hover:scale-105">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">No Claims Found</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">We couldn't find any claim applications associated with your Aadhaar number. Submit a new claim to get started.</p>
                <div className="flex flex-col space-y-3">
                  <a href="/complain" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-md transition duration-150 font-medium flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Submit New Claim
                  </a>
                  <a href="/" className="text-blue-600 hover:text-blue-800 py-2 transition duration-150 font-medium flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Return to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Main content with claim details
  return (
    <>
      <div className="min-h-screen py-10">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Farmer Claim Status</h1>

            {claims.length > 1 && (
              <div className="bg-white rounded-lg shadow-sm p-2 flex items-center">
                <span className="text-sm text-gray-600 mr-2">Claims:</span>
                <div className="flex space-x-1">
                  {claims.map((claim, index) => (
                    <button
                      key={claim._id}
                      onClick={() => paginate(index + 1)}
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${currentPage === index + 1
                        ? `${getStatusColor(claim.status)} text-white`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {activeClaim && (
            <>
              {/* Claim Summary Card */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 transform transition-all duration-300 hover:shadow-lg">
                <div className={`h-2 ${getStatusColor(activeClaim.status)}`}></div>
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <div className={`h-4 w-4 rounded-full ${getStatusColor(activeClaim.status)} mr-2`}></div>
                        <h2 className="text-xl font-semibold">{activeClaim.status}</h2>
                      </div>
                      <p className="text-gray-500 mt-1">
                        Claim ID: <span className="font-medium">{activeClaim._id}</span>
                      </p>
                      <p className="text-gray-500">
                        Submitted on: <span className="font-medium">{formatDate(activeClaim.createdAt)}</span>
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-800">₹{activeClaim.amount.toLocaleString()}</span>
                        <p className="text-gray-500">Claim Amount</p>
                      </div>
                    </div>
                  </div>

                  {activeClaim.status === "Rejected" && (
                    <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                      <div className="flex">
                        <svg className="h-6 w-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>
                          <p className="text-sm text-red-700">Your claim has been rejected. The weather conditions do not match the reported loss.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeClaim.status === "Approved" && (
                    <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                      <div className="flex">
                        <svg className="h-6 w-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>
                          <p className="text-sm text-green-700">Your claim has been approved. The compensation amount will be transferred to your bank account shortly.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress tracker */}
              <div className="mb-12 bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold mb-6">Claim Progress</h2>
                <div className="relative">
                  {/* Progress bar background */}
                  <div className="h-2 bg-gray-200 rounded-full"></div>

                  {/* Progress bar filled */}
                  <div
                    className={`h-2 rounded-full absolute top-0 left-0 ${getStatusColor(activeClaim.status)}`}
                    style={{ width: `${(getStatusStep(activeClaim.status) / 3) * 100}%` }}
                  ></div>

                  {/* Status circles */}
                  <div className="flex justify-between mt-4">
                    <div className="relative text-center">
                      <div className={`h-10 w-10 rounded-full border-4 mx-auto ${getStatusStep(activeClaim.status) >= 1 ? `${getStatusColor(activeClaim.status)} border-white` : 'bg-white border-gray-300'} flex items-center justify-center shadow-md`}>
                        {getStatusStep(activeClaim.status) >= 1 &&
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        }
                      </div>
                      <div className="mt-2 text-sm font-medium text-gray-700">Pending</div>
                      <div className="text-xs text-gray-500">Claim Submitted</div>
                    </div>

                    <div className="relative text-center">
                      <div className={`h-10 w-10 rounded-full border-4 mx-auto ${getStatusStep(activeClaim.status) >= 2 ? `${getStatusColor(activeClaim.status)} border-white` : 'bg-white border-gray-300'} flex items-center justify-center shadow-md`}>
                        {getStatusStep(activeClaim.status) >= 2 &&
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        }
                      </div>
                      <div className="mt-2 text-sm font-medium text-gray-700">In Review</div>
                      <div className="text-xs text-gray-500">Verification Process</div>
                    </div>

                    <div className="relative text-center">
                      <div className={`h-10 w-10 rounded-full border-4 mx-auto ${getStatusStep(activeClaim.status) >= 3 ? `${getStatusColor(activeClaim.status)} border-white` : 'bg-white border-gray-300'} flex items-center justify-center shadow-md`}>
                        {getStatusStep(activeClaim.status) >= 3 &&
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        }
                      </div>
                      <div className="mt-2 text-sm font-medium text-gray-700">
                        {activeClaim.status === "Approved" || activeClaim.status === "Rejected"
                          ? activeClaim.status
                          : "Approved/Rejected"}
                      </div>
                      <div className="text-xs text-gray-500">Final Decision</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application details accordion */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Claim Details</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Personal Information */}
                    <div className="bg-gray-50 rounded-lg p-5">
                      <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        Personal Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">Name:</span>
                          <span className="font-medium text-gray-800">{activeClaim.name}</span>
                        </div>
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">Aadhaar:</span>
                          <span className="font-medium text-gray-800">{activeClaim.aadhaar}</span>
                        </div>
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">Phone:</span>
                          <span className="font-medium text-gray-800">{activeClaim.phone}</span>
                        </div>
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">Address:</span>
                          <span className="font-medium text-gray-800">{activeClaim.address}</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-500 w-32">Pincode:</span>
                          <span className="font-medium text-gray-800">{activeClaim.pincode}</span>
                        </div>
                      </div>
                    </div>

                    {/* Claim Information */}
                    <div className="bg-gray-50 rounded-lg p-5">
                      <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Claim Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">Claim Type:</span>
                          <span className="font-medium text-gray-800">{activeClaim.claimType}</span>
                        </div>
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">Farmer Type:</span>
                          <span className="font-medium text-gray-800">{activeClaim.farmerType}</span>
                        </div>
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">Claim Amount:</span>
                          <span className="font-medium text-gray-800">₹{activeClaim.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">Cause of Loss:</span>
                          <span className="font-medium text-gray-800">{activeClaim.causeOfLoss}</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-500 w-32">Area Impacted:</span>
                          <span className="font-medium text-gray-800">{activeClaim.areaImpacted} acres</span>
                        </div>
                      </div>
                    </div>

                    {/* Location Details */}
                    <div className="bg-gray-50 rounded-lg p-5">
                      <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        Location Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">State:</span>
                          <span className="font-medium text-gray-800">{activeClaim.state}</span>
                        </div>
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">District:</span>
                          <span className="font-medium text-gray-800">{activeClaim.district}</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-500 w-32">Date of Sowing:</span>
                          <span className="font-medium text-gray-800">{formatDate(activeClaim.dateOfSowing)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bank Details */}
                    <div className="bg-gray-50 rounded-lg p-5">
                      <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                        </svg>
                        Bank Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">Bank Name:</span>
                          <span className="font-medium text-gray-800">{activeClaim.bankName}</span>
                        </div>
                        <div className="flex border-b border-gray-200 pb-2">
                          <span className="text-gray-500 w-32">Account Number:</span>
                          <span className="font-medium text-gray-800">{activeClaim.accountNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information / Notes */}

                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <a href="/" className="flex-1 bg-white hover:bg-gray-50 text-blue-600 font-medium py-3 px-6 rounded-lg shadow-sm border border-blue-200 transition duration-150 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Back to Home
                </a>

                <a href="/complain" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-150 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Submit New Claim
                </a>
              </div>

            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Status;