
import { useState } from "react";
import axios from "axios";

export default function StoryUploader(){

const [story,setStory] = useState("")
const [result,setResult] = useState("")

const analyzeStory = async () => {

const res = await axios.post("http://localhost:5000/analyze",{
story:story
})

setResult(JSON.stringify(res.data,null,2))

}

return(
<div>

<textarea
style={{width:"100%",height:200}}
value={story}
onChange={(e)=>setStory(e.target.value)}
placeholder="Paste story here"
/>

<br/>

<button onClick={analyzeStory}>
Analyze Story
</button>

<pre>{result}</pre>

</div>
)

}
