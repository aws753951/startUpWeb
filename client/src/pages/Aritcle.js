import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ViewSmall from "../components/ViewSmall";
import axios from "axios";
import { Link } from "react-router-dom";
import Post from "../components/Post";

// 由 /article/?article_id=... 進來的
const Aritcle = ({ meet, setMeet }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const article_id = queryParams.get("article_id");
  const meetArticle_id = queryParams.get("meetArticle_id");

  let [article, setArticle] = useState({});

  useEffect(() => {
    const getArticle = async () => {
      // /search/article/?article_id=....
      let response = await axios.get(
        process.env.REACT_APP_DB_URL +
          `/search/article/?article_id=${article_id}`
      );
      setArticle(response.data);
      console.log(response.data);
    };
    const getMeetArticle = async () => {
      // /search/article/?meetArticle_id=....
      let response = await axios.get(
        process.env.REACT_APP_DB_URL +
          `/search/article/?meetArticle_id=${meetArticle_id}`
      );
      setArticle(response.data);
      console.log(response.data);
    };

    // 只會是一種搜尋，不可能同時搜面試經驗又搜工作經驗
    if (article_id) {
      getArticle();
      setMeet(false);
    } else if (meetArticle_id) {
      getMeetArticle();
      setMeet(true);
    }
  }, [article_id, meetArticle_id]);

  return (
    <div className="col-span-5 md:col-span-3">
      <Link to={`/company/?companyId=${article.companyId}`}>
        <ViewSmall meet={meet} companyName={article.companyName} />
      </Link>
      <div className="flex flex-col md:mx-[10px] gap-[10px] mt-2">
        {article && article.good && article.bad && (
          <Post meet={meet} data={article} />
        )}
      </div>
    </div>
  );
};

export default Aritcle;
