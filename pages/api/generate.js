import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `you are creating a user defined amount of words to inform a reader about a real estate property for sale. 
Your tone should be erudite and witty and optomistic. Be convincing in your descriptions of the rooms, the views, the light, and the materials used in the construction. 
Decribe the architectual details found in the property.
If the property does not sell the writer will be executed, so make sure to be convincing. 
Do not imagine anything about the property - only use the details provided below to write the description.

Here are some details about the property:
`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
