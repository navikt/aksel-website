import { codeExamplesClient } from ".";
import { ExampleKeys } from "../examples";
import lowerCase from "lodash.lowercase";

import dotenv from "dotenv";

dotenv.config();

const updateExamples = () => {
  const token = process.env.SANITY_WRITE_KEY;

  ExampleKeys.forEach((key) => {
    codeExamplesClient(token)
      .createIfNotExists({
        _id: `${key}_autogen_example`,
        _type: "ds_code_example",
        infercode: true,
        preview: `https://example.com/examples/${key}`,
        title: lowerCase(key),
        autogenerated: true,
      })
      .then(() => console.log(`Updated kodeexample: ${key}`))
      .catch((e) => console.error(e.message));
  });
};

updateExamples();

/*

/* feedbackClient(token)
.create({
  "_createdAt": "2021-10-18T10:34:38Z",
  "_id": "drafts.6856e03a-2da3-4b80-8b7f-d17566a2209f",
  "_rev": "iq20f1-ebr-jwq-p2m-js4d57roa",
  "_type": "ds_code_example",
  "_updatedAt": "2021-10-18T10:41:38.331Z",
  "infercode": true,
  "preview": "https://verktoykasse.sanity.studio/desk/designsystemet;kodeEksempler;6856e03a-2da3-4b80-8b7f-d17566a2209f%2Ctemplate%3Dds_code_example",
  "title": "Button med error"
})

*/
