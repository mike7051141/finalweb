import React, { useState } from "react";
import "../style.css";
export default function Main() {
  const title = "웹 개발 응용 (화) 프로젝트";
  const [imageSrc, setImageSrc] = useState("kangnam_logo.png");
  const [kangnamInfo, setKangnamInfo] = useState({
    name: "",
    id: "",
    intro: "",
  });

  const names = ["김경모", "김민", "김민기"];
  const srcs = ["kimmo.jpg", "kimmin.jpg", "kimmingi.jpg"];
  const kangnamId = ["201904011", "201904016", "201904017"];
  const kangnamIntro = [
    "안녕하세요 ICT융합공학부 19학번 김경모입니다.",
    "안녕하세요 소프트웨어응용학부 19학번 김민입니다.",
    "안녕하세요 소프트웨어응용학부 19학번 김민기입니다.",
  ];

  const handleImageChange = (index) => {
    setImageSrc(srcs[index]);
    setKangnamInfo({
      name: names[index],
      id: kangnamId[index],
      intro: kangnamIntro[index],
    });
  };

  return (
    <div
      className="center"
      style={{
        width: "100%",
        height: 1100,
        backgroundImage: 'url("/back2.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <h1 style={{ textAlign: "center", color: "black" }}>{title}</h1>
      <table>
        <tbody>
          <tr>
            <td id="td2">
              <img
                alt="pic"
                className="zoom round"
                id="imagekangnam"
                src={imageSrc}
                width={250}
              />
            </td>
            <td>
              <table id="grid">
                <tbody>
                  {names.map((name, index) => (
                    <tr key={index}>
                      <td className="td-left">
                        <img
                          alt="pic"
                          className="ChangeImage"
                          width={60}
                          onClick={() => handleImageChange(index)}
                          src={srcs[index]}
                        />
                      </td>
                      <td className="td-right">
                        <span>{name}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td width="100px" className="hide">
              이름:
            </td>
            <td width="300px">
              <span id="knames">{kangnamInfo.name}</span>
            </td>
          </tr>
          <tr>
            <td className="hide">학번:</td>
            <td>
              <span id="kangnamID">{kangnamInfo.id}</span>
            </td>
          </tr>
          <tr>
            <td className="hide">소개:</td>
            <td>
              <span id="kangnamIntro">{kangnamInfo.intro}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
