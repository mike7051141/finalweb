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

export { chat };
