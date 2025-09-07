import { useState } from 'react'
import axios from 'axios'
import { LoaderCircle } from 'lucide-react';


const App = () => {

  const [textInput, setTextInput] = useState("")
  const[ selectValue, setSelectValue ]= useState("")
  const[result, setResult]=useState("")
  const [loading, setLoading]=useState(false)

  const handleTextTrans=async()=>{
    setLoading(true)
    try {
      
      const options = {
  method: 'POST',
  url: 'https://google-translator9.p.rapidapi.com/v2',
  headers: {
    'x-rapidapi-key': '4a5eecd88amshf04b670820979e6p1bdd92jsndcdee693ec72',
    'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    q: `${textInput}`,
    source: 'en',
    target: `${selectValue}`,
    format: 'text'
  }
};

const response=await axios.request(options)
setLoading(false)
console.log(response?.data?.data?.translations?.[Number(0)]?.translatedText)
setResult(response?.data?.data?.translations?.[Number(0)]?.translatedText)


    } catch (error) {
      setLoading(false)
      console.log(error?.data)
      
    }

  }
  console.log(textInput)
  console.log(selectValue)
  return (
    <div className="h-screen w-screen bg-purple-200 flex items-center justify-center">
      <div className='flex items-center justify-center flex-col gap-y-7 '>
        <h1 className="text-5xl text-gray-950 font-bold font-serif px-2 py-5">
          Text Translator
        </h1>
        <div className="flex items-center justify-center flex-col gap-y-5">
          <textarea name="input-text" className="bg-white h-30 w-[500px] border border-black outline-none rounded-lg text-lg px-5 py-2" onChange={(e)=> setTextInput(e.target.value)}  />
          <textarea name="input-text" className="bg-white h-30 w-[500px] border border-black outline-none rounded-lg text-lg px-5 py-2" value={result} readOnly />
        </div>
        <div>
          <label htmlFor="options" className="text-2xl text-black font-normal px-5 py-2">Converted into: </label>
          <select name="value" className="bg-amber-50 px-2 py-1 rounded-lg border border-zinc-700 outline-none cursor-pointer" onChange={(e)=>setSelectValue(e.target.value)}>
            <option value="">Select</option>
            <option value="hi">Hindi</option>
            <option value="bn">Bengali</option>
            <option value="mr">Marathi</option>
            <option value="te">Telugu</option>
            <option value="kn">Kannada</option>
          </select>
        </div>
        <button className="bg-blue-600 text-2xl text-white mx-auto w-2xl py-2.5 rounded-lg cursor-pointer flex items-center justify-center"  onClick={handleTextTrans}>
          {            
          loading ? "Loading..." : "Translate"
          }
        </button>
      </div>
    </div>
  )
}

export default App
