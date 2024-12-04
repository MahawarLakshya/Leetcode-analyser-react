import React, { useEffect, useState } from "react";
import axios from "axios";

const UserCard = () => {
  const [user, setUser] = useState(null);
  const [newInfo, setNewInfo] = useState(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAdditional, setLoadingAdditional] = useState(false);
  // Fetch user data
  useEffect( () => {
    if (!userName) return;
    setLoading(true);
    axios
      .get(`https://leetcode-stats-api.herokuapp.com/${userName}`)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching the user data:", error);
      });
  }, [userName]);
  //other api to fetch more details
  useEffect( () => {
    if (!userName) return;
    setLoadingAdditional(true);
    axios
      .get(`https://alfa-leetcode-api.onrender.com/${userName}`)
      .then((response) => {
        console.log(response.data);
        setNewInfo(response.data);
        setLoadingAdditional(false);
      })
      .catch((error) => {
        setLoadingAdditional(false);
        console.error("Error fetching the user data:", error);
      });
  }, [userName]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-400">
      <div className="bg-black text-white shadow-lg rounded-xl p-6 w-96">
        <h1 className="text-2xl font-bold text-center text-yellow-400 mb-4">
          LeetCode User Stats
        </h1>
        <input
          type="text"
          placeholder="Enter LeetCode username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border border-yellow-400 rounded-lg p-2 w-full mb-4 text-black"
        />
        {/* <button
          onClick={handleUser}
          className="bg-yellow-400 text-black font-semibold py-2 px-4 w-full rounded-lg hover:bg-yellow-500 transition duration-200"
        >
          Search
        </button> */}
        {loading|| loadingAdditional ? (
          <p className="text-yellow-400 mt-4 text-center">Loading user data...</p>
        ) : user ? (
          <div className="mt-1">
            <h2 className="text-xl font-semibold text-center text-yellow-400">
              Welcome!!<br/>
            {newInfo?.name || userName}
            <br />
            from {newInfo?.country||null}
            </h2>

           
            <p className="text-gray-300 mt-2">
              Total questions solved:{" "}
              <span className="text-yellow-400">
                {user.totalSolved}/{user.totalQuestions}
              </span>
            </p>
            <p className="text-gray-300 mt-2">
              Easy solved:{" "}
              <span className="text-yellow-400">
                {user.easySolved}/{user.totalEasy}
              </span>
            </p>
            <p className="text-gray-300 mt-2">
              Medium solved:{" "}
              <span className="text-yellow-400">
                {user.mediumSolved}/{user.totalMedium}
              </span>
            </p>
            <p className="text-gray-300 mt-2">
              Hard solved:{" "}
              <span className="text-yellow-400">
                {user.hardSolved}/{user.totalHard}
              </span>
            </p>
           <div className="mt-4 text-center">
            <span  >
              
              <a
                href={ newInfo.gitHub}
                target="_blank"
               
                className="text-yellow-400 underline hover:text-yellow-500"
              >
Github</a></span>
&nbsp;
            <span  >
              <a
                href={ newInfo.linkedIN}
                target="_blank"
                
                className="text-yellow-400 underline hover:text-yellow-500"
                >
                LinkedIn
</a>           </span>
            &nbsp;
            <span>
              <a
                href={`https://leetcode.com/${userName}`}
                target="_blank"
                
                className="text-yellow-400 underline hover:text-yellow-500"
              >
                Visit Profile
              </a>
            </span>
            </div>
            </div>
          
        ):null }
      </div>
    </div>
  );
};

export default UserCard;
