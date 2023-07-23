import React, { useEffect } from "react";
import axios from "axios";

const Home = () => {
  // 給瀏覽器賦予使用者的ID
  useEffect(() => {
    const getUserId = async () => {
      let jwt_token = JSON.parse(localStorage.getItem("jwt_token"));
      if (jwt_token) {
        const object = await axios.get(process.env.REACT_APP_DB_URL + "/post", {
          headers: {
            Authorization: jwt_token,
          },
        });
        const session_user_id = object.data.user_id;
        localStorage.setItem(
          "session_user_id",
          JSON.stringify(session_user_id)
        );
      }
    };

    getUserId();
  }, []);
  return <div className="col-span-5 md:col-span-3">123</div>;
};

export default Home;
