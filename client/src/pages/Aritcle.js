import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ViewSmall from "../components/ViewSmall";
import axios from "axios";
import { Link } from "react-router-dom";
import Post from "../components/Post";

// 由 /article/?article_id=... 進來的
const Aritcle = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const article_id = queryParams.get("article_id");

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
    getArticle();
  }, [article_id]);

  return (
    <div className="col-span-5 md:col-span-3">
      <Link to={`/company/?companyId=${article.companyId}`}>
        <ViewSmall companyName={article.companyName} />
      </Link>
      <div className="flex flex-col md:mx-[10px] gap-[10px] mt-2">
        {article && article.good && article.bad && <Post data={article} />}
      </div>
    </div>
  );
};

export default Aritcle;
