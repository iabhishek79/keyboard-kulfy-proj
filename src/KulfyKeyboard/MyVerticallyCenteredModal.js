import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Stack from "react-bootstrap/Stack";
import { copyImageToClipboard } from "copy-image-clipboard";

import "./index.css";

function MyVerticallyCenteredModal(props) {
  const [Concepts, setConcepts] = useState([]);
  const [ActiveButton, setActiveButton] = useState("");
  const [FilterButton, setFilterButton] = useState("latest");

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

  useEffect(() => {
    responseGetConcepts();
    getKulfys();
    responseTrendingKeywords();
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getKulfys(event.target.value);
    }
  };
  const getKulfys = (skeyword) => {
    if (skeyword == null) {
      if (localStorage.getItem("searchKeyword") == null) {
        localStorage.setItem("searchKeyword", "trending");
        skeyword = "trending";
      } else {
        skeyword = localStorage.getItem("searchKeyword");
      }
    }
    var sort="";
    if (localStorage.getItem("sort") == null) {
      localStorage.setItem("sort", "latest");
      sort = "latest";
    } else {
      sort = localStorage.getItem("sort");
    }
    setActiveButton(skeyword);
    setFilterButton(sort);
    console.log(sort);
    
    const kulfyclientGetKulfys = axios.create({
      baseURL:
        "https://api.kulfyapp.com/V3/gifs/search?client=keyword_ios&exact=true&sort="+sort+"&skip=0&limit=20&content=image&language=english&keywords=" +
        skeyword,
    });
    kulfyclientGetKulfys
      .get("", {
        params: {
          keyword: skeyword,
        },
      })
      .then((response) => {
        // setKulfys(response.data.data);

        let kulfyslist = response.data.data;
        let keywordslist = Keywords;

        let previewlist = [];
        for (let i = 1; i < 10; i++) {
          if (kulfyslist[i]) previewlist.push(kulfyslist[i].image_url);
          //this.setState({ previews: previewlist });
        }
        setPreviews(previewlist);

        // console.log("response data nfts status", Kulfys);
        // setPosts([response.data, ...posts]);
      });
  };
  const responseTrendingKeywords = () => {
    kulfyclientTrendingWords.get("", {}).then((response) => {
      setKeywords(response.data["TELUGU"].trending);
      //this.setState({ keywords: response.data["TELUGU"].trending });
      // setPosts([response.data, ...posts]);
    });
  };

  const applysort=(sort)=>{
    
    setFilterButton(sort);
    localStorage.setItem("sort", sort);
    getKulfys();
    
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
      let conceptsarray = [];
      for (var i = 0; i < response.data.data.length; i++) {
        conceptsarray.push(response.data.data[i].concept);
      }
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
        <Stack direction="horizontal" className="kb-header my-2 p-2">
          <Button borderRadius={"md"} className="k-brand-icon mx-2">
            {/* <img src="/asd" alt="" width={"30"} height={"30"} /> */}
          </Button>
          <input
            type="text"
            placeholder="Search..."
            className="kb-search px-2"
            onKeyUp={(e) => handleKeyPress(e)}
          />
          <Button
            // borderRadius={"md"}
            className="kb-settings-icon mx-2"
          >
            {/* <img src="/asd" alt="" width={"30"} height={"30"} /> */}
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
              onClick={(e) => getKulfys(concept)}
              className={`kb-tag  rounded text-uppercase fw-bold border-0  py-2 flex  px-4 me-2  white-space-no-wrap ${
                ActiveButton == concept ? "activated" : ""
              }`}
            >
              {concept}
            </Button>
          ))}
        </Stack>

        <Stack direction="horizontal" className="conceptPrev my-1" gap={1}>
          <div className="kb-filter">
            <button className={`kb-filter-option ${ FilterButton == 'latest' ? "selected" : "" }`}  onClick={(e) => applysort("latest")}>Latest</button>
            <button className={`kb-filter-option ${ FilterButton == 'popular' ? "selected" : "" }`} onClick={(e) => applysort("popular")}>Popular</button>
          </div>
          {Previews.length === 0 && <h2>No records found</h2>}
          {Previews.length > 0 &&
            Previews.map((preview) => (
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

        <Stack direction="horizontal" className="conceptDiv my-2" gap={1}>
          {Keywords.map((keyword) => (
            <Button
              // borderRadius={"md"}
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
              onClick={(e) => getKulfys(keyword)}
              className={`kb-tag   text-uppercase fw-bold border-0  py-2 flex  px-4 me-2 white-space-no-wrap ${
                ActiveButton == keyword ? "activated" : ""
              }`}
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
            <Button className="kb-home mx-2">
              {/* TODO: add class 'activated' to </Button>  above when you want to highlight the selection. */}
              {/* <div className="kb-home"></div> */}
            </Button>

            {/* <Button className=" kb-nav-item activated mx-2"> */}
            {/* TODO: add class 'activated' to </Button>  above when you want to highlight the selection. */}
            {/* ABC
            </Button> */}
            <Button className="kb-nav-item activated mx-2">GIF</Button>
            {/* TODO: add class 'activated' to </Button>  above when you want to highlight the selection. */}
            <Button className="kb-nav-item mx-2">NFTs</Button>
            {/* TODO: add class 'activated' to </Button>  above when you want to highlight the selection. */}
          </div>
          <Stack direction="horizontal" className=" align-items-center">
            <p className="text-white kb-poweredby me-2">Powered by</p>
            {/* <img
              src="./../Asset/kulfy-full-logo.svg"
              alt=""
              width={"100"}
              height={"30"}
            /> */}
            <div className="poweredbykulfy"></div>
          </Stack>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
export default MyVerticallyCenteredModal;
