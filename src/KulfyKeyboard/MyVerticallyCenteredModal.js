import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Stack from "react-bootstrap/Stack";
import { copyImageToClipboard } from "copy-image-clipboard";
import kicon from "./Asset/k-logo-pink.svg";
import settingsicon from "./Asset/settings.svg";
import searchicon from "./Asset/search-icon.svg";
import homeicon from "./Asset/home_gray.svg";
import klogo from "./Asset/kulfy-full-logo.svg";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "./index.css";
import Checkbox from "react-bootstrap/InputGroup";

function MyVerticallyCenteredModal(props) {
  var apiLanguage="";
  var langu=[{lang:"tamil",check:false},{lang:"telugu",check:true},
  {lang:"malayalam",check:false},{lang:"pakistan",check:false},
  {lang:"nigeria",check:false},{lang:"hindi",check:false}];

  
  const [Concepts, setConcepts] = useState([]);

  const [Previews, setPreviews] = useState([]);

  const [Keywords, setKeywords] = useState([]);
  const [searchWord, setSearchWord] = useState("trending");
  const [isShow, setIsShow] = useState(false);
  const [isSettingPopup, setIsSettingPopup] = useState(false);
 
  const [language,setLanguage] =useState([]);
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

const formApiLanguage=(language)=>{
var result = [];
language.forEach(function(l){
  if (l.check){ result.push(l.lang);}} );
apiLanguage=result.join(",");
}
  useEffect(() => {
    setLanguage(langu);
    formApiLanguage(langu);
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
          "&skip=0&limit=20&content=image,gif&language="+apiLanguage,
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
  const openSettings = () => {
    if (isSettingPopup) {
      setIsSettingPopup(false);
    } else {
      setIsSettingPopup(true);
    }
  };
  const handleChange = (keyword, e) => {
    if (e.key === "Enter") {
      getKulfys(keyword, "popular", e);
    }
  };
  const handleCheck=(e)=>
  {
    var noChecks=true;
    language.forEach((lang,index)=>{
    if(lang.check)
    {
      noChecks=false;
    }
      if(lang.lang==e.target.value)
      {
        language[index].check=e.target.checked;
      }
    });
    if(!e.target.value && noChecks)
    { 
      //set telugu language default if no language is selected
         language[1].check=true;
    }
    setLanguage([...language], language);
    formApiLanguage(language);
    getKulfys();
  }
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
      <div
        className="settingPopup mfp-move-from-top"
        style={{ display: ` ${isSettingPopup ? "block" : "none"}` }}
      >
        <h6 className="mb-3">Language Settings</h6>
        {language.map((langs) => {
                  return(<div class="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={langs.lang}
                    id="flexCheckDefault"
                    checked={langs.check}
                    onChange={(e) => handleCheck(e)}
                  />
          <label class="form-check-label text-uppercase" for="flexCheckDefault">
            {langs.lang}
          </label>
        </div>)
        })
      }
        
      </div>

      <Modal.Body className="conceptModel p-0">
        <Stack direction="horizontal" className="bg-color1 text-white p-0">
          <Image src={kicon} width={36} height={36} rounded className="m-2" />
          <InputGroup
            className=" bg-color2 border-0 rounded-1 mt-1 mb-1"
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
              onKeyDown={(e) => handleChange(e.target.value, e)}
            />
          </InputGroup>
          <Image
            src={settingsicon}
            onClick={(e) => openSettings()}
            width={28}
            className="m-2 "
          />
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
        <div className="p-2 bg-color3">
          <Stack direction="horizontal" className="conceptPrev p-2" gap={1}>
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
        </div>

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
        <Stack
          direction="horizontal"
          className="bg-color1 text-white p-0 justify-content-between"
        >
          <Stack direction="horizontal">
            <Image src={homeicon} width={24} height={24} className="m-3" />
            <a
              href=""
              className="text-white text-decoration-none m-sm-2 fw-bold"
            >
              GIF
            </a>
          </Stack>

          <Stack
            direction="horizontal"
            className=" align-items-center justify-content-center"
          >
            <p className="m-0 text-white-50">Powered by</p>
            <Image
              src={klogo}
              onClick={(e) => openSettings()}
              height={42}
              className="m-2 "
            />
          </Stack>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
export default MyVerticallyCenteredModal;
