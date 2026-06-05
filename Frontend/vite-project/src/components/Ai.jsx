import React, { useContext, useState } from 'react'
import ai from "../assets/ai.png"
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import open from "../assets/open.mp3"
function Ai() {
  let { showSearch, setShowSearch } = useContext(shopDataContext)
  let navigate = useNavigate()
  let [activeAi, setActiveAi] = useState(false)
  let openingSound = new Audio(open)

  function speak(message) {
    let utterence = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterence)
  }


  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new speechRecognition()
  if (!recognition) {
    console.log("not supported")
  }

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim().toLowerCase();

    if (transcript.includes("search") && transcript.includes("open") && !showSearch) {
      speak("opening search")
      setShowSearch(true)
      navigate("/collections")
    }
    else if (transcript.includes("search") && transcript.includes("close") && showSearch) {
      speak("closing search")
      setShowSearch(false)
    }
    else if (transcript.includes("shop") || transcript.includes("shop") || transcript.includes("product") || transcript.includes("products")) {
      speak("opening shop page")
      navigate("/collections")
    }
    else if (transcript.includes("about") || transcript.includes("aboutpage")) {
      speak("opening about page")
      navigate("/about")
      setShowSearch(false)
    }
    else if (transcript.includes("home") || transcript.includes("homepage")) {
      speak("opening home page")
      navigate("/")
      setShowSearch(false)
    }
    else if (transcript.includes("cart") || transcript.includes("kaat") || transcript.includes("caat")) {
      speak("opening your cart")
      navigate("/cart")
      setShowSearch(false)
    }
    else if (transcript.includes("contact")) {
      speak("opening contact page")
      navigate("/contact")
      setShowSearch(false)
    }
    else if (transcript.includes("order") || transcript.includes("myorders") || transcript.includes("orders") || transcript.includes("my order")) {
      speak("opening your orders page")
      navigate("/order")
      setShowSearch(false)
    }
    else if (transcript.includes("checkout") || transcript.includes("place order") || transcript.includes("pay")) {
      speak("opening checkout page")
      navigate("/placeorder")
      setShowSearch(false)
    }
    else if (transcript.includes("clothing") || transcript.includes("clothes") || transcript.includes("shoes") || transcript.includes("dairy") || transcript.includes("grocery") || transcript.includes("milk") || transcript.includes("butter")) {
      speak("searching in collections")
      setShowSearch(true)
      navigate("/collections")
    }
    else {
      toast.error("Try Again")
    }

  }
  recognition.onend = () => {
    setActiveAi(false)
  }
  return (
    <div className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] ' onClick={() => {
      recognition.start();
      openingSound.play()
      setActiveAi(true)
    }}>
      <img src={ai} alt="" className={`w-[100px] cursor-pointer ${activeAi ? 'translate-x-[10%] translate-y-[-10%] scale-125 ' : 'translate-x-[0] translate-y-[0] scale-100'} transition-transform`} style={{
        filter: ` ${activeAi ? "drop-shadow(0px 0px 30px #00d2fc)" : "drop-shadow(0px 0px 20px black)"}`
      }} />
    </div>
  )
}

export default Ai
