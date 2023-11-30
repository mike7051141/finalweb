import axios from "axios";

class PapagoTranslator {
  constructor(clientId, clientSecret) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.apiUrl = "https://openapi.naver.com/v1/papago/n2mt";
  }

  async translate(text) {
    const headers = {
      "X-Naver-Client-Id": this.clientId,
      "X-Naver-Client-Secret": this.clientSecret,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    const data = new URLSearchParams();
    data.append("source", "ko");
    data.append("target", "en");
    data.append("text", text);

    try {
      const response = await axios.post(this.apiUrl, data, { headers });

      if (response.data.message.result) {
        return response.data.message.result.translatedText;
      } else {
        throw new Error("Translation failed");
      }
    } catch (error) {
      console.error("Translation error:", error);
      throw error;
    }
  }
}

export default PapagoTranslator;
