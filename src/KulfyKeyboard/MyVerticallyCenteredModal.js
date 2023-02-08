import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Stack from "react-bootstrap/Stack";
import { copyImageToClipboard } from "copy-image-clipboard";

import "./index.css";

function MyVerticallyCenteredModal(props) {
  const [Concepts, setConcepts] = useState([]);

  const [Previews, setPreviews] = useState([]);

  const [Keywords, setKeywords] = useState([]);
  const [searchWord, setSearchWord] = useState("trending");
  const [isShow, setIsShow] = useState(false);

  const kulfyclientTrendingWords = axios.create({
    baseURL: "https://api.kulfyapp.com/V3/getConfiguration",
  });
  const kulfyclientGetConcepts = axios.create({
    baseURL: "https://api.kulfyapp.com/v5/concepts/getConcepts?language=telugu",
  });

  const kulfyclientGetKulfys = axios.create({
    baseURL:
      "https://api.kulfyapp.com/V3/gifs/search?client=keyword_ios&exact=true&sort=latest&keyword=trending&skip=0&limit=20&content=image&language=english",
  });

  useEffect(() => {
    responseGetConcepts();
    getKulfys();
    responseTrendingKeywords();
  }, []);

  const getKulfys = (keyword, sort, e) => {
    if (keyword == null) {
      if (localStorage.getItem("searchKeyword")) {
        localStorage.setItem("searchKeyword", "trending");
      }
      keyword = localStorage.getItem("searchKeyword");
      setSearchWord(keyword);
    } else {
      localStorage.setItem("searchKeyword", keyword);
    }

    if (sort == null) {
      sort = "popular";
    }

    kulfyclientGetKulfys.get("", {}).then((response) => {
      console.log("response data ", response.data);
      console.log("response data nfts", response.data.data);
      // setKulfys(response.data.data);

      let kulfyslist = response.data.data;
      let keywordslist = Keywords;

      console.log("Image lists ", response.data.data, keywordslist);

      let previewlist = [];
      for (let i = 0; i < 10; i++) {
        if (kulfyslist[i]) previewlist.push(kulfyslist[i].image_url);
        console.log("urls ", kulfyslist[i]);
        //this.setState({ previews: previewlist });
      }
      setPreviews(previewlist);

      // console.log("response data nfts status", Kulfys);
      // setPosts([response.data, ...posts]);
    });
  };
  const responseTrendingKeywords = () => {
    kulfyclientTrendingWords.get("", {}).then((response) => {
      console.log("response data ", response.data);
      console.log("response data ", response.data["TELUGU"].trending);
      setKeywords(response.data["TELUGU"].trending);
      //this.setState({ keywords: response.data["TELUGU"].trending });
      // setPosts([response.data, ...posts]);
    });
  };
  const copyToClip = (src) => {
    copyImageToClipboard(src)
      .then(() => {
        setIsShow(true);
        setTimeout(() => {
          setIsShow(false);
        }, 1000);
      })
      .catch((e) => {
        console.log("Error: ", e.message);
      });
  };
  const responseGetConcepts = () => {
    kulfyclientGetConcepts.get("", {}).then((response) => {
      console.log("response data 123", response.data);
      let conceptsarray = [];
      for (var i = 0; i < response.data.data.length; i++) {
        conceptsarray.push(response.data.data[i].concept);
      }
      console.log("response data ", conceptsarray);
      setConcepts(conceptsarray);
      //this.setState({ concepts: conceptsarray });
      // setPosts([response.data, ...posts]);
    });
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div
        className="copybtn"
        style={{ visibility: ` ${isShow ? "visible" : "hidden"}` }}
      >
        <Button variant="secondary">Copied!!</Button>
      </div>

      <Modal.Body className="conceptModel">
        <Stack direction="horizontal" className="kb-header mb-2 p-2">
          <Button borderRadius={"md"} className="brand-icon mx-2">
            <img src="/asd" alt="" width={"30"} height={"30"} />
          </Button>
          <input
            type="text"
            placeholder="Search..."
            className="kb-search px-2"
          />
          <Button borderRadius={"md"} className="brand-icon mx-2">
            <img src="/asd" alt="" width={"30"} height={"30"} />
          </Button>
        </Stack>
        <Stack direction="horizontal" className="conceptDiv" gap={1}>
          {Concepts.map((concept) => (
            <Button
              borderRadius={"md"}
              textTransform="uppercase"
              justifyContent={"center"}
              fontWeight="semibold"
              whiteSpace={"nowrap"}
              minWidth="fit-content"
              color={"white"}
              /*onClick={(e) => getCategories(concept, e)}*/
              className="kb-tag rounded text-uppercase fw-bold border-0  py-2 flex  px-4 me-2  white-space-no-wrap"
            >
              {concept}
            </Button>
          ))}
        </Stack>

        <Stack direction="horizontal" className="conceptPrev my-2" gap={1}>
          {Previews.map((preview) => (
            <img
              width="150px"
              height="150px"
              src={preview}
              boxSize="150px"
              p={1}
              onClick={(e) => copyToClip(preview)}
              borderRadius="md"
              objectFit="cover"
              className="h-48 p-1 w-48 rounded-4 obj-cover "
              alt=""
            />
          ))}
        </Stack>

        <Stack direction="horizontal" className="conceptDiv" gap={1}>
          {Keywords.map((keyword) => (
            <Button
              borderRadius={"md"}
              textTransform="uppercase"
              justifyContent={"center"}
              fontWeight="semibold"
              whiteSpace={"nowrap"}
              minWidth="fit-content"
              py="1"
              px={2}
              m={1}
              bg="blackAlpha.800"
              color={"white"}
              /* onClick={(e) => getKulfys(keyword, "popular", e)}*/
              className="kb-tag rounded text-uppercase fw-bold border-0  py-2 flex  px-4 me-2 white-space-no-wrap"
            >
              {keyword}
            </Button>
          ))}
        </Stack>
        <Stack
          direction="horizontal"
          className="kb-header mb-2 p-2 justify-content-between"
        >
          <div>
            <Button borderRadius={"md"} className="brand-icon mx-2">
              <img src="/asd" alt="" width={"30"} height={"30"} />
            </Button>
            <Button borderRadius={"md"} className="brand-icon mx-2">
              <img src="/asd" alt="" width={"30"} height={"30"} />
            </Button>
            <Button borderRadius={"md"} className="brand-icon mx-2">
              <img src="/asd" alt="" width={"30"} height={"30"} />
            </Button>
            <Button borderRadius={"md"} className="brand-icon mx-2">
              <img src="/asd" alt="" width={"30"} height={"30"} />
            </Button>
          </div>
          <Stack direction="horizontal" className=" align-items-center">
            <p className="text-white kb-poweredby">Powered by</p>
            <img src="/asd" alt="" width={"100"} height={"30"} />
          </Stack>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
export default MyVerticallyCenteredModal;
