import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Stack from "react-bootstrap/Stack";
import { copyImageToClipboard } from "copy-image-clipboard";
import kicon from "./Asset/k-logo-pink.svg";
import settingsicon from "./Asset/settings.svg";
import searchicon from "./Asset/search-icon.svg";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

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
      "https://api.kulfyapp.com/V3/gifs/search?client=keyword_ios&exact=true&sort=latest&keyword=" +
      searchWord +
      "&skip=0&limit=20&content=image&language=telugu",
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
    } else {
      localStorage.setItem("searchKeyword", keyword);
    }
    setSearchWord(keyword);

    if (sort == null) {
      sort = "popular";
    }
    axios
      .create({
        baseURL:
          "https://api.kulfyapp.com/V3/gifs/search?client=keyword_ios&exact=true&sort=latest&keyword=" +
          keyword +
          "&skip=0&limit=20&content=image&language=telugu",
      })
      .get("", {})
      .then((response) => {
        let kulfyslist = response.data.data;
        let keywordslist = Keywords;

        let previewlist = [];
        for (let i = 1; i <= kulfyslist.length; i++) {
          if (kulfyslist[i]) previewlist.push(kulfyslist[i].image_url);
        }

        setPreviews(previewlist);

        console.log(kulfyslist);
      });
  };
  const responseTrendingKeywords = () => {
    kulfyclientTrendingWords.get("", {}).then((response) => {
      setKeywords(response.data["TELUGU"].trending);
      //this.setState({ keywords: response.data["TELUGU"].trending });
      // setPosts([response.data, ...posts]);
    });
  };
  const copyToClip = (src) => {
    //copyImageToClipboard(src)

    setIsShow(true);
    setTimeout(() => {
      setIsShow(false);
      props.setGifModel(src);
    }, 1000);
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
        <Button variant="secondary">Selected!!</Button>
      </div>

      <Modal.Body className="conceptModel">
        <Stack direction="horizontal" className="bg-color1 text-white p-1">
          <Image src={kicon} width={36} height={36} rounded className="m-1" />
          <InputGroup
            className=" bg-color2 border-0 rounded-1  "
            bg={"#5F5F5F"}
          >
            <InputGroup.Text
              id="basic-addon1 "
              className=" bg-color2 border-0 text-white"
            >
              <Image
                src={searchicon}
                width={24}
                className="p-1 pe-0 me-0"
              ></Image>
            </InputGroup.Text>
            <Form.Control
              className="bg-color2 border-0 text-white searchtext"
              placeholder="Search kulfy"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <Image src={settingsicon} width={28} className="m-2 " />
        </Stack>
        <Stack direction="horizontal" className="conceptDiv" gap={1}>
          {Concepts.map((concept) => (
            <Button
              onClick={(e) => getKulfys(concept, e)}
              className="tags"
              //use .tag-selected for active tag
            >
              {concept}
            </Button>
          ))}
        </Stack>

        <Stack direction="horizontal" className="conceptPrev" gap={1}>
          {Previews.map((preview) => (
            <img
              width="150px"
              src={preview}
              boxSize="150px"
              px={1}
              onClick={(e) => copyToClip(preview)}
              borderRadius="md"
              objectFit="cover"
              className="h-48 px-1 w-48 rounded object-cover"
              alt=""
            />
          ))}
        </Stack>

        <Stack direction="horizontal" className="conceptDiv" gap={1}>
          {Keywords.map((keyword) => (
            <Button
              onClick={(e) => getKulfys(keyword, "popular", e)}
              className="tags"
              //use .tag-selected for active tag
            >
              {keyword}
            </Button>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
export default MyVerticallyCenteredModal;
