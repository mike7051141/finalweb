import axios from "axios";

const chat = async (prompt, onMessage) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer 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",
  };
  const messages = [{ role: "user", content: prompt }];

  console.log("=>", prompt);
  axios
    .post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        temperature: 0.5,
        messages: messages,
        max_tokens: 200,
      },
      { headers, timeout: 600000 }
    )
    .then((response) => {
      console.log(response.data.choices[0].message.content);
      onMessage(response.data.choices[0].message.content);
    })
    .catch((err) => {
      console.log(err);
      onMessage(err.message);
    });
};

const chatHistory = async (prompt, messages, onMessage) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer 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",
  };
  console.log("과거기역 : ", messages);
  console.log("질의 : ", prompt);
  const gg = [...messages, { role: "user", content: prompt }];
  console.log("메시지 : ", gg);

  axios
    .post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        temperature: 0.5,
        messages: gg,
      },
      { headers, timeout: 15000 }
    )
    .then((response) => {
      console.log("응답 : ", response.data.choices[0].message.content);
      onMessage(response.data.choices[0].message.content);
    })
    .catch((err) => {
      console.log(err);
      onMessage(err.message);
    });
};

const dalle = async (prompt, onMessage, n = 1, size = "256x256") => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer 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",
  };

  axios
    .post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt: prompt,
        n: n,
        size: size,
      },
      { headers, timeout: 10000 }
    )
    .then((response) => {
      console.log(response);
      onMessage(response.data.data);
    })
    .catch(console.log);
};

export { chat, chatHistory, dalle };
